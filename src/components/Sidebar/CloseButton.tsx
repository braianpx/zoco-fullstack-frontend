import type { FC, MouseEventHandler } from "react";

interface CloseButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="lg:hidden absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
    aria-label="Cerrar menu"
  >
    <svg
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);
