import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/NavBar";

export const MainLayout: FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 p-1">
        <Outlet />
      </main>
    </div>
  );
};
