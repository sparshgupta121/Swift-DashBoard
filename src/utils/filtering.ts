import { Comment } from '../types';

// Filter comments based on search term
export const filterComments = (comments: Comment[], searchTerm: string): Comment[] => {
  if (!searchTerm) return comments;

  const searchLower = searchTerm.toLowerCase();
  return comments.filter((comment) => {
    return (
      comment.name.toLowerCase().includes(searchLower) ||
      comment.email.toLowerCase().includes(searchLower) ||
      comment.body.toLowerCase().includes(searchLower)
    );
  });
};