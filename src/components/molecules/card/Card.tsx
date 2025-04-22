import type React from "react";

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div
        className={`afwt-ecommerce-bg-white afwt-ecommerce-border afwt-ecommerce-rounded-lg afwt-ecommerce-shadow-sm ${className}`}
    >
        {children}
    </div>
)
