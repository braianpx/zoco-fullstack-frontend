export interface SessionLogResponse {
    id: number;
    userId: number;
    userName: string;
    startDate: Date;   
    endDate?: Date;    
}