// src/utils/errorMapper.ts

export const mapErrors = (err: unknown): Record<string, string> => {
  // 1. Casteamos de forma segura para acceder a las propiedades de Axios
  const axiosError = err as { 
    response?: { 
      data?: { 
        error?: Record<string, string[] | string>;
        title?: string;
        message?: string;
      } 
    } 
  };

  const data = axiosError?.response?.data;
  const apiErrors = data?.error ?? {}; 
  const newErrors: Record<string, string> = {};

  // Si no hay un objeto de errores detallado pero hay un título/mensaje general
  if (Object.keys(apiErrors).length === 0 && (data?.title || data?.message)) {
    return { general: data.title ?? data.message ?? "Error desconocido" };
  }

  Object.entries(apiErrors).forEach(([key, messages]) => {
    // "Email" -> "email"
    const field = key.charAt(0).toLowerCase() + key.slice(1);
    
    // Tomamos el primer mensaje si es array, sino el valor directo
    newErrors[field] = Array.isArray(messages) ? messages[0] : String(messages);
  });

  return newErrors; 
};
