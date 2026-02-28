import type { FC, ReactNode } from "react";
import { CloseButton } from "./CloseButton";

interface SidebarWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const SidebarWrapper: FC<SidebarWrapperProps> = ({
  isOpen,
  onClose,
  children,
}) => (
  <>
    {/* overlay */}
    <div
      className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    />

    <aside
        className={` 
            fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5E7EB] flex flex-col transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0 lg:z-0
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
    >
      {/* close button for mobile inside panel */}
      {isOpen && (
        <div className="relative">
          {/* will be positioned absolutely via component itself */}
          <CloseButton onClick={onClose} />
        </div>
      )}
      {children}
    </aside>
  </>
);
