"use client";

import React, { useState } from "react";
import { Button } from "./Ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./Ui/card";
import { Input } from "./Ui/input";
import { Label } from "./Ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./Ui/select";
import { Textarea } from "./Ui/textarea";
import { Save, X } from "lucide-react";

/* --------------------------------------------------
 * Tipos y catálogos
 * --------------------------------------------------*/

type Category = "Dispositivos" | "Accesorios" | "Consumibles" | "Componentes";

interface FormData {
    categoria: Category;
    nombreColaborador: string;
    dispositivo: string;
    accesorio: string;
    consumible: string;
    componente: string;
    numeroSerie: string;
    modelo: string;
    ip: string;
    nipLaptop: string;
    imagen: File | null;
    comentarios: string;
    estado: string;
    ubicacion: string;
}

const categorias: Category[] = [
    "Dispositivos",
    "Accesorios",
    "Consumibles",
    "Componentes",
];

const dispositivosOptions = [
    "CPU",
    "Laptops",
    "Tabletas",
    "Monitores",
    "Impresoras",
    "Televisiones",
    "Teléfonos IP",
    "Proyectores",
    "Bocinas y/o equipos de sonido (bafles, subwoofer, etc.)",
    "Servidores",
    "Antenas wifi y/o access point",
    "Switches (superior a 8 puertos)",
    "Conmutadores",
    "Drones",
    "Cámaras fotográficas",
    "Cámaras de video",
    "Cámaras CCTV",
    "DVR o NVR",
    "Cámaras de videoconferencia",
    "Micrófonos",
    "Consolas de audio",
    "Celulares",
    "Unidades de respaldo",
    "Escáner",
    "Unidades de almacenamiento (NAS)",
    "Consolas de video juegos",
];

const accesoriosOptions = [
    "Mouses",
    "Teclados",
    "Bocinas para PC y Bluetooth",
    "Micrófonos para PC",
    "Apuntadores",
    "Cámaras web",
    "Lectores de código de barra",
    "Teléfonos convencionales",
    "Herramientas y/o equipo para mantenimiento",
    "Extensiones de corriente",
    "Multicontactos",
    "Audífonos",
    "Memorias extraíbles",
    "Etiquetadora",
    "Switches (≤ 8 puertos)",
];

const consumiblesOptions = [
    "Aire comprimido",
    "Tintas",
    "Tóneres",
    "Cartuchos",
    "Cintas DYMO",
    "Cintas canela / de marcaje",
    "RJ45",
    "RJ11",
    "Baterías (AA, AAA, 9 V)",
    "Cables de red",
    "Bobinas de cable",
    "Jacks",
    "Placas para registro",
    "Coples",
    "Limpiadores (pantalla, alcohol isopropílico, etc.)",
    "Pasta (soldar / térmica)",
    "Cables de video",
    "Cables de corriente",
    "Cables de sonido",
];

const componentesOptions = [
    "Memorias RAM",
    "Discos duros (SSD / HDD)",
    "Tarjetas de video",
    "Tarjetas de sonido",
    "Tarjetas de red",
    "Convertidores HDMI ↔ VGA",
    "Lectores de CD externos",
    "Fuentes de poder",
    "Dock USB / estaciones",
    "Cargadores de laptop",
    "HUB / replicadores",
    "Adaptadores mini / NB",
    "No‑break / UPS",
    "Adaptadores de disco",
    "Procesadores",
    "Tarjetas madre",
    "Gabinetes",
];

const estadoOptions = [
    "Disponible",
    "Asignado",
    "Mantenimiento",
    "RAEE",
    "Temporal",
];

/* --------------------------------------------------
 * Configuración dinámica por categoría
 * --------------------------------------------------*/

