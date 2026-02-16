import { type FC } from "react";

export const HomeShowcase: FC = () => {
  return (
    <div className="w-full h-full bg-[#EEF2FF] flex items-center justify-center relative overflow-hidden">
      
      {/* Gradient background effect */}
      <div className="absolute w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-md px-12">
        <h2 className="text-4xl font-bold text-[#111827] leading-tight">
          Gestiona usuarios
          <span className="text-[#6366F1]"> con estructura y control</span>
        </h2>

        <p className="mt-6 text-[#6B7280] text-base leading-relaxed">
          Centraliza información académica y direcciones en un solo lugar.
          Visualiza, organiza y administra datos de manera clara y eficiente.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="bg-white px-4 py-4 rounded-xl border border-[#E5E7EB] shadow-sm">
            <p className="text-sm font-medium text-[#111827]">
              Estudios
            </p>
            <p className="text-xs text-[#6B7280]">
              Historial académico estructurado
            </p>
          </div>

          <div className="bg-white px-4 py-4 rounded-xl border border-[#E5E7EB] shadow-sm">
            <p className="text-sm font-medium text-[#111827]">
              Direcciones
            </p>
            <p className="text-xs text-[#6B7280]">
              Gestión organizada por usuario
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white px-4 py-4 rounded-xl border border-[#E5E7EB] shadow-sm">
          <p className="text-sm font-medium text-[#111827]">
            Administración centralizada
          </p>
          <p className="text-xs text-[#6B7280]">
            Control total sobre registros y relaciones
          </p>
        </div>
      </div>
    </div>
  );
};
