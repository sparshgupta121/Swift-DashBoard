import { Comment, SortConfig } from '../types';

// Sort comments based on field and direction
export const sortComments = (comments: Comment[], sortConfig: SortConfig): Comment[] => {
  if (!sortConfig.field || !sortConfig.direction) return comments;

  return [...comments].sort((a, b) => {
    let compareA: string | number;
    let compareB: string | number;

    switch (sortConfig.field) {
      case 'postId':
        compareA = a.postId;
        compareB = b.postId;
        break;
      case 'name':
        compareA = a.name;
        compareB = b.name;
        break;
      case 'email':
        compareA = a.email;
        compareB = b.email;
        break;
      default:
        return 0;
    }

    const comparison = sortConfig.direction === 'asc' ? 1 : -1;
    return compareA > compareB ? comparison : -comparison;
  });
};

// Get next sort direction based on current state
export const getNextSortDirection = (
  currentField: string,
  sortConfig: SortConfig
): 'asc' | 'desc' | null => {
  if (currentField !== sortConfig.field) return 'asc';
  if (sortConfig.direction === 'asc') return 'desc';
  if (sortConfig.direction === 'desc') return null;
  return 'asc';
};