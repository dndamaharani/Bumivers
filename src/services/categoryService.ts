import { makeRequest } from './api';

export interface Category {
  _id: string;
  name: string;
  icon: string;
  description: string;
  funFact: string;
  tips: string;
  quote: string;
  createdAt: string;
}

class CategoryService {
  async getCategories(): Promise<Category[]> {
    return makeRequest('/categories');
  }

  async getCategory(id: string): Promise<Category> {
    return makeRequest(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();
