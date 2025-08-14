import FormSolicitud from "../components/formSolicitud" // Ajusta ruta según tu proyecto
import { Header } from "../components/hooks/heder-solic" // Ajusta ruta según tu proyecto

export default function Solicitudes() {
    return (
        <div className="p-4">
            <Header />
            <FormSolicitud />
        </div>
    )
}
