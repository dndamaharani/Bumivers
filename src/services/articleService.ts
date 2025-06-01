import { makeRequest } from './api';

export interface Article {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  author: {
    _id: string;
    username: string;
  };
  content: string;
  createdAt: string;
}

class ArticleService {
  async getArticles(params?: { category?: string; limit?: number }): Promise<Article[]> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const queryString = searchParams.toString();
    return makeRequest(`/articles${queryString ? '?' + queryString : ''}`);
  }

  async getArticle(id: string): Promise<Article> {
    return makeRequest(`/articles/${id}`);
  }

  async likeArticle(id: string): Promise<Article> {
    return makeRequest(`/articles/${id}/like`, {
      method: 'PUT',
    });
  }

  async dislikeArticle(id: string): Promise<Article> {
    return makeRequest(`/articles/${id}/dislike`, {
      method: 'PUT',
    });
  }

  async addComment(id: string, content: string): Promise<Article> {
    return makeRequest(`/articles/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async createArticle(article: Omit<Article, '_id' | 'likes' | 'dislikes' | 'comments' | 'createdAt' | 'updatedAt'>): Promise<Article> {
    return makeRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  }
}

export const articleService = new ArticleService();