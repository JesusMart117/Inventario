import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

const mockUsers: User[] = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" },
];

export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const foundUser = mockUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (foundUser) {
            // Guardar en localStorage para proteger las rutas
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

            // Redirigir según el rol
            if (foundUser.role === "admin") navigate("/ingresos");
            else if (foundUser.role === "user") navigate("/user");
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    };

    const goToNotifications = () => {
        navigate("/notificaciones");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
            style={{
                backgroundImage: `url('/imagnes/teleton.jpeg')`,
                backgroundSize: "cover",
            }}
        >
            <div className="w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Iniciar sesión
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Ingresar
                    </button>

                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-center text-gray-600 mb-2">
                            ¿Necesitas hacer una solicitud?
                        </p>
                        <button
                            onClick={goToNotifications}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            solicitudes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
