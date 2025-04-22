import type React from "react";

export const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`afwt-ecommerce-p-6 afwt-ecommerce-border-b ${className}`}>{children}</div>
)
