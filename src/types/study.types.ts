export interface StudyResponse {
    id: number;
    institution: string;
    degree: string;
    startDate: Date;      
    endDate?: Date;       
    userId: number;
    userName?: string;
}
export interface StudyCreate {
  institution: string;
  degree: string;
  startDate: string; 
  endDate?: string | null;
}

export type StudyUpdate = Partial<StudyCreate>;

