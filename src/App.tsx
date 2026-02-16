// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
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
            <Route path="profile" element={<Profile />} />
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