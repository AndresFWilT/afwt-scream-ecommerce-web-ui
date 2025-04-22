"use client"

import { useEffect, useState } from "react"
import { PurchaseService } from "../../services/purchase-service"
import type { IPurchase, IPurchaseSummary } from "../../types/purchase"

import { Card } from "../../components/molecules/card/Card"
import { CardHeader } from "../../components/atoms/CardHeader/CardHeader"
import { CardContent } from "../../components/atoms/CardContent/CardContent"
import { CardTitle } from "../../components/atoms/CardTitle/CardTitle"
import { Button } from "../../components/atoms/Button/Button"
import "./PurchaseHistoryHub.css"

export default function PurchaseHistoryHubPage() {
    const [purchases, setPurchases] = useState<IPurchaseSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedPurchase, setSelectedPurchase] = useState<IPurchase | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchPurchases()
    }, [])

    const fetchPurchases = async () => {
        setLoading(true)
        setError(null)
        try {
            const token = localStorage.getItem("token") || ""
            const data = await PurchaseService.getPurchaseHistory(token)
            setPurchases(data)
        } catch (err: any) {
            setError("Failed to fetch purchase history")
        } finally {
            setLoading(false)
        }
    }

    const openPurchaseDetail = async (id: number) => {
        try {
            const token = localStorage.getItem("token") || ""
            const data = await PurchaseService.getPurchaseById(id, token)
            setSelectedPurchase(data)
            setIsModalOpen(true)
        } catch {
            setError("Failed to fetch purchase details")
        }
    }

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date))
    }

    return (
        <div className="purchase-history-container">
            <h1 className="purchase-history-title">Purchase History</h1>

            {loading ? (
                <p className="purchase-history-loading">Loading...</p>
            ) : error ? (
                <p className="purchase-history-error">{error}</p>
            ) : purchases.length === 0 ? (
                <p className="purchase-history-empty">You have no purchases yet.</p>
            ) : (
                <div className="purchase-history-grid">
                    {purchases.map((purchase) => (
                        <Card key={purchase.id}>
                            <CardHeader>
                                <CardTitle>Order #{purchase.id}</CardTitle>
                            </CardHeader>
                            <CardContent className="purchase-summary">
                                <div className="purchase-summary-row">
                                    <span>Total:</span>
                                    <span>${purchase.totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="purchase-summary-row">
                                    <span>Date:</span>
                                    <span>{formatDate(purchase.createdAt)}</span>
                                </div>
                                <div className="purchase-summary-row afwt-ecommerce-mt-2">
                                    <Button
                                        onClick={() => openPurchaseDetail(purchase.id)}
                                        className="view-details-button"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {isModalOpen && selectedPurchase && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>Purchase Details</h2>
                            <button onClick={() => setIsModalOpen(false)} className="admin-modal-close" aria-label="Close">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="admin-modal-content">
                            <p><strong>Order ID:</strong> {selectedPurchase.id}</p>
                            <p><strong>Date:</strong> {formatDate(selectedPurchase.createdAt)}</p>
                            <p><strong>Total:</strong> ${selectedPurchase.totalAmount.toFixed(2)}</p>
                            <h3 className="afwt-ecommerce-mt-4 afwt-ecommerce-mb-2">Items</h3>
                            <ul>
                                {selectedPurchase.items.map(item => (
                                    <li key={item.productId}>
                                        {item.quantity} x {item.productName} (${item.unitPrice.toFixed(2)} each)
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="admin-modal-footer">
                            <Button onClick={() => setIsModalOpen(false)} className="admin-button admin-button-outline">
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
