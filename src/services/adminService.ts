import { makeRequest } from './api';

export interface AdminStats {
  statistics: {
    users: number;
    articles: number;
    educationTopics: number;
    userActions: number;
    totalPoints: number;
  };
  recentUsers: any[];
  recentActions: any[];
}

class AdminService {
  async getDashboard(): Promise<AdminStats> {
    return makeRequest('/admin/dashboard');
  }

  async getUsers(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const queryString = searchParams.toString();
    return makeRequest(`/admin/users${queryString ? '?' + queryString : ''}`);
  }

  async updateUserRole(userId: string, role: string) {
    return makeRequest(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(userId: string) {
    return makeRequest(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getAnalytics() {
    return makeRequest('/admin/analytics');
  }
}

export const adminService = new AdminService();