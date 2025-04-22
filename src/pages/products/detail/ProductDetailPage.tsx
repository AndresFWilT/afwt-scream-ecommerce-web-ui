"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import "./ProductDetailPage.css"
import {CartService} from "../../../services/cart-service.ts";
import {useAuth} from "../../../context/authContext.tsx";
import {IProduct} from "../../../types/product.ts";
import {ProductService} from "../../../services/product-service.ts";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { isAuthenticated, user } = useAuth()
    const [product, setProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [addingToCart, setAddingToCart] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetchProduct(Number(id))
        }
    }, [id])

    const fetchProduct = async (productId: number) => {
        setLoading(true)
        setError(null)
        try {
            const data = await ProductService.getById(productId)
            setProduct(data)
        } catch (err: any) {
            setError("Failed to fetch product details")
        } finally {
            setLoading(false)
        }
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (!product) return
        if (newQuantity < 1) return
        if (newQuantity > product.stock) {
            setError(`Sorry, only ${product.stock} items available in stock`)
            setTimeout(() => setError(null), 3000)
            return
        }
        setQuantity(newQuantity)
    }

    const handleAddToCart = async () => {
        if (!product || !isAuthenticated || !user) return;

        setAddingToCart(true);
        setError(null);

        try {
            const token = localStorage.getItem("token") || "";
            const cart = await CartService.getCart(token);

            const existingItem = cart.items.find(item => item.productId === product.id);
            const currentCartQuantity = existingItem ? existingItem.quantity : 0;

            const totalQuantityAfterAdd = currentCartQuantity + quantity;

            if (totalQuantityAfterAdd > product.stock) {
                setError(`You already have ${currentCartQuantity} in your cart. Only ${product.stock} in stock.`);
                setAddingToCart(false);
                setTimeout(() => setError(null), 4000);
                return;
            }

            await CartService.addItem(product.id!, quantity, token);
            setSuccessMessage(`${product.name} added to your cart!`);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError("Failed to add item to cart");
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <div className="product-detail-container">
            {loading ? (
                <div className="product-detail-loading">Loading product...</div>
            ) : error ? (
                <div className="product-detail-error">{error}</div>
            ) : product ? (
                <>
                    <div className="product-detail-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/products">Products</Link>
                        <span>/</span>
                        <span>{product.name}</span>
                    </div>

                    {successMessage && <div className="product-detail-success">{successMessage}</div>}

                    <div className="product-detail-content">
                        <div className="product-detail-main-image">
                            <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="product-main-image"
                            />
                        </div>
                        <div className="product-detail-info">
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)}</p>

                            {product.stock > 0 && (
                                <div className="product-detail-actions">
                                    <div className="quantity-selector">
                                        <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= product.stock}>+</button>
                                    </div>

                                    {isAuthenticated && user?.roles.includes("CUSTOMER") && (
                                        <button onClick={handleAddToCart} disabled={addingToCart}>
                                            {addingToCart ? "Adding..." : "Add to Cart"}
                                        </button>
                                    )}

                                    {!isAuthenticated && (
                                        <div className="login-to-add">
                                            <Link to="/login">Sign in to add to cart</Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {product.stock === 0 && <p className="out-of-stock">Out of stock</p>}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}
