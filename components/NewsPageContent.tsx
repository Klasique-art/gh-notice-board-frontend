"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    NewsFilters,
    NewsSortTabs,
    NewsGrid,
    BreakingNewsBar,
} from "@/components";
import { NewsArticle } from "@/types/news.types";
import { useNewsFilters } from "@/hooks/useNewsFilters";

// Items per page for pagination
const ITEMS_PER_PAGE = 12;

interface NewsPageContentProps {
    initialArticles: NewsArticle[];
    availableCategories: { slug: string; name: string; color: string }[];
    availableTags: { slug: string; name: string }[];
}

const NewsPageContent = ({
    initialArticles,
    availableCategories,
    availableTags,
}: NewsPageContentProps) => {
    const {
        filters,
        sort,
        handleFiltersChange,
        handleSortChange,
        clearFilters,
        hasActiveFilters,
    } = useNewsFilters();

    const [displayedArticles, setDisplayedArticles] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Get breaking news
    const breakingNews = useMemo(() => {
        return initialArticles.filter((article) => article.is_breaking).slice(0, 5);
    }, [initialArticles]);

    // Filter and sort articles
    const filteredAndSortedArticles = useMemo(() => {
        let result = [...initialArticles];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (article) =>
                    article.title.toLowerCase().includes(searchLower) ||
                    article.summary.toLowerCase().includes(searchLower) ||
                    article.author.full_name.toLowerCase().includes(searchLower)
            );
        }

        // Apply category filter
        if (filters.category.length > 0) {
            result = result.filter((article) =>
                filters.category.includes(article.category.slug)
            );
        }

        // Apply tag filter
        if (filters.tag.length > 0) {
            result = result.filter((article) =>
                article.tags?.some((tag) => filters.tag.includes(tag.slug))
            );
        }

        // Apply featured filter
        if (filters.is_featured) {
            result = result.filter((article) => article.is_featured);
        }

        // Apply breaking filter
        if (filters.is_breaking) {
            result = result.filter((article) => article.is_breaking);
        }

        // Apply trending filter
        if (filters.is_trending) {
            result = result.filter((article) => article.is_trending);
        }

        // Apply date filters
        if (filters.date_from) {
            const fromDate = new Date(filters.date_from);
            result = result.filter(
                (article) => new Date(article.published_at!) >= fromDate
            );
        }

        if (filters.date_to) {
            const toDate = new Date(filters.date_to);
            toDate.setHours(23, 59, 59, 999); // End of day
            result = result.filter(
                (article) => new Date(article.published_at!) <= toDate
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (sort) {
                case "-published_at":
                    return (
                        new Date(b.published_at!).getTime() -
                        new Date(a.published_at!).getTime()
                    );
                case "-created_at":
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
                case "-views_count":
                    return b.views_count - a.views_count;
                case "-likes_count":
                    return b.likes_count - a.likes_count;
                case "-comments_count":
                    return b.comments_count - a.comments_count;
                case "-shares_count":
                    return b.shares_count - a.shares_count;
                default:
                    return 0;
            }
        });

        return result;
    }, [initialArticles, filters, sort]);

    // Paginated articles
    const paginatedArticles = useMemo(() => {
        return filteredAndSortedArticles.slice(0, currentPage * ITEMS_PER_PAGE);
    }, [filteredAndSortedArticles, currentPage]);

    const hasMore = paginatedArticles.length < filteredAndSortedArticles.length;

    // Update displayed articles when paginated articles change
    useEffect(() => {
        setDisplayedArticles(paginatedArticles);
    }, [paginatedArticles]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sort]);

    // Load more articles (infinite scroll)
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
        <>
            {/* Breaking News Bar */}
            {breakingNews.length > 0 && <BreakingNewsBar articles={breakingNews} />}

            {/* Main Content */}
            <section className="px-2 xs:px-4 py-8 xs:py-10 sm:py-14 md:py-16">
                <div className="inner-wrapper space-y-8">
                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <NewsFilters
                            filters={filters}
                            onFiltersChange={handleFiltersChange}
                            availableCategories={availableCategories}
                            availableTags={availableTags}
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
                                    {filteredAndSortedArticles.length}
                                </span>{" "}
                                {filteredAndSortedArticles.length === 1 ? "article" : "articles"}{" "}
                                found
                            </p>
                        </div>

                        {/* Sort Tabs */}
                        <div className="bg-white rounded-lg border-2 border-slate-200 p-2">
                            <NewsSortTabs activeSort={sort} onSortChange={handleSortChange} />
                        </div>
                    </motion.div>

                    {/* News Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <NewsGrid
                            articles={displayedArticles}
                            isLoading={isLoading}
                            hasMore={hasMore}
                            onLoadMore={handleLoadMore}
                            onClearFilters={clearFilters}
                            hasFilters={hasActiveFilters()}
                        />
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default NewsPageContent;