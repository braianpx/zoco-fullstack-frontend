import { type FC, useState, useEffect } from "react";

interface UserMenuProps {
  username: string;
  role: string; // <-- Nuevo prop para el rol
  onLogout: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({ username, role, onLogout }) => {
  const [open, setOpen] = useState(false);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative">
      {/* Botón Principal */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-1 md:pl-4 md:pr-1 md:py-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all border border-transparent hover:border-gray-200 shadow-sm md:shadow-none"
      >
        {/* Info de usuario: Se oculta en móviles muy pequeños */}
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="font-semibold text-gray-800 text-sm">{username}</span>
          <span className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold">
            {role}
          </span>
        </div>
        
        {/* Avatar Circular */}
        <div className="w-9 h-9 md:w-8 md:h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white">
          {username[0]?.toUpperCase()}
        </div>
      </button>

      {/* Overlay invisible para cerrar al tocar fuera */}
      {open && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100">
          
          {/* Header del Menu (Visible en Mobile cuando el Navbar lo oculta) */}
          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
            <p className="text-[10px] text-indigo-600 uppercase tracking-widest font-black mb-0.5">
              {role}
            </p>
            <p className="text-sm font-bold text-gray-900 truncate">
              {username}
            </p>
          </div>
          
          <div className="p-1.5">
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
            >
              <div className="p-1.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                <svg xmlns="http://www.w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
