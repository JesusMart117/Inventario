import { useNavigate } from "react-router-dom"
import { Menu, User, Bell, LogOut } from "lucide-react"
import { Button } from "../Ui/button"

interface HeaderProps {
    title?: string
    onToggleSidebar?: () => void
    showSidebarToggle?: boolean
    isSidebarCollapsed?: boolean
}

export function Header({
    title = "Solicitudes",
    onToggleSidebar,
    showSidebarToggle = true,
    isSidebarCollapsed = false
}: HeaderProps) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser")
        navigate("/inventario") // Ajusta si tu ruta de login es diferente
    }

    return (
        <header className="sticky top-0 z-30 bg-white shadow-sm w-full border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                {/* Sección izquierda - Logo y botón menú */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {showSidebarToggle && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={onToggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    )}

                    <div className="flex items-center">
                        <svg
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                            />
                        </svg>
                        <h1 className={cn(
                            "ml-2 text-lg font-bold text-gray-800",
                            isSidebarCollapsed ? "lg:block" : "hidden sm:block"
                        )}>
                            {title}
                        </h1>
                    </div>
                </div>

                {/* Sección derecha - Acciones de usuario */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500" />
                    </Button>

                    <div className="hidden sm:flex items-center space-x-2">
                        {!isSidebarCollapsed && (
                            <>
                                <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="h-3.5 w-3.5 text-blue-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden md:inline">colaborador</span>
                            </>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        title="Cerrar sesión"
                        className="hidden sm:inline-flex"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
