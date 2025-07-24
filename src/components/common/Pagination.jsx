import React, { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [hoveredPage, setHoveredPage] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to update windowWidth on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPageNumbers = () => {
    let maxPagesToShow;

    // Adjust maxPagesToShow based on screen width
    if (windowWidth < 640) {
      // Tailwind's 'sm' breakpoint is 640px
      maxPagesToShow = 3; // On small screens, show fewer pages (e.g., current + 1 on each side)
    } else if (windowWidth < 768) {
      // Tailwind's 'md' breakpoint is 768px
      maxPagesToShow = 5; // On medium screens, show a few more
    } else {
      maxPagesToShow = 7; // On large screens, show more pages
    }

    const pages = [];
    const ellipsis = "...";

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const boundaryPages = 1; // Always show first/last page
      const innerPages = maxPagesToShow - 2 * boundaryPages; // Pages around current, excluding first/last

      // Calculate start and end for inner pages
      let startInner = Math.max(
        boundaryPages + 1,
        currentPage - Math.floor(innerPages / 2)
      );
      let endInner = Math.min(
        totalPages - boundaryPages,
        startInner + innerPages - 1
      );

      // Adjust if it goes too far left/right
      if (endInner - startInner + 1 < innerPages) {
        if (startInner <= boundaryPages + 1) {
          // Clamped left
          endInner = boundaryPages + innerPages;
        } else if (endInner >= totalPages - boundaryPages) {
          // Clamped right
          startInner = totalPages - boundaryPages - innerPages + 1;
        }
      }

      // Add first page
      pages.push(1);

      // Add ellipsis if needed after first page
      if (startInner > boundaryPages + 1) {
        pages.push(ellipsis);
      }

      // Add inner pages
      for (let i = startInner; i <= endInner; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed before last page
      if (endInner < totalPages - boundaryPages) {
        pages.push(ellipsis);
      }

      // Add last page
      if (totalPages > 1) {
        // Only add if more than 1 page overall
        pages.push(totalPages);
      }
    }
    return pages.filter((value, index, self) =>
      typeof value === "number" ? self.indexOf(value) === index : true
    ); // Remove duplicate numbers if any
  };

  return (
    <div
      className="flex flex-wrap items-center space-x-1 sm:space-x-2"
      aria-label="Pagination"
    >
      {/* active tab */}

      <button className="flex items-center px-2 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium border border-[#DCDEDF]">
        {currentPage}
      </button>

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center px-2 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium border border-[#DCDEDF]
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-gray-700 bg-white hover:bg-gray-50"
          }
          focus:outline-none focus:ring-2 focus:ring-[#222425] focus:border-transparent
          whitespace-nowrap // Prevent "Previous" from wrapping
        `}
      >
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>{" "}
        {/* Shorter text for small screens */}
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`
                px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium 
                ${
                  currentPage === page
                    ? "bg-[#F2F2F3]" // Active page styling
                    : "text-gray-700" // Inactive page styling
                }
                focus:outline-none focus:ring-2 focus:ring-[#F2F2F3] duration-150 ease-in-out
              `}
              onMouseEnter={() => setHoveredPage(page)}
              onMouseLeave={() => setHoveredPage(null)}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700"
            >
              {page}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center px-2 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium border border-[#DCDEDF]
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-gray-700 bg-white hover:bg-gray-50"
          }
          focus:outline-none focus:ring-2 focus:ring-[#222425] focus:border-transparent
          whitespace-nowrap // Prevent "Next" from wrapping
        `}
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Nxt</span>{" "}
        {/* Shorter text for small screens */}
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
