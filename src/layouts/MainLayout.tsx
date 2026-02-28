import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/NavBar";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const MainLayout: FC = () => {

  return (
    <div className="w-full h-screen bg-[#F9FAFB] flex flex-col overflow-x-hidden">
      <Navbar />

      <div className="flex-1 flex w-full overflow-hidden bg-[#F9FAFB] relative h-[calc(100vh-80px)]">
        <Sidebar />
        <main className="flex-1 h-full bg-white lg:shadow-inner lg:rounded-tl-[2.5rem] overflow-y-auto scroll-smooth py-4 md:mt-12 mt-9  ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
