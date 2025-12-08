export interface ValidationErrors {
  [key: string]: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors: ValidationErrors;
}