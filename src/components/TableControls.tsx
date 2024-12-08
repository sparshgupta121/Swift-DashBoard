import React from 'react';
import { SearchBar } from './SearchBar';
import { SortControls } from './SortControls';
import { SortConfig } from '../types';

interface TableControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortConfig: SortConfig;
  onSortChange: (field: string) => void;
}

export const TableControls: React.FC<TableControlsProps> = ({
  searchTerm,
  onSearchChange,
  sortConfig,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
      <SortControls sortConfig={sortConfig} onSortChange={onSortChange} />
      <div className="w-full sm:w-64">
        <SearchBar value={searchTerm} onChange={onSearchChange} />
      </div>
    </div>
  );
};