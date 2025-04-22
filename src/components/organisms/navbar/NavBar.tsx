"use client"

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./Navbar.css"
import { useAuth } from "../../../context/authContext.tsx";

export default function Navbar() {
    const { isAuthenticated, user, logout, loading } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
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
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    Elegant Shop
                </Link>

                <button className="navbar-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
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
                        {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12"></path> : <path d="M3 12h18M3 6h18M3 18h18"></path>}
                    </svg>
                </button>

                <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
                    <NavLink to="/" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}>
                        Home
                    </NavLink>
                    <NavLink to="/products" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}>
                        Products
                    </NavLink>

                    {!loading && (
                        <div className="navbar-auth">
                            {isAuthenticated && user ? (
                                <div className="afwt-ecommerce-flex afwt-ecommerce-items-center afwt-ecommerce-gap-3 afwt-ecommerce-flex-wrap">
                                    {user.roles.includes("CUSTOMER") && (
                                        <>
                                            <Link to="/cart" className="navbar-button navbar-button-outline">
                                                Cart
                                            </Link>
                                            <Link to="/purchase/history" className="navbar-button navbar-button-outline">
                                                Purchases
                                            </Link>
                                        </>
                                    )}

                                    {user.roles.includes("ADMIN") && (
                                        <Link to="/admin/products" className="navbar-button navbar-button-primary">
                                            Manage Products
                                        </Link>
                                    )}

                                    <button onClick={logout} className="navbar-button navbar-button-outline">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="navbar-button navbar-button-outline">
                                        Sign In
                                    </Link>
                                    <Link to="/sign-up" className="navbar-button navbar-button-primary">
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
