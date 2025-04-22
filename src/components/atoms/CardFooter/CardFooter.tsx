import type React from "react";

export const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`afwt-ecommerce-p-6 afwt-ecommerce-border-t ${className}`}>{children}</div>
)
