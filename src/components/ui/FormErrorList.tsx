// src/components/ui/FormErrorList.tsx

interface FormErrorListProps {
  errors: Record<string, string>;
}

export const FormErrorList = ({ errors }: FormErrorListProps) => {
  // Si no hay errores con mensaje, no renderizamos nada
  const hasErrors = Object.values(errors).some(msg => !!msg);
  
  if (!hasErrors) return null;

  return (
    <div className="flex flex-col gap-1 p-3 bg-red-50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
      {Object.entries(errors).map(([key, message]) => (
        message && (
          <span key={key} className="text-red-500 text-xs font-medium flex items-center gap-2">
            <span className="h-1 w-1 bg-red-500 rounded-full" /> {/* Un punto más elegante que el carácter • */}
            {message}
          </span>
        )
      ))}
    </div>
  );
};
