// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Address } from "./pages/Address"; 
import { Study } from "./pages/Study"; // 1. Importamos la página de estudios
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { PublicRoute } from "./components/routing/PublicRoute";
import { useAuth } from "./context/auth/useAuth"; // 2. Importamos tu hook de auth para obtener el rol/id

function App() {
  const { user } = useAuth(); // Obtenemos el usuario logueado

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
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Address />} /> 
            
            {/* 3. Añadimos la ruta para estudios pasando las props necesarias */}
            <Route 
              path="studies" 
              element={
                <Study 
                  userId={user?.id ?? null} 
                  isAdmin={user?.roleName === "Admin"} 
                />
              } 
            />
            
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
