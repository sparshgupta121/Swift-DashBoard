// Utility functions for pagination calculations and logic
export const calculatePagination = (currentPage: number, totalItems: number, pageSize: number) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = ((currentPage - 1) * pageSize) + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return {
    totalPages,
    startItem,
    endItem,
  };
};

// Generate array of page numbers with ellipsis for pagination display
export const generatePageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Always show first page
  pages.push(1);

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  // Adjust range for edge cases
  if (currentPage <= 3) {
    end = Math.min(totalPages - 1, maxVisiblePages - 1);
  }
  if (currentPage >= totalPages - 2) {
    start = Math.max(2, totalPages - 3);
  }

  // Add ellipsis and range numbers
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < totalPages - 1) pages.push('...');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
};