interface DataEmptyProps {
  message: string;
} 

export const DataEmpty = ({message}: DataEmptyProps) => {
  return (
        <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50">
          <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">{message}</p>
        </div>
  );
};
