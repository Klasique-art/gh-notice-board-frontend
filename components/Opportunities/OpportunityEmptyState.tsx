"use client";

import { motion } from "framer-motion";
import { Briefcase, X } from "lucide-react";
import Link from "next/link";

interface OpportunityEmptyStateProps {
    hasFilters: boolean;
    onClearFilters?: () => void;
}

const OpportunityEmptyState = ({
    hasFilters,
    onClearFilters,
}: OpportunityEmptyStateProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4"
        >
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6">
                <Briefcase className="w-16 h-16 text-primary" />
            </div>

            <h3 className="big-text-2 font-bold text-slate-900 mb-2 text-center">
                {hasFilters ? "No opportunities found" : "No opportunities yet"}
            </h3>

            <p className="normal-text text-slate-600 text-center max-w-md mb-6">
                {hasFilters
                    ? "Try adjusting your filters to discover jobs, scholarships, grants, and more opportunities."
                    : "Check back soon for exciting opportunities in Ghana and the diaspora."}
            </p>

            {hasFilters && onClearFilters ? (
                <button
                    onClick={onClearFilters}
                    className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold normal-text transition-colors flex items-center gap-2 shadow-lg"
                >
                    <X className="w-5 h-5" />
                    Clear All Filters
                </button>
            ) : (
                <Link
                    href="/"
                    className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold normal-text transition-colors shadow-lg"
                >
                    Back to Home
                </Link>
            )}
        </motion.div>
    );
};

export default OpportunityEmptyState;