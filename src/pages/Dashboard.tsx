// src/pages/Dashboard.tsx
import { type FC } from "react";
import { Outlet } from "react-router-dom";

export const Dashboard: FC = () => {
  // Dashboard is now just a routing placeholder. Sidebar moved to MainLayout.
  return <Outlet />;
};
