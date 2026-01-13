"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { NewsArticle } from "@/types/news.types";
import {NewsCard, NewsEmptyState} from "@/components";

interface NewsGridProps {
    articles: NewsArticle[];
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    onClearFilters?: () => void;
    hasFilters: boolean;
}

const NewsGrid = ({
    articles,
    isLoading,
    hasMore,
    onLoadMore,
    onClearFilters,
    hasFilters,
}: NewsGridProps) => {
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

    // No articles
    if (!isLoading && articles.length === 0) {
        return <NewsEmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />;
    }

    return (
        <div className="space-y-8">
            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <NewsCard key={article.id} article={article} index={index} />
                ))}
            </div>

            {/* Loading Indicator / Load More Trigger */}
            {hasMore && (
                <div
                    ref={loadMoreRef}
                    className="flex justify-center py-8"
                >
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 text-primary"
                        >
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="normal-text font-semibold">Loading more articles...</span>
                        </motion.div>
                    )}
                </div>
            )}

            {/* End of Results */}
            {!hasMore && articles.length > 0 && (
                <div className="flex justify-center py-8">
                    <p className="normal-text text-slate-500 font-medium">
                        You&apos;ve reached the end of the news feed
                    </p>
                </div>
            )}
        </div>
    );
};

export default NewsGrid;