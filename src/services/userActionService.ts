import { makeRequest } from './api';

export interface UserAction {
  _id: string;
  user: string;
  label: string;
  points: number;
  category: string;
  createdAt: string;
}

export interface LeaderboardUser {
  _id: string;
  username: string;
  totalPoints: number;
}

class UserActionService {
  async getUserActions(): Promise<UserAction[]> {
    return makeRequest('/user-actions');
  }

  async addUserAction(action: Omit<UserAction, '_id' | 'user' | 'createdAt'>): Promise<UserAction> {
    return makeRequest('/user-actions', {
      method: 'POST',
      body: JSON.stringify(action),
    });
  }

  async getLeaderboard(): Promise<LeaderboardUser[]> {
    return makeRequest('/user-actions/leaderboard');
  }
}

export const userActionService = new UserActionService();