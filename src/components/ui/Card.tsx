interface Props {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: Props) => {
  return (
    <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-semibold text-neutral-900 text-center">
        {title}
      </h1>

      <div className="mt-6">{children}</div>
    </div>
  );
};
