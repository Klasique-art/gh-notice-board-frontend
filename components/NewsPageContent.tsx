"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    NewsFilters,
    NewsSortTabs,
    NewsGrid,
    BreakingNewsBar,
} from "@/components";
import { NewsArticle, NewsCategory, NewsTag, PaginatedNewsResponse } from "@/types/news.types";
import { useNewsFilters } from "@/hooks/useNewsFilters";

interface NewsPageContentProps {
    initialArticles: NewsArticle[];
    availableCategories: NewsCategory[];
    availableTags: NewsTag[];
    totalCount: number;
}

const NewsPageContent = ({
    initialArticles,
    availableCategories,
    availableTags,
    totalCount,
}: NewsPageContentProps) => {
    const {
        filters,
        sort,
        handleFiltersChange,
        handleSortChange,
        clearFilters,
        hasActiveFilters,
    } = useNewsFilters();

    const [displayedArticles, setDisplayedArticles] = useState<NewsArticle[]>(initialArticles);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(totalCount > initialArticles.length);
    const [total, setTotal] = useState(totalCount);

    // Get breaking news from displayed articles
    const breakingNews = useMemo(() => {
        return displayedArticles.filter((article) => article.is_breaking).slice(0, 5);
    }, [displayedArticles]);

    // Fetch articles from API when filters or sort change
    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                // Build query params
                const params = new URLSearchParams();
                
                if (filters.search) params.set('search', filters.search);
                if (filters.category.length > 0) params.set('category_slug', filters.category[0]);
                if (filters.tag.length > 0) params.set('tag', filters.tag[0]);
                if (filters.is_featured) params.set('is_featured', 'true');
                if (filters.is_breaking) params.set('is_breaking', 'true');
                if (filters.is_trending) params.set('is_trending', 'true');
                if (filters.date_from) params.set('date_from', filters.date_from);
                if (filters.date_to) params.set('date_to', filters.date_to);
                params.set('ordering', sort);
                params.set('page', '1');

                const response = await fetch(`/api/news?${params.toString()}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }

                const data: PaginatedNewsResponse = await response.json();

                setDisplayedArticles(data.results);
                setTotal(data.count);
                setHasMore(!!data.next);
                setCurrentPage(1);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [filters, sort]);

    // Load more articles (pagination)
    const handleLoadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const nextPage = currentPage + 1;
            
            // Build query params
            const params = new URLSearchParams();
            
            if (filters.search) params.set('search', filters.search);
            if (filters.category.length > 0) params.set('category_slug', filters.category[0]);
            if (filters.tag.length > 0) params.set('tag', filters.tag[0]);
            if (filters.is_featured) params.set('is_featured', 'true');
            if (filters.is_breaking) params.set('is_breaking', 'true');
            if (filters.is_trending) params.set('is_trending', 'true');
            if (filters.date_from) params.set('date_from', filters.date_from);
            if (filters.date_to) params.set('date_to', filters.date_to);
            params.set('ordering', sort);
            params.set('page', nextPage.toString());

            const response = await fetch(`/api/news?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error('Failed to load more news');
            }

            const data: PaginatedNewsResponse = await response.json();

            setDisplayedArticles(prev => [...prev, ...data.results]);
            setHasMore(!!data.next);
            setCurrentPage(nextPage);
        } catch (error) {
            console.error('Error loading more news:', error);
        } finally {
            setIsLoading(false);
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
                                    {total}
                                </span>{" "}
                                {total === 1 ? "article" : "articles"} found
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