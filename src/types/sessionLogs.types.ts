export interface SessionLogResponse {
    id: number;
    userId: number;
    userName: string;
    startDate: Date;   
    endDate?: Date;    
}

export interface SessionLogCreate {
    userId: number;
    startDate: Date;
}

export interface SessionLogUpdate {
    endDate: Date;
}
