import type { FC } from "react";
import { HamburgerButton } from "./HamburgerButton";
import { SectionList } from "./SectionList";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarWrapper } from "./SidebarWrapper";
import { useSidebar } from "./useSideBar";

export const Sidebar: FC = () => {
  const {
    isOpen,
    open,
    close,
    sections,
    selectedSection,
    handleSelectSection,
    hideSidebar,
  } = useSidebar();

  if (hideSidebar) return null;

  return (
    <>
      <HamburgerButton onClick={open} />
      <SidebarWrapper isOpen={isOpen} onClose={close}>
        <div className="py-6" />
        <SectionList
          sections={sections}
          selectedSection={selectedSection}
          onSelect={handleSelectSection}
        />
        <SidebarFooter />
      </SidebarWrapper>
    </>
  );
};