// src/utils/auth.ts - Debug Version
import { authService, type User } from '../services/authService';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
}

export const getAuthState = (): AuthState => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();
  const isAdmin = authService.isAdmin();

  return {
    isAuthenticated,
    user,
    isAdmin
  };
};

export const login = async (email: string, password: string) => {
  try {
    console.log("🔍 Starting login process...");
    const response = await authService.login({ email, password });
    
    console.log("🔍 Auth service response:", response);
    console.log("🔍 Response type:", typeof response);
    console.log("🔍 Response keys:", Object.keys(response || {}));
    
    // The authService.login already stores token and user
    // So we just need to return success
    return { 
      success: true, 
      data: response  // This contains { token, user }
    };
    
  } catch (error) {
    console.log("🔍 Login error caught:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Login failed' 
    };
  }
};

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await authService.register({ username, email, password });
    return { success: true, data: response };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Registration failed' 
    };
  }
};

export const logout = () => {
  authService.logout();
  // Redirect to login page
  window.location.href = '/login';
};

// Check if user has permission
export const hasPermission = (requiredRole: 'user' | 'admin' = 'user'): boolean => {
  const { user, isAuthenticated } = getAuthState();
  
  if (!isAuthenticated || !user) return false;
  
  if (requiredRole === 'admin') {
    return user.role === 'admin';
  }
  
  return true; // All authenticated users have 'user' permission
};

// Auth hook for React components
export const useAuth = () => {
  const authState = getAuthState();
  
  return {
    ...authState,
    login,
    register,
    logout,
    hasPermission
  };
};