import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // Nueva propiedad opcional
}

export const Input = ({ label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-neutral-600">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          px-3 py-2.5
          rounded-lg
          border
          bg-white
          text-neutral-900
          text-sm
          outline-none
          transition
          ${error 
            ? "border-red-500 focus:ring-2 focus:ring-red-200" 
            : "border-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"}
        `}
      />

      {/* Si hay error, se muestra justo debajo en rojo */}
      {error && (
        <span className="text-red-500 text-xs font-medium px-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};
