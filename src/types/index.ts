export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  valid: boolean;
  message?: string;
}

export interface TestConnectionResponse {
  success: boolean;
  connected: boolean;
  message: string;
}
