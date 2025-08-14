import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/loginForm';
import AdminPage from './page/adminPage';
import UserPage from './page/usePage';
import NotificacionesPage from './page/notificaciones';
import UnauthorizedPage from '../src/page/unauthorizedPage';
import ProtectedRoute from '../src/components/protecdRote';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/notificaciones" element={<NotificacionesPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Ruta protegida solo para admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida solo para user */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
