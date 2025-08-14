import { Sidebar } from "../components/hooks/sidebar"; // Ajusta la ruta si es necesario
import { Header } from "../components/hooks/heder"; // Ajusta la ruta si es necesario
import InventoryCharts from "../components/graficsChart";

export default function GraficasPage() {
    const data = [
        {
            id: 1,
            dispositivo: "Laptop Dell",
            modelo: "Latitude 5420",
            numeroSerie: "ABC123456",
            estado: "Disponible",
            ubicacion: "Oficina A",
            responsable: "Juan Pérez",
            fecha: "2025-06-25",
            ip: "192.168.1.10",
            comentarios: "Equipo nuevo asignado para pruebas",
            categoria: "Dispositivos"
        },
        // ... otros objetos
    ];

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={false} toggleSidebar={function (): void {
                throw new Error("Function not implemented.");
            } } isCollapsed={false} toggleCollapse={function (): void {
                throw new Error("Function not implemented.");
            } } />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Gráficas de inventario</h1>
                    <InventoryCharts data={data} />
                </main>
            </div>
        </div>
    );
}
