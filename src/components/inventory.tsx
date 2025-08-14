"use client";

import { useEffect, useState } from "react";

/* =============================================================
   🗂️  Tipos, interfaces y configuraciones (SIN CAMBIOS)
   ============================================================= */
export type Category =
    | "Dispositivos"
    | "Consumibles"
    | "Componentes"
    | "Accesorios";

type StatusFilter =
    | "Todos"
    | "Asignado"
    | "Sin asignar"
    | "Mantenimiento"
    | "RAEE";

type ItemStatus =
    | "Disponible"
    | "Asignado"
    | "Mantenimiento"
    | "Temporal"
    | "RAEE";

interface BaseItem {
    id: number;
    fecha: string;
    estado: ItemStatus;
    comentarios: string;
    imagen?: string;
}

export interface DispositivoItem extends BaseItem {
    dispositivo: string;
    modelo: string;
    numeroSerie: string;
    ubicacion: string;
    responsable: string;
    ip: string;
}
export interface ConsumibleItem extends BaseItem {
    consumible: string;
    modelo: string;
}
export interface ComponenteItem extends BaseItem {
    componente: string;
    numeroSerie: string;
}
export interface AccesorioItem extends BaseItem {
    accesorio: string;
    modelo: string;
    numeroSerie: string;
}

export type AnyItem =
    | DispositivoItem
    | ConsumibleItem
    | ComponenteItem
    | AccesorioItem;

export type ItemKey =
    | "id"
    | "fecha"
    | "comentarios"
    | "imagen"
    | "dispositivo"
    | "modelo"
    | "numeroSerie"
    | "estado"
    | "ubicacion"
    | "responsable"
    | "ip"
    | "consumible"
    | "componente"
    | "accesorio";

export interface ColumnConfig {
    key: ItemKey;
    label: string;
    isEstado?: boolean;
    isLong?: boolean;
    mobileHidden?: boolean;
    priority?: number;
}
export type CategoryColumnConfig = Record<string, ColumnConfig>;

const commonCols = {
    estado: {
        key: "estado",
        label: "Estado",
        isEstado: true,
        priority: 2
    } as ColumnConfig
};

export const columnConfig: Record<Category, CategoryColumnConfig> = {
    Dispositivos: {
        dispositivo: { key: "dispositivo", label: "Dispositivo", priority: 1 },
        modelo: { key: "modelo", label: "Modelo", priority: 2 },
        numeroSerie: { key: "numeroSerie", label: "Serie", priority: 3 },
        ip: { key: "ip", label: "IP", priority: 4, mobileHidden: true },
        ...commonCols,
        ubicacion: { key: "ubicacion", label: "Área", priority: 3 },
        responsable: { key: "responsable", label: "Responsable", priority: 3 },
        fecha: { key: "fecha", label: "Fecha", priority: 4, mobileHidden: true },
        comentarios: {
            key: "comentarios",
            label: "Comentarios",
            isLong: true,
            mobileHidden: true,
            priority: 5
        },
        imagen: { key: "imagen", label: "Imagen", mobileHidden: true, priority: 5 }
    },
    Consumibles: {
        consumible: { key: "consumible", label: "Consumible", priority: 1 },
        modelo: { key: "modelo", label: "Modelo", priority: 2 },
        ...commonCols,
        fecha: { key: "fecha", label: "Fecha", priority: 4, mobileHidden: true },
        comentarios: {
            key: "comentarios",
            label: "Comentarios",
            isLong: true,
            mobileHidden: true,
            priority: 5
        },
        imagen: { key: "imagen", label: "Imagen", mobileHidden: true, priority: 5 }
    },
    Componentes: {
        componente: { key: "componente", label: "Componente", priority: 1 },
        numeroSerie: { key: "numeroSerie", label: "Serie", priority: 2 },
        ...commonCols,
        fecha: { key: "fecha", label: "Fecha", priority: 4, mobileHidden: true },
        comentarios: {
            key: "comentarios",
            label: "Comentarios",
            isLong: true,
            mobileHidden: true,
            priority: 5
        },
        imagen: { key: "imagen", label: "Imagen", mobileHidden: true, priority: 5 }
    },
    Accesorios: {
        accesorio: { key: "accesorio", label: "Accesorio", priority: 1 },
        modelo: { key: "modelo", label: "Modelo", priority: 2 },
        numeroSerie: { key: "numeroSerie", label: "Serie", priority: 3 },
        ...commonCols,
        fecha: { key: "fecha", label: "Fecha", priority: 4, mobileHidden: true },
        comentarios: {
            key: "comentarios",
            label: "Comentarios",
            isLong: true,
            mobileHidden: true,
            priority: 5
        },
        imagen: { key: "imagen", label: "Imagen", mobileHidden: true, priority: 5 }
    }
};