const categoryConfig = {
    Dispositivos: {
        itemKey: "dispositivo" as const,
        options: dispositivosOptions,
        show: {
            nombreColaborador: true,
            ubicacion: true,
            modelo: true,
            numeroSerie: true,
            ip: true,
            nip: true,
        },
    },
    Accesorios: {
        itemKey: "accesorio" as const,
        options: accesoriosOptions,
        show: {
            nombreColaborador: false,
            ubicacion: false,
            modelo: true,
            numeroSerie: true,
            ip: false,
            nip: false,
        },
    },
    Consumibles: {
        itemKey: "consumible" as const,
        options: consumiblesOptions,
        show: {
            nombreColaborador: false,
            ubicacion: false,
            modelo: true,
            numeroSerie: false,
            ip: false,
            nip: false,
        },
    },
    Componentes: {
        itemKey: "componente" as const,
        options: componentesOptions,
        show: {
            nombreColaborador: false,
            ubicacion: false,
            modelo: false,
            numeroSerie: true,
            ip: false,
            nip: false,
        },
    },
} satisfies Record<Category, any>;

/* --------------------------------------------------
 * Componente principal
 * --------------------------------------------------*/

export default function FormIngresos() {
    const [formData, setFormData] = useState<FormData>({
        categoria: "Dispositivos",
        nombreColaborador: "",
        dispositivo: "",
        accesorio: "",
        consumible: "",
        componente: "",
        numeroSerie: "",
        modelo: "",
        ip: "",
        nipLaptop: "",
        imagen: null,
        comentarios: "",
        estado: "Disponible",
        ubicacion: "",
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    /* ---------- helpers ---------- */
    const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        handleChange("imagen", file);
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        handleChange("imagen", null);
        setImagePreview(null);
    };

    /* ---------- envío ---------- */
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cfg = categoryConfig[formData.categoria];
        const selected = (formData as any)[cfg.itemKey] as string;
        if (!selected) {
            alert(`Seleccione un ${cfg.itemKey}.`);
            return;
        }

        setSaving(true);

        try {
            type Cat = "Dispositivos" | "Consumibles" | "Componentes" | "Accesorios";
            const STORAGE_KEY = "inventario‑por‑categoria";
            let data: Record<Cat, any[]> = {
                Dispositivos: [],
                Consumibles: [],
                Componentes: [],
                Accesorios: [],
            };
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) data = JSON.parse(raw);
            } catch { }

            const hoy = new Date().toISOString().slice(0, 10);
            const common = {
                id: Date.now(),
                estado: formData.estado,
                fecha: hoy,
                comentarios: formData.comentarios,
                imagen: formData.imagen ? formData.imagen.name : "",
            };

            switch (formData.categoria) {
                case "Dispositivos":
                    data.Dispositivos.push({
                        ...common,
                        dispositivo: formData.dispositivo,
                        modelo: formData.modelo,
                        numeroSerie: formData.numeroSerie,
                        ubicacion: formData.ubicacion || "Sin asignar",
                        responsable: formData.nombreColaborador,
                        ip: formData.ip,
                    });
                    break;
                case "Accesorios":
                    data.Accesorios.push({
                        ...common,
                        accesorio: formData.accesorio,
                        modelo: formData.modelo,
                        numeroSerie: formData.numeroSerie,
                    });
                    break;
                case "Consumibles":
                    data.Consumibles.push({
                        ...common,
                        consumible: formData.consumible,
                        modelo: formData.modelo,
                    });
                    break;
                case "Componentes":
                    data.Componentes.push({
                        ...common,
                        componente: formData.componente,
                        numeroSerie: formData.numeroSerie,
                    });
                    break;
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            alert("Registro guardado ✅");
            /* reset simple */
            setFormData((f) => ({
                ...f, ...{
                    dispositivo: "",
                    accesorio: "",
                    consumible: "",
                    componente: "",
                    numeroSerie: "",
                    modelo: "",
                    ip: "",
                    nipLaptop: "",
                    imagen: null,
                    comentarios: "",
                    ubicacion: "",
                }
            }));
            setImagePreview(null);
        } catch (err) {
            console.error(err);
            alert("Error al guardar");
        } finally {
            setSaving(false);
        }
    };

    /* ---------- render condicional ---------- */
    const cfg = categoryConfig[formData.categoria];
    const { show, itemKey, options } = cfg;
    const nipNeeded = ["laptops", "celulares", "tabletas", "cpu"].includes(
        formData.dispositivo.toLowerCase()
    );

    return (
        <div className="px-4 py-6">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Registro de {formData.categoria}</CardTitle>
                    <CardDescription>Complete los campos requeridos.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* ---------- selección de categoría ---------- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Categoría *</Label>
                                <Select
                                    value={formData.categoria}
                                    onValueChange={(v) => handleChange("categoria", v as Category)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione…" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-gray-300 shadow-md">
                                        {categorias.map((c) => (
                                            <SelectItem
                                                key={c}
                                                value={c}
                                                className="bg-white text-black hover:bg-gray-100 cursor-pointer"
                                            >
                                                {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>

                            {/* estado presente en todas las categorías */}
                            <div>
                                <Label>Estado *</Label>
                                <Select
                                    value={formData.estado}
                                    onValueChange={(v) => handleChange("estado", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione estado" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-gray-300 shadow-md">
                                        {estadoOptions.map((e) => (
                                            <SelectItem
                                                key={e}
                                                value={e}
                                                className="bg-white text-black hover:bg-gray-100 cursor-pointer"
                                            >
                                                {e}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>
                        </div>

                        {/* ---------- campos dinámicos ---------- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {show.nombreColaborador && (
                                <div>
                                    <Label>Nombre del colaborador *</Label>
                                    <Input
                                        value={formData.nombreColaborador}
                                        onChange={(e) => handleChange("nombreColaborador", e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            {/* selector principal (dispositivo / accesorio / etc.) */}
                            <div>
                                <Label>{itemKey.charAt(0).toUpperCase() + itemKey.slice(1)} *</Label>
                                <Select
                                    value={formData[itemKey as keyof FormData] as string}
                                    onValueChange={(v) => handleChange(itemKey as keyof FormData, v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Seleccione ${itemKey}`} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-gray-300 shadow-md">
                                        {options.map((op) => (
                                            <SelectItem
                                                key={op}
                                                value={op}
                                                className="bg-white text-black hover:bg-gray-100 cursor-pointer"
                                            >
                                                {op}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </div>

                            {show.ubicacion && (
                                <div>
                                    <Label>Ubicación / Área</Label>
                                    <Input
                                        value={formData.ubicacion}
                                        onChange={(e) => handleChange("ubicacion", e.target.value)}
                                    />
                                </div>
                            )}

                            {show.modelo && (
                                <div>
                                    <Label>Modelo</Label>
                                    <Input
                                        value={formData.modelo}
                                        onChange={(e) => handleChange("modelo", e.target.value)}
                                    />
                                </div>
                            )}

                            {show.numeroSerie && (
                                <div>
                                    <Label>Número de serie</Label>
                                    <Input
                                        value={formData.numeroSerie}
                                        onChange={(e) => handleChange("numeroSerie", e.target.value)}
                                    />
                                </div>
                            )}

                            {show.ip && (
                                <div>
                                    <Label>IP</Label>
                                    <Input
                                        value={formData.ip}
                                        onChange={(e) => handleChange("ip", e.target.value)}
                                    />
                                </div>
                            )}

                            {show.nip && nipNeeded && (
                                <div>
                                    <Label>NIP *</Label>
                                    <Input
                                        type="password"
                                        value={formData.nipLaptop}
                                        onChange={(e) => handleChange("nipLaptop", e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        {/* ---------- imagen ---------- */}
                        <div className="space-y-2">
                            <Label>Imagen (opcional)</Label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onImage}
                                className="cursor-pointer px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-100"
                            />
                            {imagePreview && (
                                <div className="flex items-center gap-4 mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="preview"
                                        className="w-32 h-32 object-cover border rounded"
                                    />
                                    <Button type="button" variant="destructive" onClick={removeImage}>
                                        <X />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* ---------- comentarios ---------- */}
                        <div>
                            <Label>Comentarios</Label>
                            <Textarea
                                value={formData.comentarios}
                                onChange={(e) => handleChange("comentarios", e.target.value)}
                            />
                        </div>

                        {/* ---------- submit ---------- */}
                        <div className="pt-4">
                            <Button type="submit" disabled={saving}>
                                <Save className="mr-2" /> {saving ? "Guardando…" : "Guardar"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
