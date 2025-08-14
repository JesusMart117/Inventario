import express from 'express';
import cors from 'cors';
import devicesRoutes from './routes/devicesRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formularios

// Rutas
app.use('/api/activos', devicesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
