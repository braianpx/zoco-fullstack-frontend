import type { FC, MouseEventHandler } from "react";
import type { DashboardSection } from "../../utils/routes";

interface SectionItemProps {
  section: DashboardSection;
  selected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SectionItem: FC<SectionItemProps> = ({
  section,
  selected,
  onClick,
}) => {
  return (
    <li>
      <button
        className={`w-full text-left px-5 py-3 rounded-xl transition-all duration-200
          ${
            selected
              ? "bg-[#6366F1] text-white font-semibold shadow-md shadow-indigo-100"
              : "text-[#111827] hover:bg-[#EEF2FF] hover:text-[#6366F1]"
          }`}
        onClick={onClick}
        aria-current={selected ? "page" : undefined}
      >
        {section}
      </button>
    </li>
  );
};
