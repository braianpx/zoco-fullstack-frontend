export interface StudyResponse {
    id: number;
    institution: string;
    degree: string;
    startDate: Date;      
    endDate?: Date;       
    userId: number;
    userName?: string;
}