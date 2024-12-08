import { User, Comment } from '../types';


const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/1`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch(`${BASE_URL}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return await response.json();

  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};