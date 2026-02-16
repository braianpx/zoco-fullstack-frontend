import { type FC } from "react";
import { AuthPanel } from "../components/AuthPanel";
import { HomeShowcase } from "../components/HomeShowcase";

export const Home: FC = () => {
  return (
    <div className="h-full w-full bg-[#F9FAFB] flex">
      
      {/* Left UX / Branding */}
      <div className="hidden lg:flex w-1/2 h-full relative overflow-hidden">
        <HomeShowcase />
      </div>

      {/* Right Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <AuthPanel />
      </div>
    </div>
  );
};
