import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ingresos from './page/Ingresos.tsx';
import Inventario from './page/inventario.tsx'; // 
import Solicitudes from './page/solicitudes.tsx'; // importar la página de Solicitudes
import LoginForm from './components/loginForm.tsx';
import Graficas from './page/graficas.tsx';
import NotificacionesPage from './page/notificaciones.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/notificaciones" element={<NotificacionesPage />} />

          <Route path="/ingresos" element={<Ingresos />} />
          <Route path="/inventario" element={<Inventario />} /> {/* 👈 agregar la nueva ruta */}
          <Route path='/solicitudes' element={<Solicitudes />} />
          <Route path='/graficas' element={<Graficas />} />

        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element with id 'root' not found");
}