/* =============================================================

   ============================================================= */
const generateNewId = (items: AnyItem[]) => {
    let id = 1;
    const used = new Set(items.map((i) => i.id));
    while (used.has(id)) id++;
    return id;
};

const getEstadoColor = (estado?: string) => {
    const e = (estado || "").toLowerCase();
    switch (e) {
        case "disponible":
            return "bg-green-100 text-green-800 border border-green-200";
        case "asignado":
            return "bg-blue-100 text-blue-800 border border-blue-200";
        case "mantenimiento":
            return "bg-yellow-100 text-yellow-800 border border-yellow-200";
        case "temporal":
            return "bg-purple-100 text-purple-800 border border-purple-200";
        case "raee":
            return "bg-red-100 text-red-800 border border-red-200";
        default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
    }
};

/* =============================================================
    📦  Componente principal
   ============================================================= */
export default function InventoryTable() {
    /* ---------- estado global ---------- */
    const [category, setCategory] = useState<Category>("Dispositivos");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");

    /** Datos por categoría en localStorage */
    const [rows, setRows] = useState<Record<Category, AnyItem[]>>(() => {
        try {
            const stored = localStorage.getItem("inventario‑por‑categoria");
            if (stored) return JSON.parse(stored);
        } catch { }
        return {
            Dispositivos: [
                {
                    id: 1,
                    dispositivo: "Laptop Dell",
                    modelo: "Latitude 5420",
                    numeroSerie: "ABC123456",
                    estado: "Disponible",
                    ubicacion: "Oficina A",
                    responsable: "",
                    fecha: "2025‑06‑25",
                    ip: "192.168.1.10",
                    comentarios: "Equipo nuevo en inventario",
                    imagen: ""
                } as DispositivoItem
            ],
            Consumibles: [],
            Componentes: [],
            Accesorios: []
        };
    });

    useEffect(() => {
        localStorage.setItem("inventario‑por‑categoria", JSON.stringify(rows));
    }, [rows]);

    /* ---------- búsqueda y paginación ---------- */
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    const visibleRows = rows[category].filter((r) => {
        const matchesSearch = JSON.stringify(r).toLowerCase().includes(search.toLowerCase());
        if (statusFilter === "Todos") return matchesSearch;
        if (statusFilter === "Asignado") return matchesSearch && r.estado === "Asignado";
        if (statusFilter === "Sin asignar") return matchesSearch && (r.estado === "Disponible" || r.estado === "Temporal");
        if (statusFilter === "Mantenimiento") return matchesSearch && r.estado === "Mantenimiento";
        if (statusFilter === "RAEE") return matchesSearch && r.estado === "RAEE";
        return matchesSearch;
    });

    const totalPages = Math.max(1, Math.ceil(visibleRows.length / perPage));
    const pageRows = visibleRows.slice((page - 1) * perPage, page * perPage);

    /* ---------- alta / edición ---------- */
    const empty = {} as AnyItem;
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<AnyItem>(empty);

    const onFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;

        // Si es un archivo de imagen
        if (name === "imagen" && files && files[0]) {
            const reader = new FileReader();
            reader.onload = () =>
                setForm((f) => ({ ...f, imagen: reader.result as string }));
            reader.readAsDataURL(files[0]);
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const startAdd = () => {
        setAdding(true);
        setEditingId(null);
        setForm({
            id: 0,
            fecha: "",
            estado: "Disponible",
            comentarios: "",
            imagen: ""
        } as AnyItem);
    };
    const startEdit = (row: AnyItem) => {
        setEditingId(row.id);
        setAdding(false);
        setForm({ ...row });
    };
    const cancel = () => {
        setAdding(false);
        setEditingId(null);
        setForm(empty);
    };
    const save = () => {
        if (adding) {
            const newRow = { ...form, id: generateNewId(rows[category]) };
            setRows((prev) => ({ ...prev, [category]: [...prev[category], newRow] }));
        } else if (editingId != null) {
            setRows((prev) => ({
                ...prev,
                [category]: prev[category].map((r) => (r.id === editingId ? form : r))
            }));
        }
        cancel();
    };
    const remove = (id: number) =>
        setRows((prev) => ({ ...prev, [category]: prev[category].filter((r) => r.id !== id) }));

    /* =============================================================
       🎨  💡  CLASES RESPONSIVAS NUEVAS
       ============================================================= */
    const baseCell =
        "p-1 md:px-2 md:py-2 break-words whitespace-normal align-top text-xs";
    const stickyL = `${baseCell} sticky left-0 bg-white z-10 w-12`;
    const stickyR = `${baseCell} sticky right-0 bg-white z-10 w-24`;

    const getCellClass = (col: ColumnConfig) => {
        const base = `${baseCell} ${col.mobileHidden ? "hidden md:table-cell" : ""}`;
        if (col.key === "ip") return `${base} w-24`;
        if (col.key === "numeroSerie") return `${base} w-28`;
        if (col.key === "estado") return `${base} w-28`;
        if (col.key === "ubicacion") return `${base} w-32`;
        if (col.key === "responsable") return `${base} w-36`;
        if (col.key === "modelo") return `${base} w-40`;
        return base;
    };

    // Orden de columnas (prioridad)
    const sortedColumns = Object.values(columnConfig[category]).sort(
        (a, b) => (a.priority || 5) - (b.priority || 5)
    );

    /* =============================================================
       🖥️  RENDER
       ============================================================= */
    return (
        <div className="w-full mx-auto max-w-screen-2xl">
            {/* ------------ Barra superior (sin cambios) ------------ */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 bg-white rounded-t-lg shadow-sm">
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value as Category);
                            setPage(1);
                            setSearch("");
                            cancel();
                        }}
                        className="border px-3 py-2 rounded-lg bg-white w-full md:w-auto"
                    >
                        <option>Dispositivos</option>
                        <option>Consumibles</option>
                        <option>Componentes</option>
                        <option>Accesorios</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value as StatusFilter);
                            setPage(1);
                        }}
                        className="border px-3 py-2 rounded-lg bg-white w-full md:w-auto"
                    >
                        <option>Todos</option>
                        <option>Asignado</option>
                        <option>Sin asignar</option>
                        <option>Mantenimiento</option>
                        <option>RAEE</option>
                    </select>
                </div>

                <div className="relative flex-grow w-full md:w-auto">
                    <div className="relative">
                        <input
                            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Buscar…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* icono lupa */}
                        <svg
                            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={startAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full md:w-auto flex items-center justify-center gap-2 text-sm"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Agregar</span>
                </button>
            </div>

            {/* ------------ Tabla ------------ */}
            <div className="bg-white rounded-b-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-700">
                        <thead className="bg-gray-50 uppercase text-gray-500 text-xs">
                            <tr className="divide-x divide-gray-200">
                                <th className={stickyL}>ID</th>
                                {sortedColumns.map((col) => (
                                    <th key={col.key} className={getCellClass(col)}>
                                        {col.label}
                                    </th>
                                ))}
                                <th className={stickyR}>Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 text-xs md:text-sm">
                            {/* -------- fila de alta rápida -------- */}
                            {adding && (
                                <tr className="divide-x divide-gray-200 bg-blue-50">
                                    <td className={stickyL}>Nuevo</td>
                                    {sortedColumns.map((col) => (
                                        <td key={col.key} className={getCellClass(col)}>
                                            {renderInput(col, (form as any)[col.key], onFormChange)}
                                        </td>
                                    ))}
                                    <td className={stickyR}>
                                        <ActionButtons onSave={save} onCancel={cancel} />
                                    </td>
                                </tr>
                            )}

                            {/* -------- filas existentes -------- */}
                            {pageRows.length > 0 ? (
                                pageRows.map((row) => {
                                    const editing = editingId === row.id;
                                    return (
                                        <tr key={row.id} className="divide-x divide-gray-200 hover:bg-gray-50 transition-colors">
                                            <td className={stickyL}>{row.id}</td>
                                            {sortedColumns.map((col) => (
                                                <td
                                                    key={col.key}
                                                    className={`${getCellClass(col)} ${col.isLong ? "relative" : ""}`}
                                                >
                                                    {editing
                                                        ? renderInput(col, (form as any)[col.key], onFormChange)
                                                        : renderDisplay(col, row)}
                                                </td>
                                            ))}
                                            <td className={stickyR}>
                                                {editing ? (
                                                    <ActionButtons onSave={save} onCancel={cancel} />
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => startEdit(row)}
                                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                            title="Editar"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            <span className="hidden md:inline">Editar</span>
                                                        </button>
                                                        <button
                                                            onClick={() => remove(row.id)}
                                                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                                            title="Borrar"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            <span className="hidden md:inline">Borrar</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={Object.keys(columnConfig[category]).length + 2}
                                        className="text-center py-8 text-gray-500"
                                    >
                                        {search ? "No se encontraron resultados" : "No hay registros"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ------------ paginación ------------ */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs md:text-sm">
                        <div className="hidden sm:block text-gray-700">
                            Mostrando <span className="font-medium">{(page - 1) * perPage + 1}</span> a
                            <span className="font-medium"> {Math.min(page * perPage, visibleRows.length)} </span>
                            de <span className="font-medium">{visibleRows.length}</span> resultados
                        </div>
                        <div className="flex space-x-1 md:space-x-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className={`px-2 md:px-3 py-1 rounded-md ${page === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Anterior
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button
                                    key={n}
                                    className={`px-2 md:px-3 py-1 rounded-md ${n === page ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                    onClick={() => setPage(n)}
                                >
                                    {n}
                                </button>
                            ))}
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className={`px-2 md:px-3 py-1 rounded-md ${page === totalPages
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* =============================================================
   🔧  Helpers de render (CON MEJORAS PARA IMÁGENES Y COMENTARIOS)
   ============================================================= */
function renderInput(
    col: ColumnConfig,
    value: any,
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) {
    if (col.key === "imagen") {
        return (
            <input
                name="imagen"
                type="file"
                accept="image/*"
                onChange={onChange}
                className="border rounded px-2 py-1 w-full text-xs"
            />
        );
    }
    if (col.key === "fecha") {
        return (
            <input
                name={col.key}
                type="date"
                value={value || ""}
                onChange={onChange}
                className="border rounded px-2 py-1 w-full text-xs"
            />
        );
    }
    if (col.isEstado) {
        return (
            <select
                name="estado"
                value={value || "Disponible"}
                onChange={onChange}
                className="border rounded px-2 py-1 w-full bg-white text-xs"
            >
                <option>Disponible</option>
                <option>Asignado</option>
                <option>Mantenimiento</option>
                <option>Temporal</option>
                <option>RAEE</option>
            </select>
        );
    }
    if (col.isLong) {
        return (
            <textarea
                name={col.key}
                value={value || ""}
                onChange={onChange}
                className="border rounded px-2 py-1 w-full h-20 text-xs"
                rows={3}
            />
        );
    }
    return (
        <input
            name={col.key}
            value={value || ""}
            onChange={onChange}
            className="border rounded px-2 py-1 w-full text-xs"
        />
    );
}

function renderDisplay(col: ColumnConfig, row: AnyItem) {
    const val = (row as any)[col.key] as string | undefined;
    if (col.isEstado) {
        return (
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(val)}`}>{val}</span>
        );
    }

    // 🖼️ IMAGEN
    if (col.key === "imagen") {
        return val ? (
            <div className="group relative">
                <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline">Ver</span>
                <img
                    src={val}
                    alt="Imagen"
                    className="hidden group-hover:block absolute z-20 top-6 left-0 max-w-xs md:max-w-sm lg:max-w-md h-auto rounded shadow-lg"
                />
            </div>
        ) : (
            "-"
        );
    }

    // 💬 COMENTARIOS
    if (col.key === "comentarios") {
        return val ? (
            <div className="group relative">
                <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline">Comentario</span>
                <div className="hidden group-hover:block absolute z-20 top-6 left-0 bg-white p-2 border rounded shadow-lg max-w-xs md:max-w-sm lg:max-w-md text-xs whitespace-pre-line">
                    {val}
                </div>
            </div>
        ) : (
            "-"
        );
    }

    return val ? <span className="text-gray-900">{val}</span> : <span className="text-gray-400">-</span>;
}

/* mini componente */
const ActionButtons: React.FC<{ onSave: () => void; onCancel: () => void }> = ({ onSave, onCancel }) => (
    <div className="flex gap-2">
        <button onClick={onSave} className="text-green-600 hover:text-green-800 flex items-center gap-1" title="Guardar">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden md:inline">Guardar</span>
        </button>
        <button onClick={onCancel} className="text-gray-600 hover:text-gray-800 flex items-center gap-1" title="Cancelar">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden md:inline">Cancelar</span>
        </button>
    </div>
); 