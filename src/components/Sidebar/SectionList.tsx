import type { FC } from "react";
import type { DashboardSection } from "../../utils/routes";
import { SectionItem } from "./SectionItem";

interface SectionListProps {
  sections: Partial<DashboardSection>[];
  selectedSection?: DashboardSection;
  onSelect: (section: DashboardSection) => void;
}

export const SectionList: FC<SectionListProps> = ({
  sections,
  selectedSection,
  onSelect,
}) => (
  <nav className="flex-1 px-4 pt-12 space-y-1">
    <ul role="menu" className="space-y-2">
      {sections.map((section) => (
        <SectionItem
          key={section}
          section={section}
          selected={selectedSection === section}
          onClick={() => onSelect(section)}
        />
      ))}
    </ul>
  </nav>
);
