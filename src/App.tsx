// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
// Dashboard component is no longer used; sidebar moved into layout
import { Profile } from "./pages/Profile";
import { Address } from "./pages/Address";
import { Study } from "./pages/Study";
import { SessionLog } from "./pages/SessionLog";
import { User } from "./pages/User";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { PublicRoute } from "./components/routing/PublicRoute";
import { ProtectedRouteAdmin } from "./components/routing/ProtectedRouteAdmin";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* LAYOUT PRINCIPAL */}
        <Route element={<MainLayout />}>
          
          {/* 1. RUTAS PÚBLICAS (Solo accesibles sin login) */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

          {/* 2. RUTAS PROTEGIDAS (Cualquier usuario logueado) */}
          {/* protegemos todo el árbol de rutas de dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            {/* redirección inicial al perfil */}
            <Route index element={<Navigate to="profile" replace />} />

            {/* Sub-rutas de Dashboard */}
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Address />} />
            <Route path="studies" element={<Study />} />

            {/* 3. RUTAS DE ADMINISTRADOR */}
            <Route
              path="users"
              element={<ProtectedRouteAdmin> <User /> </ProtectedRouteAdmin>}
            />
            <Route
              path="logs"
              element={<ProtectedRouteAdmin> <SessionLog /> </ProtectedRouteAdmin>}
            />
          </Route>
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
