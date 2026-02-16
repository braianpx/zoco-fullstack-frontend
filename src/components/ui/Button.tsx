import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="
        w-full
        py-2.5
        rounded-lg
        bg-indigo-600
        text-white
        text-sm font-medium
        transition
        hover:bg-indigo-700
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
};
