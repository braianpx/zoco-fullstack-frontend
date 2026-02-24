// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Address } from "./pages/Address";
import { Study } from "./pages/Study";
import { SessionLog } from "./pages/SessionLog";
import { User } from "./pages/User";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { PublicRoute } from "./components/routing/PublicRoute";
import { useAuth } from "./context/auth/useAuth";

function App() {
  const { user } = useAuth();
  const isAdmin = user?.roleName === "Admin";

  return (
    <BrowserRouter>
      <Routes>
        {/* LAYOUT PRINCIPAL */}
        <Route element={<MainLayout />}>
          
          {/* 1. RUTAS PÚBLICAS (Solo accesibles sin login) */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

          {/* 2. RUTAS PROTEGIDAS (Cualquier usuario logueado) */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            
            {/* Sub-rutas de Dashboard */}
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Address />} />
            <Route 
              path="studies" 
              element={<Study userId={user?.id ?? null} isAdmin={isAdmin} />} 
            />

            {/* 3. RUTAS DE ADMINISTRADOR (Protección extra por Rol) */}
            {isAdmin && (
              <>
                <Route path="users" element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                  } />
                <Route path="logs" element={ 
                  <ProtectedRoute>
                    <SessionLog />
                  </ProtectedRoute>
                    } />
                </>
            )} 
          </Route>
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
