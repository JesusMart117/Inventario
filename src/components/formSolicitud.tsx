"use client"

import type React from "react"
import { useState } from "react"
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from "./Ui"
import { Save } from "lucide-react"

interface SolicitudData {
    fecha: string
    area: string
    correo: string
    colaborador: string
    dispositivo: string
    accesorio: string
    consumible: string
    componente: string
    justificacion: string
}

const dispositivosOptions = [
    "Ninguno",
    "CPU", "Laptops", "Tabletas", "Monitores", "Impresoras", "Televisiones", "Teléfonos IP",
    "Proyectores", "Bocinas y/o equipos de sonido (bafles, subwoofer, etc.)", "Servidores",
    "Antenas wifi y/o access point", "Switches (superior a 8 puertos)", "Conmutadores", "Drones",
    "Cámaras fotográficas", "Cámaras de video", "Cámaras CCTV", "DVR o NVR", "Cámaras de videoconferencia",
    "Micrófonos", "Consolas de audio", "Celulares", "Unidades de respaldo", "Escáner",
    "Unidades de almacenamiento (NAS)", "Consolas de video juegos", "Celulares"
]

const accesoriosOptions = [
    "Ninguno",
    "Mouses", "Teclados", "Bocinas para pc y bluetooth", "Micrófonos para pc", "Apuntadores",
    "Cámaras web", "Lectores de código de barra", "Teléfonos convencionales",
    "Herramientas y/o equipo para mantenimiento ",
    "Extensiones de corriente", "Multicontactos", "Audífonos",
    "Memorias extraíbles ", "Etiquetadora", "Switches"
]

const consumiblesOptions = [
    "Ninguno",
    "Aire comprimido", "Tintas", "Tóneres", "Cartuchos", "Cintas DYMO",
    "Cintas canela, gris, de marcaje etc.", "RJ45   ", "RJ11", "Baterías (AA, AAA, 9v)", "Cables de red",
    "Bobina de cables (red, video, etc.)", "Jacks", "Placas para registro", "Coples",
    "Limpiadores (pantalla, espuma, toallas, alcohol isopropílico, etc.)", "Pasta (para soldar, para calor)",
    "Cables de video", "Cables de corriente", "Cables de sonido"
]

const componentesOptions = [
    "Ninguno",
    "Memorias RAM", "Discos duros (SSD, HDD)", "Tarjetas de Video", "Tarjetas de Sonido",
    "Tarjetas de Red", "Convertidores de HDMI a VGA", "Lectores de CD Externos", "Fuentes de Poder",
    "Estaciones de conexión de USB", "Cargadores para laptop", "HUB", "Adaptadores MINI",
    "No break", "Adaptadores para disco duro", "Procesadores", "Tarjetas madre (para ensamblar equipos)", "Gabinetes"
]
// Opciones (sin cambios)
///const dispositivosOptions = [/*...*/]
//const accesoriosOptions = [/*...*/]
//const consumiblesOptions = [/*...*/]
//const componentesOptions = [/*...*/]
const areasOptions = ["Sistemas", "Marketing", "Finanzas", "Recursos Humanos", "Operaciones"]

export default function FormSolicitud() {
    const [formData, setFormData] = useState<SolicitudData>({
        fecha: new Date().toISOString().substring(0, 10),
        area: "",
        correo: "",
        colaborador: "",
        dispositivo: "Ninguno",
        accesorio: "Ninguno",
        consumible: "Ninguno",
        componente: "Ninguno",
        justificacion: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (field: keyof SolicitudData, value: string) =>
        setFormData(prev => ({ ...prev, [field]: value }))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const nuevaSolicitud = {
                id: Date.now().toString(),
                ...formData,
            }

            const solicitudes = JSON.parse(localStorage.getItem("solicitudes") || "[]")
            solicitudes.push(nuevaSolicitud)
            localStorage.setItem("solicitudes", JSON.stringify(solicitudes))

            alert("Solicitud enviada correctamente")
            setFormData({
                fecha: new Date().toISOString().substring(0, 10),
                area: "",
                correo: "",
                colaborador: "",
                dispositivo: "Ninguno",
                accesorio: "Ninguno",
                consumible: "Ninguno",
                componente: "Ninguno",
                justificacion: "",
            })
        } catch (err) {
            console.error(err)
            alert("Hubo un error al guardar la solicitud")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">Solicitud de Recursos</CardTitle>
                        <CardDescription className="text-center">
                            Complete el formulario para solicitar dispositivos, componentes o consumibles
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Datos generales */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="fecha">Fecha *</Label>
                                    <Input
                                        id="fecha"
                                        type="date"
                                        value={formData.fecha}
                                        onChange={e => handleChange("fecha", e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="area">Área *</Label>
                                    <Select
                                        value={formData.area}
                                        onValueChange={v => handleChange("area", v)}
                                        required
                                    >
                                        <SelectTrigger className="w-full" />
                                        <SelectValue placeholder="Seleccione un área" />
                                        <SelectContent>
                                            {areasOptions.map(opt => (
                                                <SelectItem key={opt} value={opt}>
                                                    {opt}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="colaborador">Colaborador *</Label>
                                    <Input
                                        id="colaborador"
                                        placeholder="Ej. Juan Pérez"
                                        value={formData.colaborador}
                                        onChange={e => handleChange("colaborador", e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="correo">Correo empresarial *</Label>
                                    <Input
                                        id="correo"
                                        type="email"
                                        placeholder="nombre@empresa.com"
                                        value={formData.correo}
                                        onChange={e => handleChange("correo", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Recursos solicitados */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Dispositivo", key: "dispositivo", options: dispositivosOptions },
                                    { label: "Accesorio", key: "accesorio", options: accesoriosOptions },
                                    { label: "Consumible", key: "consumible", options: consumiblesOptions },
                                    { label: "Componente", key: "componente", options: componentesOptions },
                                ].map(({ label, key, options }) => (
                                    <div key={key}>
                                        <Label>{label}</Label>
                                        <Select
                                            value={(formData as any)[key]}
                                            onValueChange={(v) => handleChange(key as keyof SolicitudData, v)}
                                        >
                                            <SelectTrigger className="w-full" />
                                            <SelectValue placeholder="Ninguno" />
                                            <SelectContent>
                                                {options.map((opt: string) => (
                                                    <SelectItem key={opt} value={opt}>
                                                        {opt}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                            </div>

                            {/* Justificación */}
                            <div>
                                <Label>Justificación de la solicitud *</Label>
                                <Textarea
                                    value={formData.justificacion}
                                    onChange={e => handleChange("justificacion", e.target.value)}
                                    required
                                    rows={4}
                                />
                            </div>

                            {/* Botón enviar */}
                            <div className="text-right">
                                <Button type="submit" disabled={isSubmitting} className="inline-flex items-center">
                                    <Save className="mr-2" />
                                    {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
