"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";
import { OpportunityCard, OpportunityEmptyState } from "@/components";

interface OpportunityGridProps {
    opportunities: Opportunity[];
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    onClearFilters?: () => void;
    hasFilters: boolean;
}

const OpportunityGrid = ({
    opportunities,
    isLoading,
    hasMore,
    onLoadMore,
    onClearFilters,
    hasFilters,
}: OpportunityGridProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Infinite scroll observer
    useEffect(() => {
        if (isLoading || !hasMore) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [isLoading, hasMore, onLoadMore]);

    // No opportunities
    if (!isLoading && opportunities.length === 0) {
        return (
            <OpportunityEmptyState
                hasFilters={hasFilters}
                onClearFilters={onClearFilters}
            />
        );
    }

    return (
        <div className="space-y-8">
            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opportunity, index) => (
                    <OpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                        index={index}
                    />
                ))}
            </div>

            {/* Loading Indicator / Load More Trigger */}
            {hasMore && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 text-primary"
                        >
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="normal-text font-semibold">
                                Loading more opportunities...
                            </span>
                        </motion.div>
                    )}
                </div>
            )}

            {/* End of Results */}
            {!hasMore && opportunities.length > 0 && (
                <div className="flex justify-center py-8">
                    <p className="normal-text text-slate-500 font-medium">
                        You&apos;ve reached the end of the opportunities list
                    </p>
                </div>
            )}
        </div>
    );
};

export default OpportunityGrid;