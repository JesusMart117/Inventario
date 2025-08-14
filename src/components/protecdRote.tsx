import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        // No está autenticado
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Está autenticado pero no tiene permisos
        return <Navigate to="/unauthorized" replace />;
    }

    // Si pasa la validación, renderiza el contenido
    return children;
};

export default ProtectedRoute;
