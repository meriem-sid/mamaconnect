"use client";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: PaginationProps) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-700">{start}</span> to{" "}
        <span className="font-semibold text-gray-700">{end}</span> of{" "}
        <span className="font-semibold text-gray-700">{totalItems}</span> results
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-[#F46A6A]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <IoChevronBack size={16} />
        </button>
        {getPageNumbers().map((page, idx) =>
          typeof page === "string" ? (
            <span key={`dots-${idx}`} className="px-2 text-gray-400">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 ${
                page === currentPage
                  ? "bg-[#F46A6A] text-white shadow-sm"
                  : "text-gray-600 hover:bg-[#F46A6A]/10 hover:text-[#F46A6A]"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-[#F46A6A]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <IoChevronForward size={16} />
        </button>
      </div>
    </div>
  );
}
