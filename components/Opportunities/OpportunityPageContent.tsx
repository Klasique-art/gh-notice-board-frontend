"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
    OpportunityFilters,
    OpportunitySortTabs,
    OpportunityGrid,
} from "@/components";
import { Opportunity } from "@/types/opportunities.types";
import { useOpportunityFilters } from "@/hooks/useOpportunityFilters";
import { getOpportunities } from "@/app/lib/opportunities";

interface OpportunityPageContentProps {
    initialOpportunities: Opportunity[];
    availableCategories: { slug: string; name: string; color: string }[];
    initialNext: string | null;
    initialCount: number;
}

const OpportunityPageContent = ({
    initialOpportunities,
    availableCategories,
    initialNext,
    initialCount,
}: OpportunityPageContentProps) => {
    const {
        filters,
        sort,
        handleFiltersChange,
        handleSortChange,
        clearFilters,
        hasActiveFilters,
    } = useOpportunityFilters();

    const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(!!initialNext);
    const [totalCount, setTotalCount] = useState(initialCount);
    const [currentPage, setCurrentPage] = useState(1);

    // Track if this is the initial render to avoid double fetching
    const isInitialRender = useRef(true);

    // Fetch opportunities from API
    const fetchOpportunities = useCallback(async (isLoadMore: boolean = false) => {
        setIsLoading(true);
        try {
            const pageToFetch = isLoadMore ? currentPage + 1 : 1;

            const response = await getOpportunities({
                ...filters,
                opportunity_type: filters.opportunity_type as any,
                category: filters.category as string[],
                ordering: sort,
                page: pageToFetch,
            });

            if (isLoadMore) {
                setOpportunities((prev) => [...prev, ...response.results]);
                setCurrentPage((prev) => prev + 1);
            } else {
                setOpportunities(response.results);
                setCurrentPage(1);
            }

            setHasMore(!!response.next);
            setTotalCount(response.count);
        } catch (error) {
            console.error("Failed to fetch opportunities:", error);
            // Handle error (could show toast)
        } finally {
            setIsLoading(false);
        }
    }, [filters, sort, currentPage]);

    // Refetch when filters or sort change
    useEffect(() => {
        // Skip first render as we have initial data (only if filters are default?)
        // Actually, if filters change from default, we must fetch.
        // But initial render has default filters and initial data.
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        fetchOpportunities(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, sort]);

    // Load more opportunities
    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchOpportunities(true);
        }
    };

    return (
        <section className="px-2 xs:px-4 py-8 xs:py-10 sm:py-14 md:py-16">
            <div className="inner-wrapper space-y-8">
                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <OpportunityFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        availableCategories={availableCategories}
                    />
                </motion.div>

                {/* Sort Tabs & Results Count */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    {/* Results Count */}
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <p className="normal-text text-slate-600">
                            <span className="font-bold text-slate-900">
                                {totalCount}
                            </span>{" "}
                            {totalCount === 1
                                ? "opportunity"
                                : "opportunities"}{" "}
                            found
                        </p>
                    </div>

                    {/* Sort Tabs */}
                    <div className="bg-white rounded-lg border-2 border-slate-200 p-2">
                        <OpportunitySortTabs
                            activeSort={sort}
                            onSortChange={handleSortChange}
                        />
                    </div>
                </motion.div>

                {/* Opportunities Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <OpportunityGrid
                        opportunities={opportunities}
                        isLoading={isLoading}
                        hasMore={hasMore}
                        onLoadMore={handleLoadMore}
                        onClearFilters={clearFilters}
                        hasFilters={hasActiveFilters()}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default OpportunityPageContent;