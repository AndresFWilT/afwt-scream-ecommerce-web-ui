import { Navigate } from "react-router-dom"
import {JSX} from "react";

import { useAuth } from "../context/authContext"

interface AdminRouteProps {
    children: JSX.Element
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) return <Navigate to="/login" />
    if (!user?.roles.includes("ADMIN")) return <Navigate to="/products" />

    return children
}

export default AdminRoute
