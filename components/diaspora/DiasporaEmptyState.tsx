"use client";

import Link from "next/link";
import { Globe, Search } from "lucide-react";

interface DiasporaEmptyStateProps {
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}

const DiasporaEmptyState = ({
    hasActiveFilters,
    onClearFilters,
}: DiasporaEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-slate-100 rounded-full p-8 mb-6">
                {hasActiveFilters ? (
                    <Search className="w-16 h-16 text-slate-400" />
                ) : (
                    <Globe className="w-16 h-16 text-slate-400" />
                )}
            </div>

            <h3 className="big-text-3 font-bold text-slate-900 mb-3">
                {hasActiveFilters
                    ? "No posts found"
                    : "No diaspora posts yet"}
            </h3>

            <p className="normal-text text-slate-600 text-center max-w-md mb-6">
                {hasActiveFilters
                    ? "Try adjusting your filters to find what you're looking for."
                    : "Check back soon for updates from the Ghana diaspora community."}
            </p>

            <div className="flex gap-4">
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold normal-text transition-all shadow-md hover:shadow-lg"
                    >
                        Clear Filters
                    </button>
                )}

                <Link
                    href="/"
                    className="px-6 py-3 rounded-lg border-2 border-slate-200 hover:border-primary text-slate-700 hover:text-primary font-semibold normal-text transition-all"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default DiasporaEmptyState;