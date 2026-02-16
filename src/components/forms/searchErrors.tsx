import type { UseMutationResult } from "@tanstack/react-query";

export const searchErrors = <TData, TError, TVariables, TContext>(
  errors: Record<string, string>, 
  // Usamos genéricos propios de la función para reemplazar los 'any'
  registerMutation: UseMutationResult<TData, TError, TVariables, TContext>
): boolean => {
  // 1. Unimos ambos objetos
  const allErrors = { ...errors };

  // 2. Verificamos si hay algún mensaje con contenido
  const hasMessages = Object.values(allErrors).some(
    (msg) => typeof msg === "string" && msg.trim().length > 0
  );

  // 3. Verificamos el estado de la mutación y los errores locales
  return registerMutation.isPending || hasMessages;
};
