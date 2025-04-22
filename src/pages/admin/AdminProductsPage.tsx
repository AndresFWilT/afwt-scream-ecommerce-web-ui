import { useState, useEffect } from "react"

import { ProductService } from "../../services/product-service"
import type { IProduct } from "../../types/product"
import PaginationControls from "../../components/molecules/pagination/PaginationControls"
import "./AdminProductsPage.css"
import DeleteConfirmationModal from "../../components/organisms/product-modal/DeleteConfirmationModal.tsx";
import ProductFormModal from "../../components/organisms/product-modal/ProductFormModal.tsx";

const AdminProductsPage = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchProducts(currentPage, itemsPerPage)
    }, [currentPage, itemsPerPage])

    const fetchProducts = async (page: number, limit: number) => {
        setLoading(true)
        setError(null)
        try {
            const data = await ProductService.getPaginated(page, limit)
            setProducts(data)
            setHasMore(data.length === limit)
        } catch (err: any) {
            setError("Failed to fetch products")
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (page: number) => {
        if (page >= 1) setCurrentPage(page)
    }

    const handleItemsPerPageChange = (limit: number) => {
        setItemsPerPage(limit)
        setCurrentPage(1)
    }

    const handleCreateProduct = async (product: Omit<IProduct, "id">) => {
        try {
            const token = localStorage.getItem("token") || ""
            await ProductService.create(product, token)
            await fetchProducts(currentPage, itemsPerPage)
            setIsCreateModalOpen(false)
            showSuccessMessage("Product created successfully")
        } catch (err: any) {
            setError("Failed to create product")
        }
    }

    const handleEditProduct = async (product: IProduct) => {
        try {
            const token = localStorage.getItem("token") || ""
            await ProductService.update(Number(product.id), product, token)
            await fetchProducts(currentPage, itemsPerPage)
            setIsEditModalOpen(false)
            showSuccessMessage("Product updated successfully")
        } catch (err: any) {
            setError("Failed to update product")
        }
    }

    const handleDeleteProduct = async (id: string) => {
        try {
            const token = localStorage.getItem("token") || ""
            await ProductService.remove(Number(id), token)
            await fetchProducts(currentPage, itemsPerPage)
            setIsDeleteModalOpen(false)
            showSuccessMessage("Product deleted successfully")
        } catch (err: any) {
            setError("Failed to delete product")
        }
    }

    const openEditModal = (product: IProduct) => {
        setCurrentProduct(product)
        setIsEditModalOpen(true)
    }

    const openDeleteModal = (product: IProduct) => {
        setCurrentProduct(product)
        setIsDeleteModalOpen(true)
    }

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 3000)
    }

    return (
        <div className="admin-page afwt-ecommerce-min-h-screen">
            <div
                className="afwt-ecommerce-container afwt-ecommerce-mx-auto afwt-ecommerce-space-y-8"
                style={{padding: 'clamp(1rem, 5vw, 3rem)'}}
            >
                <div className="afwt-ecommerce-flex afwt-ecommerce-justify-between afwt-ecommerce-items-center">
                    <h1 className="admin-title">Product Management</h1>
                </div>

                {!loading && !error && products.length > 0 && (
                    <div style={{ marginTop: 'clamp(1rem, 4vw, 2.5rem)' }}>
                        <PaginationControls
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            hasMore={hasMore}
                            onPageChange={handlePageChange}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                    </div>
                )}


                {successMessage && (
                    <div className="admin-success-message">
                        <svg
                            width="20"
                            height="20"
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
                            width="20"
                            height="20"
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
                        <button
                            onClick={() => setError(null)}
                            className="afwt-ecommerce-ml-auto"
                            aria-label="Dismiss"
                        >
                            <svg
                                width="16"
                                height="16"
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
                    <div
                        className="afwt-ecommerce-flex afwt-ecommerce-justify-center afwt-ecommerce-items-center afwt-ecommerce-h-64">
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
                            <p className="afwt-ecommerce-text-lg afwt-ecommerce-text-gray-500">Loading products...</p>
                        </div>
                    </div>
                ) : (
                    <div className="admin-table-container" style={{marginTop: 'clamp(1.5rem, 5vw, 3rem)'}}>
                        <table className="admin-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="afwt-ecommerce-text-center afwt-ecommerce-py-8">
                                        No products available. Create your first product!
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="afwt-ecommerce-text-sm afwt-ecommerce-text-gray-500">#{product.id}</td>
                                        <td>
                                            <div className="admin-product-image">
                                                {product.imageUrl ? (
                                                    <img src={product.imageUrl || "/placeholder.svg"}
                                                         alt={product.name}/>
                                                ) : (
                                                    <div className="admin-product-image-placeholder">
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <rect x="3" y="3" width="18" height="18" rx="2"
                                                                  ry="2"></rect>
                                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                            <polyline points="21 15 16 10 5 21"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="afwt-ecommerce-font-medium">{product.name}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.stock}</td>
                                        <td>
                        <span
                            className={`admin-status ${product.stock > 0 ? 'admin-status-active' : 'admin-status-inactive'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                                        </td>
                                        <td>
                                            <div className="admin-actions">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="admin-action-button admin-action-edit"
                                                    aria-label="Edit product"
                                                >
                                                    <span className="afwt-ecommerce-sr-only">Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(product)}
                                                    className="admin-action-button admin-action-delete"
                                                    aria-label="Delete product"
                                                >
                                                    <span className="afwt-ecommerce-sr-only">Del</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="afwt-ecommerce-mt-8 afwt-ecommerce-flex afwt-ecommerce-justify-center">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="admin-button admin-button-success"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="afwt-ecommerce-mr-2"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Create New Product
                    </button>
                </div>
            </div>

            {isCreateModalOpen && (
                <ProductFormModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateProduct}
                    title="Create New Product"
                />
            )}

            {isEditModalOpen && currentProduct && (
                <ProductFormModal
                    product={currentProduct}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleEditProduct}
                    title="Edit Product"
                />
            )}

            {isDeleteModalOpen && currentProduct && (
                <DeleteConfirmationModal
                    productName={currentProduct.name}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => {
                        if (typeof currentProduct.id === "number") {
                            handleDeleteProduct(currentProduct.id.toString());
                        } else {
                            setError("Invalid product ID");
                        }
                    }}
                />
            )}
        </div>
    )
}

export default AdminProductsPage
