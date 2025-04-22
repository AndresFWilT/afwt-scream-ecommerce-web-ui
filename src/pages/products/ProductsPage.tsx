"use client"

import { useEffect, useState } from "react"
import { ProductService } from "../../services/product-service"
import type { IProduct } from "../../types/product"
import ProductCard from "../../components/molecules/product-card/ProductCard"
import PaginationControls from "../../components/molecules/pagination/PaginationControls"

const ProductsPage = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [hasMore, setHasMore] = useState(true)

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

    useEffect(() => {
        fetchProducts(currentPage, itemsPerPage)
    }, [currentPage, itemsPerPage])

    const handlePageChange = (page: number) => {
        if (page >= 1) setCurrentPage(page)
    }

    const handleItemsPerPageChange = (limit: number) => {
        setItemsPerPage(limit)
        setCurrentPage(1)
    }

    return (
        <div className="afwt-ecommerce-min-h-screen">
            <div className="afwt-ecommerce-container afwt-ecommerce-mx-auto" style={{ padding: 'clamp(1rem, 5vw, 3rem)' }}>
                <div className="afwt-ecommerce-text-center afwt-ecommerce-mb-12">
                    <h1 className="afwt-ecommerce-text-3xl afwt-ecommerce-font-bold afwt-ecommerce-mb-4">Our Lovely Products</h1>
                    <p className="afwt-ecommerce-text-lg afwt-ecommerce-max-w-2xl afwt-ecommerce-mx-auto">
                        Discover our curated collection of beautiful items just for you ✿
                    </p>
                </div>

                {loading && (
                    <div className="afwt-ecommerce-flex afwt-ecommerce-justify-center afwt-ecommerce-items-center afwt-ecommerce-h-64">
                        <p className="afwt-ecommerce-text-xl">Loading lovely products...</p>
                    </div>
                )}

                {error && (
                    <div className="afwt-ecommerce-flex afwt-ecommerce-justify-center afwt-ecommerce-items-center afwt-ecommerce-h-64">
                        <p className="afwt-ecommerce-text-red-400 afwt-ecommerce-text-xl">{error} ♡</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="afwt-ecommerce-grid afwt-ecommerce-gap-8 afwt-ecommerce-grid-cols-1 sm:afwt-ecommerce-grid-cols-2 md:afwt-ecommerce-grid-cols-3 lg:afwt-ecommerce-grid-cols-4">
                        {products.length === 0 ? (
                            <div className="afwt-ecommerce-col-span-full afwt-ecommerce-flex afwt-ecommerce-justify-center afwt-ecommerce-items-center afwt-ecommerce-h-64">
                                <p className="afwt-ecommerce-text-xl">No products available at the moment ✿</p>
                            </div>
                        ) : (
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className="afwt-ecommerce-h-full"
                                    style={{ marginBlock: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))
                        )}
                    </div>
                )}


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

            </div>
        </div>
    )
}

export default ProductsPage
