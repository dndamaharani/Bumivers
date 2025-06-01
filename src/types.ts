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

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  totalPoints: number;
  createdAt: string;
}

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

export interface EducationTopic {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

export interface UserAction {
  _id: string;
  user: string;
  label: string;
  points: number;
  category: string;
  createdAt: string;
}

export interface Commitment {
  _id: string;
  label: string;
  points: number;
  createdAt: string;
}