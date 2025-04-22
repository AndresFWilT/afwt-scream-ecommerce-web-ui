import { Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/auth/login/LoginPage'
import SignUpPage from "../pages/auth/signup/SignUpPage"
import ProductsPage from '../pages/products/ProductsPage'
import Navbar from "../components/organisms/navbar/NavBar"
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import AdminRoute from "../guards/AdminRoute.tsx"
import CustomerRoute from "../guards/CustomerRoute.tsx"
import CartHubPage from '../pages/cart/CartHubPage'
import ProductDetailPage from "../pages/products/detail/ProductDetailPage.tsx"
import PurchaseHistoryHubPage from "../pages/purchases/PuchaseHistoryHub.tsx";

function App() {
    return (
        <div className="afwt-ecommerce-min-h-screen afwt-ecommerce-bg-white afwt-ecommerce-text-gray-900">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<ProductsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />

                    <Route
                        path="/admin/products"
                        element={
                            <AdminRoute>
                                <AdminProductsPage />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            <CustomerRoute>
                                <CartHubPage />
                            </CustomerRoute>
                        }
                    />

                    <Route
                        path="/purchase/history"
                        element={
                            <CustomerRoute>
                                <PurchaseHistoryHubPage />
                            </CustomerRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    )
}

export default App
