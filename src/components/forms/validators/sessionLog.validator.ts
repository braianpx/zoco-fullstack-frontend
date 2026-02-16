export const validateSessionLogField = (name: string, value: any, startDate?: any): string => {
  switch (name) {
    case "endDate":
      if (!value) return "La fecha de cierre es obligatoria para actualizar";
      if (startDate && new Date(value) < new Date(startDate)) {
        return "El cierre no puede ser anterior al inicio";
      }
      return "";
    default:
      return "";
  }
};
