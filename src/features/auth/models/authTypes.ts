export interface FormValues {
  username: string;
  email: string;
  password: string;
}

export interface FieldError {
  name: string;
  errors: string[];
}
