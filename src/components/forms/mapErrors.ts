export const mapErrors = (err: any): Record<string, string> => {
  const errors = err?.response?.data?.error ?? [err?.response?.data.title ?? err?.response?.data.message];
  const apiErrors = errors ?? [];
  const newErrors: Record<string, string> = {};

  Object.entries(apiErrors).forEach(([key, messages]) => {
    // "Email" -> "email"
    const field = key.charAt(0).toLowerCase() + key.slice(1);
    
    // Tomamos el primer mensaje si es array, sino el valor directo
    newErrors[field] = Array.isArray(messages) ? messages[0] : String(messages);
  });

  return newErrors; 
};
