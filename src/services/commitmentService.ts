import { makeRequest } from './api';

export interface Commitment {
  _id: string;
  label: string;
  points: number;
  createdAt: string;
}

class CommitmentService {
  async getCommitments(): Promise<Commitment[]> {
    return makeRequest('/commitments');
  }

  async createCommitment(commitment: Omit<Commitment, '_id' | 'createdAt'>): Promise<Commitment> {
    return makeRequest('/commitments', {
      method: 'POST',
      body: JSON.stringify(commitment),
    });
  }
}

export const commitmentService = new CommitmentService();
