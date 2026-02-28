import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string;
  children: ReactNode;
}

export const ModalLayout = ({
  isOpen,
  onClose,
  maxWidth = "max-w-2xl",
  children,
}: ModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-full z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />

      {/* Container */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-4xl shadow-2xl z-50 overflow-hidden animate-in zoom-in-95 duration-300`}
      >
        <div className="sm:p-12 p-4 overflow-y-auto max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full transition-colors hover:bg-red-100 text-slate-300 hover:text-red-500"
            >
            <X size={25} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};