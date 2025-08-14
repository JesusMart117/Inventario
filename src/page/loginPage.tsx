// src/page/LoginPage.tsx
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { useRouter } from "next/router";

function LoginPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    /** Valida dominio corporativo y redirige o muestra alerta */
    const goToRequests = () => {
        const pattern = /^[\w-.]+@teleton\.org\.mx$/i;
        if (pattern.test(email.trim())) {
            router.push("/solicitudes");
        } else {
            alert("Debes usar un correo empresarial (@teleton.org.mx) para continuar.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-purple-800">
            {/* Header con botón Solicitudes y usuario */}
            <header className="w-full flex justify-between items-center p-4">
                <button
                    onClick={goToRequests}
                    className="bg-pink-300 text-purple-900 font-bold py-3 px-6 rounded-lg hover:bg-pink-400 transition-colors"
                >
                    Solicitudes
                </button>

                <div className="flex flex-col items-center">
                    <UserCircle className="h-10 w-10 text-white" />
                    <span className="text-white text-sm">Usuario</span>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md flex flex-col items-center gap-8">
                    {/* Logo Teletón */}
                    <div className="w-64 h-64 relative mb-4">
                        <Image
                            src="/src/imagenes/teleton.jpeg"
                            alt="Teletón Fundación"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Texto Teletón */}
                    <div className="text-white text-5xl font-bold">
                        Teletón
                        <div className="text-2xl text-center mt-1">Fundación</div>
                    </div>

                    {/* Input de correo corporativo */}
                    <input
                        type="email"
                        placeholder="correo@teleton.org.mx"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full max-w-xs rounded-lg p-3 text-purple-800"
                    />

                    {/* Botón de inicio de sesión */}
                    <Link
                        href="/login"
                        className="bg-white text-purple-800 font-bold py-3 px-8 rounded-lg mt-4 hover:bg-gray-100 transition-colors w-full max-w-xs text-center"
                    >
                        Inicio de sesión
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;
