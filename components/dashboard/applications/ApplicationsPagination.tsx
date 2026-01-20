"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApplicationsPaginationProps {
    currentPage: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

const ApplicationsPagination = ({
    currentPage,
    totalCount,
    hasNext,
    hasPrevious,
}: ApplicationsPaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const updatePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/dashboard/applications?${params.toString()}`);
    };

    const handlePrevious = () => {
        if (hasPrevious) {
            updatePage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNext) {
            updatePage(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Results Info */}
            <p className="normal-text-2 text-slate-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{" "}
                applications
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                    className={`p-2 rounded-lg border-2 transition-colors ${hasPrevious
                            ? "border-slate-200 hover:border-primary hover:bg-slate-50 text-slate-700"
                            : "border-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => updatePage(page)}
                            className={`w-10 h-10 rounded-lg font-medium normal-text-2 transition-all ${page === currentPage
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-white border-2 border-slate-200 text-slate-700 hover:border-primary hover:bg-slate-50"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={!hasNext}
                    className={`p-2 rounded-lg border-2 transition-colors ${hasNext
                            ? "border-slate-200 hover:border-primary hover:bg-slate-50 text-slate-700"
                            : "border-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                    aria-label="Next page"
                >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default ApplicationsPagination;