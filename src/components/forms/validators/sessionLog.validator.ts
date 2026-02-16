// src/components/sessionLogs/validators/sessionLog.validator.ts

export const validateSessionLogField = (
  name: string, 
  value: string | Date | null | undefined, 
  startDate?: string | Date
): string => {
  switch (name) {
    case "endDate":
      if (!value) return "La fecha de cierre es obligatoria para actualizar";
      
      if (startDate) {
        const start = new Date(startDate);
        const end = new Date(value);
        if (end < start) {
          return "El cierre no puede ser anterior al inicio";
        }
      }
      return "";
    default:
      return "";
  }
};
