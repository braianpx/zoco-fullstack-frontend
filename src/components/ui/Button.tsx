// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // 1. Agregamos las variantes aquí para que TS las reconozca
  variant?: "primary" | "secondary" | "ghost" | "danger"; 
}

export const Button = ({ children, variant = "primary", className = "", ...props }: Props) => {
  
  const baseStyles = "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5";
  
  // 2. Definimos los estilos para cada una
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100/50 border border-indigo-600",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800",
    danger: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100"
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
