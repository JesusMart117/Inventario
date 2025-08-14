"use client"

import { useState } from "react"
import Inventory from "../components/inventory" // Ajusta la ruta si es distinta
import { Sidebar } from "../components/hooks/sidebar"
import { Header } from "../components/hooks/heder" // Ajusta la ruta si es distinta

export default function InventarioPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed)

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={toggleCollapse}
            />

            {/* Contenido principal */}
            <div className="flex flex-col flex-1">
                <Header
                    onToggleSidebar={toggleSidebar}
                    showSidebarToggle={true}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <main className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Inventario</h1>
                    <Inventory />
                </main>
            </div>
        </div>
    )
}
