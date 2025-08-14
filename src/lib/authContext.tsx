// src/lib/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem("authenticated");
        if (storedAuth === "true") setIsAuthenticated(true);
    }, []);

    const login = (username: string, password: string) => {
        // lógica de autenticación simple
        if (username && password) {
            setIsAuthenticated(true);
            localStorage.setItem("authenticated", "true");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("authenticated");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};
