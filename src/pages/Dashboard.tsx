import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { fetchComments } from "../services/api";
import { TableControls } from "../components/TableControls";
import { Pagination } from "../components/Pagination";
import { filterComments } from "../utils/filtering";
import { sortComments } from "../utils/sorting";

export const Dashboard = () => {
  const {
    comments,
    currentPage,
    pageSize,
    searchTerm,
    sortConfig,
    setComments,
    setCurrentPage,
    setPageSize,
    setSearchTerm,
    setSortConfig,
  } = useStore();

  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});

  // Load comments on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const commentsData = await fetchComments();
        setComments(commentsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  // Scroll to top whenever the page number changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredComments = filterComments(comments, searchTerm);
  const sortedComments = sortComments(filteredComments, sortConfig);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedComments = sortedComments.slice(startIndex, startIndex + pageSize);

  const toggleComment = (id: number) => {
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!comments.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading comments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="ml-4">
            <h1 className="text-2xl font-semibold text-gray-900">Comments Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Manage and view all comments in one place</p>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <TableControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortConfig={sortConfig}
        onSortChange={(field) =>
          setSortConfig({
            field,
            direction:
              sortConfig.field === field
                ? sortConfig.direction === "asc"
                  ? "desc"
                  : sortConfig.direction === "desc"
                  ? null
                  : "asc"
                : "asc",
          })
        }
      />

      {/* Table for larger screens */}
      <div className="hidden lg:block relative overflow-hidden rounded-lg shadow-md border border-gray-200">
        <table className="w-full table-fixed divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-24 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Post ID</th>
              <th className="w-1/3 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="w-64 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Comment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedComments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{comment.postId}</td>
                <td className="px-3 py-4 text-sm font-medium text-gray-900">{comment.name}</td>
                <td className="px-3 py-4 text-sm">
                  <a href={`mailto:${comment.email}`} className="text-indigo-600 hover:text-indigo-900 hover:underline">
                    {comment.email}
                  </a>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  <div
                    onClick={() => toggleComment(comment.id)}
                    className={`cursor-pointer ${
                      expandedComments[comment.id]
                        ? "text-justify"
                        : "overflow-hidden text-ellipsis whitespace-nowrap"
                    } transition-all duration-300 ease-in-out`}
                  >
                    {comment.body}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for smaller screens */}
      <div className="lg:hidden space-y-4">
        {paginatedComments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <div className="text-sm text-gray-500">Post ID: {comment.postId}</div>
            <div className="text-sm font-medium text-gray-900">{comment.name}</div>
            <a
              href={`mailto:${comment.email}`}
              className="text-sm text-indigo-600 hover:text-indigo-900 hover:underline mb-2 block"
            >
              {comment.email}
            </a>
            <div
              onClick={() => toggleComment(comment.id)}
              className={`cursor-pointer ${
                expandedComments[comment.id]
                  ? "text-justify"
                  : "overflow-hidden text-ellipsis whitespace-nowrap"
              } text-sm text-gray-500 transition-all duration-300 ease-in-out`}
            >
              {comment.body}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalItems={sortedComments.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default Dashboard;
