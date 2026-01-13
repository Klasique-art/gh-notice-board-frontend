"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    OpportunityFilters,
    OpportunitySortTabs,
    OpportunityGrid,
} from "@/components";
import { Opportunity } from "@/types/opportunities.types";
import { useOpportunityFilters } from "@/hooks/useOpportunityFilters";

// Items per page for pagination
const ITEMS_PER_PAGE = 12;

interface OpportunityPageContentProps {
    initialOpportunities: Opportunity[];
    availableCategories: { slug: string; name: string; color: string }[];
}

const OpportunityPageContent = ({
    initialOpportunities,
    availableCategories,
}: OpportunityPageContentProps) => {
    const {
        filters,
        sort,
        handleFiltersChange,
        handleSortChange,
        clearFilters,
        hasActiveFilters,
    } = useOpportunityFilters();

    const [displayedOpportunities, setDisplayedOpportunities] = useState<
        Opportunity[]
    >([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Filter and sort opportunities
    const filteredAndSortedOpportunities = useMemo(() => {
        let result = [...initialOpportunities];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (opp) =>
                    opp.title.toLowerCase().includes(searchLower) ||
                    opp.summary.toLowerCase().includes(searchLower) ||
                    opp.organization_name.toLowerCase().includes(searchLower) ||
                    opp.location.toLowerCase().includes(searchLower)
            );
        }

        // Apply opportunity type filter
        if (filters.opportunity_type.length > 0) {
            result = result.filter((opp) =>
                filters.opportunity_type.includes(opp.opportunity_type)
            );
        }

        // Apply category filter
        if (filters.category.length > 0) {
            result = result.filter((opp) =>
                filters.category.some((catSlug) =>
                    opp.category ? opp.category.slug === catSlug : false
                )
            );
        }

        // Apply remote filter
        if (filters.is_remote) {
            result = result.filter((opp) => opp.is_remote);
        }

        // Apply diaspora filter
        if (filters.is_diaspora) {
            result = result.filter((opp) => opp.is_diaspora);
        }

        // Apply featured filter
        if (filters.is_featured) {
            result = result.filter((opp) => opp.is_featured);
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (sort) {
                case "-published_at":
                    return (
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );
                case "deadline":
                    if (!a.deadline) return 1;
                    if (!b.deadline) return -1;
                    return (
                        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                    );
                case "-deadline":
                    if (!a.deadline) return 1;
                    if (!b.deadline) return -1;
                    return (
                        new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
                    );
                case "-views_count":
                    return b.views_count - a.views_count;
                case "-created_at":
                    return (
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );
                default:
                    return 0;
            }
        });

        return result;
    }, [initialOpportunities, filters, sort]);

    // Paginated opportunities
    const paginatedOpportunities = useMemo(() => {
        return filteredAndSortedOpportunities.slice(
            0,
            currentPage * ITEMS_PER_PAGE
        );
    }, [filteredAndSortedOpportunities, currentPage]);

    const hasMore =
        paginatedOpportunities.length < filteredAndSortedOpportunities.length;

    // Update displayed opportunities when paginated opportunities change
    useEffect(() => {
        setDisplayedOpportunities(paginatedOpportunities);
    }, [paginatedOpportunities]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sort]);

    // Load more opportunities (infinite scroll)
    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            setIsLoading(true);
            // Simulate loading delay
            setTimeout(() => {
                setCurrentPage((prev) => prev + 1);
                setIsLoading(false);
            }, 500);
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
                                {filteredAndSortedOpportunities.length}
                            </span>{" "}
                            {filteredAndSortedOpportunities.length === 1
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
                        opportunities={displayedOpportunities}
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