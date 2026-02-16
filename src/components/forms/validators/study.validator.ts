export interface StudyFormType {
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string | null;
}

// Reemplazamos 'any' por tipos específicos
export const validateStudyField = (
  name: string, 
  value: string | null | undefined, 
  formData?: StudyFormType
): string => {
  switch (name) {
    case "institution":
      if (!value) return "La institución es obligatoria";
      if (value.length < 3) return "Mínimo 3 caracteres";
      if (value.length > 100) return "Máximo 100 caracteres";
      return "";
    case "degree":
      if (!value) return "El título o grado es obligatorio";
      if (value.length < 3) return "Mínimo 3 caracteres";
      if (value.length > 100) return "Máximo 100 caracteres";
      return "";
    case "startDate":
      if (!value) return "La fecha de inicio es obligatoria";
      if (new Date(value) > new Date()) return "La fecha no puede ser futura";
      return "";
    case "endDate":
      if (!value) return "";
      if (formData?.startDate) {
        const start = new Date(formData.startDate);
        const end = new Date(value);
        if (end < start) return "Debe ser posterior al inicio";
      }
      return "";
    default:
      return "";
  }
};
