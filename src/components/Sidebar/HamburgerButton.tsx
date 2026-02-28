import type { FC, MouseEventHandler } from "react";

interface HamburgerButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const HamburgerButton: FC<HamburgerButtonProps> = ({ onClick }) => (
  <button
    className="lg:hidden fixed bottom-6 left-6 z-40 p-4 bg-[#6366F1] text-white rounded-full shadow-xl"
    onClick={onClick}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>
);
