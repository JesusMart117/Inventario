import type React from "react"
import type { Metadata } from "next"
import "./app.css"

export const metadata: Metadata = {
    title: "Sistema de Inventario",
    description: "Formulario de registro de dispositivos",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    )
}
