// src/services/api.ts
const API_URL = "http://localhost:3000/api"; // Cambia al URL real de tu backend

export const createActivo = async (data: FormData) => {
    const response = await fetch(`${API_URL}/activos`, {
        method: 'POST',
        body: data, // Enviar como FormData (incluye imagen)
    });

    if (!response.ok) throw new Error('Error creando el activo');
    return await response.json();
};
