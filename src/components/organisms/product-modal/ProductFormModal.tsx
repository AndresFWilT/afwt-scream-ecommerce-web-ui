"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { IProduct } from "../../../types/product"

interface ProductFormModalProps {
    product?: IProduct
    onClose: () => void
    onSubmit: (product: Omit<IProduct, "id"> & { id?: number }) => void
    title: string
}

const ProductFormModal = ({ product, onClose, onSubmit, title }: ProductFormModalProps) => {
    const [formData, setFormData] = useState<Omit<IProduct, "id">>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
    })

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description || "",
                price: product.price,
                stock: product.stock,
                imageUrl: product.imageUrl || "",
            })
        }
    }, [product])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === "price" || name === "stock" ? Number.parseFloat(value) : value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const payload = product?.id
            ? { ...formData, id: product.id }
            : formData

        onSubmit(payload)
    }

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal">
                <div className="admin-modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="admin-modal-close" aria-label="Close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="admin-input"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="admin-textarea"
                            placeholder="Enter product description"
                            rows={4}
                        />
                    </div>

                    <div className="admin-form-row">
                        <div className="admin-form-group">
                            <label htmlFor="price">Price ($)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="admin-input"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="admin-input"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="admin-input"
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.imageUrl && (
                            <div className="admin-image-preview afwt-ecommerce-mt-2">
                                <img src={formData.imageUrl} alt="Product preview" className="afwt-ecommerce-rounded" />
                            </div>
                        )}
                    </div>

                    <div className="admin-modal-footer">
                        <button type="button" onClick={onClose} className="admin-button admin-button-outline">
                            Cancel
                        </button>
                        <button type="submit" className="admin-button admin-button-primary">
                            {product ? "Update Product" : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductFormModal
