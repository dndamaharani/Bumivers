const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const makeRequest = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  
  // Fix: Create headers object properly for TypeScript
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add existing headers from options
  if (options.headers) {
    const existingHeaders = options.headers as Record<string, string>;
    Object.assign(headers, existingHeaders);
  }

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

export { makeRequest, API_BASE_URL };