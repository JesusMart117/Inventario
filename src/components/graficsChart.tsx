"use client";

import {
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    LineChart,
    Line,
    Cell,
} from "recharts";

export default function InventoryCharts({ data }: { data: any[] }) {
    const ESTADOS = ["Disponible", "Asignado", "Mantenimiento", "RAEE"];
    const CATEGORIAS = ["Dispositivos", "Accesorios", "Consumibles", "Componentes"];

    const dataConCategoria = data.map(item => ({
        ...item,
        categoria: item.categoria ?? "Dispositivos",
    }));

    const colores = {
        Disponible: "#86efac",
        Asignado: "#93c5fd",
        Mantenimiento: "#fde68a",
        RAEE: "#fca5a5",
    };

    // Conteo de dispositivos por estado y categoría                
    const conteoPorEstado = ESTADOS.map(estado => ({
        name: estado,
        value: data.filter(item => item.estado === estado).length,
    }));

    const conteoPorCategoria = CATEGORIAS.map((cat) => ({
        name: cat,
        value: dataConCategoria.filter((item) => item.categoria === cat).length,
    }));

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfica de líneas - Ingresos por categoría */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Ingresos por categoría</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={conteoPorCategoria}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfica de barras - Estado de los dispositivos */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Cantidad por estado</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={conteoPorEstado}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value">
                            {conteoPorEstado.map((entry, i) => (
                                <Cell key={i} fill={colores[entry.name as keyof typeof colores]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
