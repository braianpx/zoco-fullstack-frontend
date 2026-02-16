import { type FC, useState } from "react";
import { Link } from "react-router-dom";

interface UserMenuProps {
  username: string;
  onLogout: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({ username, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100 transition"
      >
        <span className="font-medium text-gray-700">{username}</span>
        <div className="w-6 h-6 bg-indigo-600 rounded-full text-white flex items-center justify-center">
          {username[0]?.toUpperCase()}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden z-20">
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

