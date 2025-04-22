import { Link } from "react-router-dom"
import type { IProduct } from "../../../types/product"
import "./ProductCard.css"

interface ProductCardProps {
    product: IProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
    const isNew = product.id ? product.id % 3 === 0 : false
    const isOnSale = product.id ? product.id % 5 === 0 : false
    const stockStatus = product.stock === 0 ? "out-of-stock" : product.stock < 5 ? "low-stock" : "in-stock"

    return (
        <div className="product-card afwt-ecommerce-bg-white afwt-ecommerce-flex afwt-ecommerce-flex-col">
            {isNew && <span className="product-badge badge-new">New</span>}
            {isOnSale && <span className="product-badge badge-sale">Sale</span>}

            <div className="afwt-ecommerce-flex afwt-ecommerce-flex-col afwt-ecommerce-h-full">
                <div className="product-image-container">
                    {product.imageUrl ? (
                        <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} loading="lazy"/>
                    ) : (
                        <div
                            className="afwt-ecommerce-w-full afwt-ecommerce-h-full afwt-ecommerce-flex afwt-ecommerce-items-center afwt-ecommerce-justify-center afwt-ecommerce-text-gray-400">
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                        </div>
                    )}
                </div>

                <h2 className="afwt-ecommerce-line-clamp-1">{product.name}</h2>
                <p className="afwt-ecommerce-line-clamp-2 afwt-ecommerce-mb-auto">{product.description}</p>

                <div className="product-meta">
                    <span className="price-tag">${product.price.toFixed(2)}</span>
                    <span className={`stock-indicator ${stockStatus}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
                </div>

                <div className="afwt-ecommerce-mt-4">
                    <Link to={product.id ? `/product/${product.id}` : "#"} className="view-details-btn">
                        View Details
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
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
