"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUp } from "../../../services/auth-service.ts"
import "../auth.css"

export default function SignUpPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            await signUp(form)
            navigate("/login")
        } catch (err: any) {
            setError(err.message || "Error signing up")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page afwt-ecommerce-min-h-screen afwt-ecommerce-flex afwt-ecommerce-items-center afwt-ecommerce-justify-center afwt-ecommerce-p-4 afwt-ecommerce-py-12">
            <div className="auth-container afwt-ecommerce-w-full afwt-ecommerce-max-w-md">
                <div className="auth-form-container">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join our community of shoppers</p>

                    {error && (
                        <div className="auth-error">
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
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Full Name
                            </label>
                            <div className="input-container">
                                <svg
                                    className="input-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <div className="input-container">
                                <svg
                                    className="input-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-container">
                                <svg
                                    className="input-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <p className="form-hint">Password must be at least 8 characters</p>
                        </div>

                        <button type="submit" className="auth-button" disabled={isLoading}>
                            {isLoading ? (
                                <span className="afwt-ecommerce-flex afwt-ecommerce-items-center afwt-ecommerce-justify-center afwt-ecommerce-gap-2">
                  <svg
                      className="afwt-ecommerce-animate-spin"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75"></path>
                  </svg>
                  Creating account...
                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account?</p>
                        <button onClick={() => navigate("/login")} className="auth-link-button" type="button">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
