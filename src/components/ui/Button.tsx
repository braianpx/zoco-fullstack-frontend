// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Añadimos variantes
}

export const Button = ({ children, variant = "primary", className = "", ...props }: Props) => {
  
  // Estilos base compartidos
  const baseStyles = "w-full py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  // Estilos específicos por variante
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-100",
    secondary: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
