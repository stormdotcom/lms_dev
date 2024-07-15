import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const CustomPagination = ({ pagination, onPageChange }) => {
    const { pageNo: currentPage, totalPages, hasNextPage } = pagination;
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (currentPage > 1) {
            pageNumbers.push(
                <button
                    disabled={hasNextPage}
                    key={currentPage - 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-4 py-2 border rounded bg-white text-secondary"
                >
                    {currentPage - 1}
                </button>
            );
        }

        pageNumbers.push(
            <button

                key={currentPage}
                className="px-4 py-2 border rounded font-bold bg-white text-secondary"
            >
                {currentPage}
            </button>
        );

        if (currentPage < totalPages) {
            pageNumbers.push(
                <button
                    key={currentPage + 1}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-4 py-2 border rounded  bg-white text-secondary"
                >
                    {currentPage + 1}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={handlePrevious}
                className="flex items-center justify-center w-10 h-10 rounded-full border  bg-white text-secondary"
                disabled={currentPage === 1}
            >
                <HiOutlineChevronLeft />
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                className="flex items-center justify-center w-10 h-10 rounded-full border  bg-white text-secondary"
                disabled={currentPage === totalPages}
            >
                <HiOutlineChevronRight />
            </button>
        </div>
    );
};

export default CustomPagination;
