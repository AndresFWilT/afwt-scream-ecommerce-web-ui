import type React from "react";

export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`afwt-ecommerce-p-6 ${className}`}>{children}</div>
)
