import { type FC } from "react";

export const Brand: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
        UG
      </div>
      <span className="text-[#111827] font-semibold text-lg">
        UserGest
      </span>
    </div>
  );
};
