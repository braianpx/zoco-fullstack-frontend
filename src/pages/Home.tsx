import { type FC } from "react";
import { AuthPanel } from "../components/AuthPanel";
import { HomeShowcase } from "../components/HomeShowcase";

export const Home: FC = () => {
  return (
    // flex-1 hace que ocupe todo el espacio bajo la navbar
    <div className="w-full h-full flex flex-col lg:flex-row">
      
      {/* Lado Izquierdo - Branding */}
      <div className="hidden h-[98vh] lg:flex lg:w-1/2 bg-[#EEF2FF] relative overflow-hidden">
        <HomeShowcase />
      </div>

      {/* Lado Derecho - Formulario */}
      <div className="w-full h-max-full lg:w-1/2 flex items-center justify-center p-6 mt-12 md:pt-12 lg:pt-8">
        <AuthPanel />
      </div>
    </div>
  );
};