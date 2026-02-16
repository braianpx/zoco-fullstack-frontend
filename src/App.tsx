// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Address } from "./pages/Address"; // 1. Importamos la nueva página
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { PublicRoute } from "./components/routing/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Rutas Públicas */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

          {/* Ruta Dashboard Protegida (Actúa como Layout) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* 2. Añadimos la ruta hija para direcciones */}
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Address />} /> 
            {/* <Route path="users" element={<Users />} /> */}
          </Route>
        </Route>

        {/* Redirección por defecto si la ruta no existe */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
