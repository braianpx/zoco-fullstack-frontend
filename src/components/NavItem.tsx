import { NavLink } from "react-router-dom";
import { type FC, type ReactNode } from "react";

interface NavItemProps {
  to: string;
  children: ReactNode;
}

export const NavItem: FC<NavItemProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive
            ? "text-[#6366F1]"
            : "text-[#6B7280] hover:text-[#111827]"
        }`
      }
    >
      {children}
    </NavLink>
  );
};
