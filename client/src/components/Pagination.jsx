/* eslint-disable react/prop-types */
import React from "react";

function Pagination({ currentPage, onPageChange, totalPages }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  const maxPageRange = 3;

  // Calculate the range of page numbers to display
  let start = Math.max(1, currentPage - Math.floor(maxPageRange / 2));
  let end = start + maxPageRange - 1;

  if (end > totalPages) {
    end = totalPages;
    start = end - maxPageRange + 1;
  }

  if (start < 1) {
    start = 1;
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex gap-2 place-content-center">
      <button
        className="px-4 py-2 text-sm text-black bg-[#f0f0f0] rounded"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 text-sm rounded ${currentPage === page ? 'bg-[#624DE3] text-white' : 'text-black bg-[#f0f0f0]'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-4 py-2 text-sm text-black bg-[#f0f0f0] rounded"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default React.memo(Pagination);