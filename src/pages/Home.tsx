import { type FC } from "react";
import { AuthPanel } from "../components/AuthPanel";
import { HomeShowcase } from "../components/HomeShowcase";

export const Home: FC = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      
      {/* Lado Izquierdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#EEF2FF] relative overflow-hidden">
        <HomeShowcase />
      </div>

      {/* Lado Derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 overflow-y-auto">
        <AuthPanel />
      </div>
    </div>
  );
};