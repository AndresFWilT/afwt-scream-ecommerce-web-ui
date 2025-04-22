import { Navigate } from "react-router-dom";
import { JSX } from "react";

import { useAuth } from "../context/authContext";

interface CustomerRouteProps {
    children: JSX.Element;
}

const CustomerRoute = ({ children }: CustomerRouteProps) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!user?.roles.includes("CUSTOMER")) return <Navigate to="/products" />;

    return children;
};

export default CustomerRoute;
