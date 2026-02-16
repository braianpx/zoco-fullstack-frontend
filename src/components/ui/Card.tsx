interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: Props) => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {title && (
        <div className="px-8 pt-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <div className="h-1 w-12 bg-indigo-600 mt-2 rounded-full"></div>
        </div>
      )}
      <div className="p-8">{children}</div>
    </div>
  );
};
