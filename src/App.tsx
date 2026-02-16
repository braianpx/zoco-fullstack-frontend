import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { PublicRoute } from "./components/routing/PublicRoute";
import { Dashboard } from "./pages/Dashboard";
// import { Users } from "./pages/Users";
// import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
