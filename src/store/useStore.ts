import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment, SortConfig } from '../types';

interface DashboardState {
  comments: Comment[];
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortConfig: SortConfig;
  setComments: (comments: Comment[]) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchTerm: (term: string) => void;
  setSortConfig: (config: SortConfig) => void;
}

// Create persisted store for dashboard state
export const useStore = create<DashboardState>()(
  persist(
    (set) => ({
      // Initial state
      comments: [],
      currentPage: 1,
      pageSize: 10,
      searchTerm: '',
      sortConfig: { field: null, direction: null },

      // Actions
      setComments: (comments) => set({ comments }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      // Reset to first page when changing page size or search term
      setPageSize: (pageSize) => set({ currentPage: 1, pageSize }),
      setSearchTerm: (searchTerm) => set({ currentPage: 1, searchTerm }),
      setSortConfig: (sortConfig) => set({ sortConfig }),
    }),
    {
      name: 'dashboard-storage', // Local storage key
    }
  )
);