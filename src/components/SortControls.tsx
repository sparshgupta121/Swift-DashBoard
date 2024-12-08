import React from 'react';
import { SortConfig } from '../types';

interface SortControlsProps {
  sortConfig: SortConfig;
  onSortChange: (field: string) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({ sortConfig, onSortChange }) => {
  const getSortIndicator = (field: string) => {
    if (sortConfig.field !== field) return '•';
    return sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '•';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      {['postId', 'name', 'email'].map((field) => (
        <button
          key={field}
          onClick={() => onSortChange(field)}
          className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
            sortConfig.field === field
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {field.charAt(0).toUpperCase() + field.slice(1)}
          <span className="ml-1">{getSortIndicator(field)}</span>
        </button>
      ))}
    </div>
  );
};