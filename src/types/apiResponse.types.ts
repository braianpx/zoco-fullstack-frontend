export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  title: string;
  errors: Record<string, string[]>; 
}