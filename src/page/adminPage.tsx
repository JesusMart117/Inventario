import { Sidebar } from "../components/hooks/sidebar"; // Update this path to where your Sidebar component is actually located
import { Header } from "../components/hooks/heder";

export const FormIngresos = () => {
    return <h1>Bienvenido Administrador</h1>;
};

export function AdminPage() {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar isOpen={true} toggleSidebar={() => {}} isCollapsed={false} toggleCollapse={() => {}} />

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col transition-all duration-300 ml-1">
                {/* Header */}
                <Header onToggleSidebar={() => {}} />

                {/* Contenido */}
                <main className="flex-1">
                    <div className="container mx-auto py-3">
                        <FormIngresos />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminPage;