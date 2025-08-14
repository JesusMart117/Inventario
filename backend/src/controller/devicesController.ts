import { Request, Response } from 'express';
import prisma from '../services/prisma';

// Obtener todos los activos (elementos)
export const getActivos = async (req: Request, res: Response) => {
    try {
        const elementos = await prisma.elemento.findMany({
            include: {
                categoria: true,
                estado: true
            }
        });
        res.json(elementos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener activos' });
    }
};

// Crear un nuevo activo
export const createActivo = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, categoriaId, estadoId, cantidad } = req.body;

        const nuevoElemento = await prisma.elemento.create({
            data: {
                nombre,
                descripcion,
                categoriaId: Number(categoriaId),
                estadoId: Number(estadoId),
                cantidad: Number(cantidad),
            },
        });

        res.status(201).json(nuevoElemento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el activo' });
    }
};
