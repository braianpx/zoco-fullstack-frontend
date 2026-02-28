import { DataEmpty } from "./DataEmpy";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { SectionError } from "./SectionError";

type AsyncBoundaryProps<T> = {
  isLoading?: boolean;
  isError?: boolean;
  data?: T | null;
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  children?: React.ReactNode;
};

const isEmptyData = <T,>(data?: T | null): boolean => {
  if (Array.isArray(data)) return data.length === 0;
  return !data;
};

export function AsyncBoundary<T>({
  isLoading,
  isError,
  data,
  loadingMessage = "Cargando...",
  errorMessage = "Ocurrió un error.",
  emptyMessage = "No hay datos disponibles.",
  children,
}: AsyncBoundaryProps<T>) {

  if (isLoading) {
    return <LoadingSkeleton messageLoading={loadingMessage} />;
  }

  if (isError) {
    return <SectionError message={errorMessage} />;
  }

  if (data && isEmptyData?.(data)) {
    return <DataEmpty message={emptyMessage} />;
  }
  return <>{children}</>;
}
