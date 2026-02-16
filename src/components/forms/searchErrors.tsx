import type { UseMutationResult } from "@tanstack/react-query";

export const searchErrors = (
  errors: Record<string, string>, 
  submitErrors: Record<string, string>,
  // Usamos "any" en los genéricos para que acepte cualquier respuesta/payload
  registerMutation: UseMutationResult<any, any, any, any>
): boolean => {
  // 1. Unimos ambos objetos
  const allErrors = { ...errors, ...submitErrors };

  // 2. Verificamos si hay algún mensaje con contenido
  const hasMessages = Object.values(allErrors).some(
    (msg) => typeof msg === "string" && msg.trim().length > 0
  );

  // 3. registerMutation.isPending es la propiedad correcta para el estado de carga
  return registerMutation.isPending || hasMessages;
};
