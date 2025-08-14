"use client";

import { useEffect, useState } from "react";

/* ---------- Tipos ---------- */
interface Solicitud {
    id: string;         // generado en FormSolicitud: Date.now().toString()
    fecha: string;
    area: string;
    correo: string;
    colaborador: string;
    dispositivo: string;
    accesorio: string;
    consumible: string;
    componente: string;
    justificacion: string;
}

/* ---------- Componente ---------- */
export default function InventoryTable() {
    /* --- estado --- */
    const [data, setData] = useState<Solicitud[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // más cortito porque ahora hay menos columnas

    /* --- carga inicial desde localStorage (simula API) --- */
    useEffect(() => {
        const stored = JSON.parse(
            localStorage.getItem("solicitudes") ?? "[]"
        ) as Solicitud[];
        setData(stored);
    }, []);

    /* --- helpers --- */
    const detectarRecurso = (s: Solicitud) => {
        const pares: Array<[string, string]> = [
            ["Dispositivo", s.dispositivo],
            ["Accesorio", s.accesorio],
            ["Consumible", s.consumible],
            ["Componente", s.componente],
        ];
        const encontrado = pares.find(([_, val]) => val && val !== "Ninguno");
        return encontrado ?? ["—", "—"];
    };

    const handleDelete = (id: string) => {
        const updated = data.filter((s) => s.id !== id);
        setData(updated);
        localStorage.setItem("solicitudes", JSON.stringify(updated)); // mantiene sincronía
    };

    /* --- filtros y paginación --- */
    const filtrados = data.filter((s) => {
        const term = searchTerm.toLowerCase();
        const [, recurso] = detectarRecurso(s);
        return (
            s.area.toLowerCase().includes(term) ||
            s.colaborador.toLowerCase().includes(term) ||
            s.correo.toLowerCase().includes(term) ||
            recurso.toLowerCase().includes(term)
        );
    });

    const totalPages = Math.max(1, Math.ceil(filtrados.length / itemsPerPage));
    const currentItems = filtrados.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    /* ---------- JSX ---------- */
    return (
        <div className="overflow-x-auto rounded-lg shadow mt-6 mx-3 bg-white">
            {/* barra de búsqueda */}
            <div className="flex items-center justify-between p-4">
                <input
                    type="text"
                    placeholder="Buscar área, colaborador, correo o recurso..."
                    className="flex-1 mr-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                {/* icono de actualización rápido */}
                <button
                    onClick={() => {
                        const stored = JSON.parse(
                            localStorage.getItem("solicitudes") ?? "[]"
                        ) as Solicitud[];
                        setData(stored);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                >
                    Recargar
                </button>
            </div>

            {/* tabla */}
            <div className="overflow-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Fecha</th>
                            <th className="px-4 py-3">Área</th>
                            <th className="px-4 py-3">Colaborador</th>
                            <th className="px-4 py-3">Correo</th>
                            <th className="px-4 py-3">Tipo</th>
                            <th className="px-4 py-3">Recurso</th>
                            <th className="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6">
                                    No se encontraron registros
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((s) => {
                                const [tipo, recurso] = detectarRecurso(s);
                                return (
                                    <tr key={s.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{s.fecha}</td>
                                        <td className="px-4 py-2">{s.area}</td>
                                        <td className="px-4 py-2">{s.colaborador}</td>
                                        <td className="px-4 py-2">{s.correo}</td>
                                        <td className="px-4 py-2">{tipo}</td>
                                        <td className="px-4 py-2">{recurso}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(s.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Borrar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* paginación */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 py-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-3 py-1 text-sm rounded disabled:opacity-40"
                    >
                        ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button
                            key={n}
                            onClick={() => setCurrentPage(n)}
                            className={`px-3 py-1 text-sm rounded ${n === currentPage ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1 text-sm rounded disabled:opacity-40"
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}
