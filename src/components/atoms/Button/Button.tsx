import type React from "react";

export const Button = ({
                    children,
                    variant = "primary",
                    className = "",
                    onClick,
                    disabled = false,
                    size = "default",
                }: {
    children: React.ReactNode
    variant?: "primary" | "outline" | "destructive" | "success"
    className?: string
    onClick?: () => void
    disabled?: boolean
    size?: "default" | "sm" | "lg" | "icon"
}) => {
    const baseClass = "admin-button"
    const variantClass =
        variant === "primary"
            ? "admin-button-primary"
            : variant === "outline"
                ? "admin-button-outline"
                : variant === "destructive"
                    ? "admin-button-danger"
                    : "admin-button-success"

    const sizeClass =
        size === "sm"
            ? "afwt-ecommerce-text-sm afwt-ecommerce-py-1 afwt-ecommerce-px-3"
            : size === "lg"
                ? "afwt-ecommerce-text-lg afwt-ecommerce-py-2 afwt-ecommerce-px-6"
                : size === "icon"
                    ? "afwt-ecommerce-p-2 afwt-ecommerce-aspect-square"
                    : ""

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className} ${disabled ? "afwt-ecommerce-opacity-50 afwt-ecommerce-cursor-not-allowed" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
