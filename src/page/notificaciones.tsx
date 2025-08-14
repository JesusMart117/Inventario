"use client";

import { Header } from "../components/hooks/heder";
import NotificationsTable from "../components/notifications"; // Asegúrate de que este sea el archivo correcto

export default function NotificacionesPage() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col flex-1">
                <Header />
                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Notificaciones</h1>
                    <NotificationsTable />
                </main>
            </div>
        </div>
    );
}
