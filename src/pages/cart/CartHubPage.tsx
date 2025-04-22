import { useState, useEffect } from "react";

import { CartService } from "../../services/cart-service.ts";
import { PurchaseService } from "../../services/purchase-service.ts";
import { ICart, ICartItem } from "../../types/cart.ts";
import { Button } from "../../components/atoms/Button/Button.tsx";
import { Card } from "../../components/molecules/card/Card.tsx";
import { CardHeader } from "../../components/atoms/CardHeader/CardHeader.tsx";
import { CardContent } from "../../components/atoms/CardContent/CardContent.tsx";
import { Separator } from "../../components/atoms/Separator/Separator.tsx";
import { CardFooter } from "../../components/atoms/CardFooter/CardFooter.tsx";
import { CardTitle } from "../../components/atoms/CardTitle/CardTitle.tsx";
import './CardHubPage.css';

export default function CartHubPage() {
    const [cart, setCart] = useState<ICart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<ICartItem | null>(null);
    const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token") || "";
            const cartData = await CartService.getCart(token);
            setCart(cartData);
        } catch (err: any) {
            setError("Failed to fetch cart items");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        if (!cart) return;

        try {
            const token = localStorage.getItem("token") || "";
            await CartService.updateItem(productId, newQuantity, token);

            setCart((prevCart) => {
                if (!prevCart) return null;

                const updatedItems = prevCart.items.map((item) =>
                    item.productId === productId
                        ? {
                            ...item,
                            quantity: newQuantity,
                            totalPrice: item.productPrice * newQuantity,
                        }
                        : item
                );

                const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

                return {
                    ...prevCart,
                    items: updatedItems,
                    totalAmount: newTotalAmount,
                };
            });

            showSuccessMessage("Cart updated successfully");
        } catch (err: any) {
            setError("Failed to update cart");
        }
    };

    const openDeleteModal = (item: ICartItem) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleRemoveItem = async (productId: number) => {
        try {
            const token = localStorage.getItem("token") || "";
            await CartService.removeItem(productId, token);

            setCart((prevCart) => {
                if (!prevCart) return null;

                const updatedItems = prevCart.items.filter((item) => item.productId !== productId);
                const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

                return {
                    ...prevCart,
                    items: updatedItems,
                    totalAmount: newTotalAmount,
                };
            });

            setIsDeleteModalOpen(false);
            showSuccessMessage("Item removed from cart");
        } catch (err: any) {
            setError("Failed to remove item from cart");
        }
    };

    const handleClearCart = async () => {
        try {
            const token = localStorage.getItem("token") || "";
            await CartService.clearCart(token);

            setCart((prevCart: any) => (prevCart ? { ...prevCart, items: [], totalAmount: 0 } : null));

            setIsClearCartModalOpen(false);
            showSuccessMessage("Cart cleared successfully");
        } catch (err: any) {
            setError("Failed to clear cart");
        }
    };

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token") || "";
            await PurchaseService.placePurchase(token);
            setCart(null);
            showSuccessMessage("Purchase placed successfully!");
        } catch (err: any) {
            setError("Failed to place purchase");
        }
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    const calculateTax = () => {
        if (!cart) return 0;
        return cart.totalAmount * 0.19;
    };

    const calculateTotal = () => {
        if (!cart) return 0;
        return cart.totalAmount + calculateTax();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <div className="admin-page afwt-ecommerce-min-h-screen">
            <div
                className="afwt-ecommerce-container afwt-ecommerce-mx-auto afwt-ecommerce-space-y-8"
                style={{ padding: "clamp(1rem, 5vw, 3rem)" }}
            >
                <div className="afwt-ecommerce-flex afwt-ecommerce-justify-between afwt-ecommerce-items-center">
                    <h1 className="admin-title">Your Shopping Cart</h1>
                    {cart && cart.items.length > 0 && (
                        <Button
                            variant="outline"
                            className="admin-button admin-button-danger"
                            onClick={() => setIsClearCartModalOpen(true)}
                        >
                            <svg
                                className="afwt-ecommerce-mr-2 afwt-ecommerce-h-4 afwt-ecommerce-w-4"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                            Clear Cart
                        </Button>
                    )}
                </div>

                {successMessage && (
                    <div className="admin-success-message">
                        <svg
                            className="afwt-ecommerce-h-5 afwt-ecommerce-w-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="admin-error-message">
                        <svg
                            className="afwt-ecommerce-h-5 afwt-ecommerce-w-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {error}
                        <button onClick={() => setError(null)} className="afwt-ecommerce-ml-auto" aria-label="Dismiss">
                            <svg
                                className="afwt-ecommerce-h-4 afwt-ecommerce-w-4"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="afwt-ecommerce-flex afwt-ecommerce-justify-center afwt-ecommerce-items-center afwt-ecommerce-h-64">
                        <div className="afwt-ecommerce-flex afwt-ecommerce-flex-col afwt-ecommerce-items-center">
                            <svg
                                className="afwt-ecommerce-animate-spin afwt-ecommerce-mb-4"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                                <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75"></path>
                            </svg>
                            <p className="afwt-ecommerce-text-lg afwt-ecommerce-text-gray-500">Loading your cart...</p>
                        </div>
                    </div>
                ) : (
                    <div className="afwt-ecommerce-grid afwt-ecommerce-gap-6 md:afwt-ecommerce-grid-cols-[1fr_300px]">
                        <div className="afwt-ecommerce-space-y-6">
                            {!cart || cart.items.length === 0 ? (
                                <div className="admin-table-container afwt-ecommerce-flex afwt-ecommerce-flex-col afwt-ecommerce-items-center afwt-ecommerce-justify-center afwt-ecommerce-py-16 afwt-ecommerce-text-center">
                                    <svg
                                        className="afwt-ecommerce-h-16 afwt-ecommerce-w-16 afwt-ecommerce-text-gray-300 afwt-ecommerce-mb-4"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    <h2 className="afwt-ecommerce-text-xl afwt-ecommerce-font-semibold afwt-ecommerce-mb-2">
                                        Your cart is empty
                                    </h2>
                                    <p className="afwt-ecommerce-text-gray-500 afwt-ecommerce-mb-6">
                                        Looks like you haven't added any products to your cart yet.
                                    </p>
                                    <a href="/products">
                                        <Button className="admin-button admin-button-primary">Continue Shopping</Button>
                                    </a>
                                </div>
                            ) : (
                                <div className="admin-table-container" style={{ marginTop: "clamp(1.5rem, 5vw, 3rem)" }}>
                                    <table className="admin-table">
                                        <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {cart.items.map((item: ICartItem) => (
                                            <tr key={item.productId}>
                                                <td>
                                                    <div className="afwt-ecommerce-flex afwt-ecommerce-items-center afwt-ecommerce-gap-3">
                                                        <div className="afwt-ecommerce-font-medium">{item.productName}</div>
                                                    </div>
                                                </td>
                                                <td>${item.productPrice.toFixed(2)}</td>
                                                <td>
                                                    <div className="afwt-ecommerce-flex afwt-ecommerce-items-center afwt-ecommerce-gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="afwt-ecommerce-h-8 afwt-ecommerce-w-8 afwt-ecommerce-rounded-full"
                                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <svg
                                                                className="afwt-ecommerce-h-4 afwt-ecommerce-w-4"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                            </svg>
                                                            <span className="afwt-ecommerce-sr-only">Decrease quantity</span>
                                                        </Button>
                                                        <span className="afwt-ecommerce-w-8 afwt-ecommerce-text-center">{item.quantity}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="afwt-ecommerce-h-8 afwt-ecommerce-w-8 afwt-ecommerce-rounded-full"
                                                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                                        >
                                                            <svg
                                                                className="afwt-ecommerce-h-4 afwt-ecommerce-w-4"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                            </svg>
                                                            <span className="afwt-ecommerce-sr-only">Increase quantity</span>
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="afwt-ecommerce-font-medium">${item.totalPrice.toFixed(2)}</td>
                                                <td>
                                                    <div className="admin-actions">
                                                        <button
                                                            onClick={() => openDeleteModal(item)}
                                                            className="admin-action-button admin-action-delete"
                                                            aria-label="Remove item"
                                                        >
                                                            <span className="afwt-ecommerce-sr-only">Del</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {cart && cart.items.length > 0 && (
                            <div className="afwt-ecommerce-pt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="afwt-ecommerce-space-y-4">
                                        <div className="afwt-ecommerce-flex afwt-ecommerce-justify-between">
                                            <span>Subtotal</span>
                                            <span>${cart.totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="afwt-ecommerce-flex afwt-ecommerce-justify-between">
                                            <span>Tax (8%)</span>
                                            <span>${calculateTax().toFixed(2)}</span>
                                        </div>
                                        <Separator />
                                        <div className="afwt-ecommerce-flex afwt-ecommerce-justify-between afwt-ecommerce-font-medium">
                                            <span>Total</span>
                                            <span>${calculateTotal().toFixed(2)}</span>
                                        </div>
                                        <div className="afwt-ecommerce-text-xs afwt-ecommerce-text-gray-500 afwt-ecommerce-mt-2">
                                            <p>Last updated: {formatDate(cart.updatedAt)}</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="afwt-ecommerce-flex afwt-ecommerce-flex-col afwt-ecommerce-gap-2">
                                        <Button className="admin-button admin-button-success afwt-ecommerce-w-full" onClick={handleCheckout}>
                                            Proceed to Checkout
                                        </Button>
                                        <a href="/products" className="afwt-ecommerce-w-full">
                                            <Button variant="outline" className="afwt-ecommerce-w-full">
                                                Continue Shopping
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Delete Item Modal */}
            {isDeleteModalOpen && itemToDelete && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal admin-modal-sm">
                        <div className="admin-modal-header">
                            <h2>Remove Item</h2>
                            <button onClick={() => setIsDeleteModalOpen(false)} className="admin-modal-close" aria-label="Close">
                                <svg
                                    className="afwt-ecommerce-h-5 afwt-ecommerce-w-5"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="admin-modal-content">
                            <div className="admin-delete-warning">
                                <svg
                                    className="afwt-ecommerce-h-12 afwt-ecommerce-w-12"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <p>
                                    Are you sure you want to remove <strong>{itemToDelete.productName}</strong> from your cart?
                                </p>
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                className="admin-button admin-button-danger"
                                onClick={() => handleRemoveItem(itemToDelete.productId)}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Clear Cart Modal */}
            {isClearCartModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal admin-modal-sm">
                        <div className="admin-modal-header">
                            <h2>Clear Cart</h2>
                            <button onClick={() => setIsClearCartModalOpen(false)} className="admin-modal-close" aria-label="Close">
                                <svg
                                    className="afwt-ecommerce-h-5 afwt-ecommerce-w-5"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="admin-modal-content">
                            <div className="admin-delete-warning">
                                <svg
                                    className="afwt-ecommerce-h-12 afwt-ecommerce-w-12"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <p>Are you sure you want to clear all items from your cart? This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <Button variant="outline" onClick={() => setIsClearCartModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" className="admin-button admin-button-danger" onClick={handleClearCart}>
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
