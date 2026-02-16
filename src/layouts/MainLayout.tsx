import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/NavBar";

export const MainLayout: FC = () => {
  return (
    <div className="w-screen h-screen bg-[#F9FAFB] flex flex-col">
      <Navbar />
      <main className="flex-1 p-1">
        <Outlet />
      </main>
    </div>
  );
};
