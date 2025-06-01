import { makeRequest } from './api';

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  totalPoints?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}

export const authService = new AuthService();