import { useState } from "react"
import FormIngresos from "../components/form-ingresos"
import { Sidebar } from "../components/hooks/sidebar"
import { Header } from "../components/hooks/heder" 
import '../App.css'

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isCollapsed={isSidebarCollapsed} toggleCollapse={function (): void {
                    throw new Error("Function not implemented.")
                } }            />   

            {/* Contenido principal */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : ''}`}>
                {/* Header */}
                
                <Header onToggleSidebar={toggleSidebar} />

                {/* Contenido */}
                <main className="flex-1">
                    <div className="container mx-auto py-3">
                        <FormIngresos />
                    </div>
                </main>
            </div>
        </div>
    )
}
// export default Home;
