import { makeRequest } from './api';

export interface EducationTopic {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

class EducationService {
  async getEducationTopics(): Promise<EducationTopic[]> {
    return makeRequest('/education');
  }

  async getEducationTopic(id: string): Promise<EducationTopic> {
    return makeRequest(`/education/${id}`);
  }

  async createEducationTopic(topic: Omit<EducationTopic, '_id' | 'createdAt'>): Promise<EducationTopic> {
    return makeRequest('/education', {
      method: 'POST',
      body: JSON.stringify(topic),
    });
  }
}

export const educationService = new EducationService();
