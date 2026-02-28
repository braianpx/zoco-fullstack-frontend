import type { ReactNode } from "react";

interface HeaderSectionProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  badge?: React.ReactElement;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const HeaderSection = ({
  title,
  subtitle,
  actions,
  badge,
  className = "",
  contentClassName = "",
  titleClassName = "",
  subtitleClassName = "",
}: HeaderSectionProps) => (
  <header
    className={`flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-6 ${className}`.trim()}
  >
    <div className={contentClassName}>
      {badge && badge}
      <h1 className={`text-4xl font-black text-slate-900 tracking-tight ${titleClassName}`.trim()}>
        {title}
      </h1>
      <p className={`text-slate-500 mt-1 ${subtitleClassName}`.trim()}>{subtitle}</p>
    </div>
    {actions && actions}
  </header>
);
