import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    LayoutDashboard,
    Box,
    LogIn,
    BarChart2,
    LogOut,
    ChevronLeft
} from "lucide-react"
import { Button } from "../Ui/button"
import { cn } from "../../lib/utils"
import { useEffect, useState } from "react"

interface SidebarProps {
    isOpen: boolean
    toggleSidebar: () => void
    isCollapsed: boolean
    toggleCollapse: () => void
}

export function Sidebar({
    isOpen,
    toggleSidebar,
    isCollapsed,
    toggleCollapse
}: SidebarProps) {
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false)

    /* ---------- detectar tamaño de pantalla ---------- */
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    /* ---------- 🆕 cerrar / colapsar al entrar a Inventario ---------- */
    useEffect(() => {
        if (pathname.startsWith("/inventario")) {
            /* En móvil: oculta completamente */
            if (isMobile && isOpen) toggleSidebar()

            /* En desktop: colapsa si aún no está colapsado */
            if (!isMobile && !isCollapsed) toggleCollapse()
        }
        /* Dependencias */
    }, [pathname, isMobile, isOpen, isCollapsed, toggleSidebar, toggleCollapse])

    /* ---------- ítems del menú ---------- */
    const menuItems = [
        { name: "Inventario", href: "/inventario", icon: Box },
        { name: "Ingresos", href: "/ingresos", icon: LogIn },
        { name: "Gráficas", href: "/graficas", icon: BarChart2 }
    ]

    const handleSignOut = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <>
            {/* Overlay para móvil */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={cn(
                    "fixed lg:sticky inset-y-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {/* Logo + botón collapse */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                    <Link
                        to="/"
                        className={cn(
                            "flex items-center overflow-hidden transition-all",
                            isCollapsed ? "justify-center w-full" : "space-x-2"
                        )}
                    >
                        <LayoutDashboard className="h-10 w-6 text-blue-600 shrink-0" />
                        {!isCollapsed && (
                            <span className="text-lg font-semibold text-gray-800 truncate">
                                Sistema TI
                            </span>
                        )}
                    </Link>

                    {!isCollapsed && (
                        <button
                            onClick={toggleCollapse}
                            className="p-1 rounded-md hover:bg-gray-100 hidden lg:block"
                            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Menú principal */}
                <nav className="flex-1 overflow-y-auto py-2">
                    <ul className="space-y-1 px-2">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors",
                                        pathname.startsWith(item.href)
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700",
                                        isCollapsed ? "justify-center" : ""
                                    )}
                                    title={isCollapsed ? item.name : ""}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Botón cerrar sesión */}
                <div className="p-2 border-t border-gray-200">
                    <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className={cn(
                            "w-full flex items-center hover:bg-gray-100 text-gray-700",
                            isCollapsed ? "justify-center" : "px-3"
                        )}
                        size={isCollapsed ? "icon" : "default"}
                        title={isCollapsed ? "Cerrar sesión" : ""}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span className="ml-3 truncate">Cerrar sesión</span>}
                    </Button>
                </div>
            </aside>
        </>
    )
}
