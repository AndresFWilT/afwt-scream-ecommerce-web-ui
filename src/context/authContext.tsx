import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {decodeJwt} from "../utils/jwt/decode-jwt.ts";

interface DecodedToken {
    sub: string
    name: string
    email: string
    roles: string[]
    exp: number
    iat: number
}

interface AuthContextType {
    isAuthenticated: boolean
    user: DecodedToken | null
    loading: boolean
    login: (token: string) => void
    logout: () => void
    hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<DecodedToken | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setUser(null)
            setIsAuthenticated(false)
            setLoading(false)
            return
        }

        try {
            const decoded = decodeJwt(token)

            console.log(decoded)

            if (decoded && decoded.exp * 1000 < Date.now()) {
                logout()
                return
            }

            setUser(decoded)
            setIsAuthenticated(true)
        } catch (e) {
            logout()
        }

        setLoading(false)
    }

    const login = (token: string) => {
        localStorage.setItem("token", token)
        checkAuthStatus()
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        setIsAuthenticated(false)
        navigate("/login")
    }

    const hasRole = (role: string) => user?.roles.includes(role) || false

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within AuthProvider")
    return context;
}
