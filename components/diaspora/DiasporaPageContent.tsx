"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { DiasporaPost, DiasporaContentType } from "@/types/diaspora.types";
import { Section } from "@/components";
import DiasporaFilters from "./DiasporaFilters";
import DiasporaSortTabs from "./DiasporaSortTabs";
import DiasporaGrid from "./DiasporaGrid";
import DiasporaEmptyState from "./DiasporaEmptyState";
import { useDiasporaFilters } from "@/hooks/useDiasporaFilters";
import { getDiasporaPosts } from "@/app/lib/diaspora";

interface DiasporaPageContentProps {
    initialPosts: DiasporaPost[];
    initialNext: string | null;
    initialCount: number;
}

const DiasporaPageContent = ({
    initialPosts,
    initialNext,
    initialCount
}: DiasporaPageContentProps) => {
    const {
        search,
        setSearch,
        contentTypes,
        setContentTypes,
        region,
        setRegion,
        isFeatured,
        setIsFeatured,
        isUrgent,
        setIsUrgent,
        sortBy,
        setSortBy,
        clearFilters,
        hasActiveFilters,
    } = useDiasporaFilters();

    const [posts, setPosts] = useState<DiasporaPost[]>(initialPosts);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(!!initialNext);
    const [totalCount, setTotalCount] = useState(initialCount);
    const [currentPage, setCurrentPage] = useState(1);

    // Track if this is the initial render to avoid double fetching
    const isInitialRender = useRef(true);

    // Fetch posts from API
    const fetchPosts = useCallback(async (isLoadMore: boolean = false) => {
        setIsLoading(true);
        try {
            const pageToFetch = isLoadMore ? currentPage + 1 : 1;

            const response = await getDiasporaPosts({
                search,
                content_type: contentTypes as DiasporaContentType[],
                region: region || undefined,
                is_featured: isFeatured || undefined,
                is_urgent: isUrgent || undefined,
                ordering: sortBy,
                page: pageToFetch,
            });

            if (isLoadMore) {
                setPosts((prev) => [...prev, ...response.results]);
                setCurrentPage((prev) => prev + 1);
            } else {
                setPosts(response.results);
                setCurrentPage(1);
            }

            setHasMore(!!response.next);
            setTotalCount(response.count);
        } catch (error) {
            console.error("Failed to fetch diaspora posts:", error);
        } finally {
            setIsLoading(false);
        }
    }, [search, contentTypes, region, isFeatured, isUrgent, sortBy, currentPage]);

    // Refetch when filters or sort change
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        fetchPosts(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, contentTypes, region, isFeatured, isUrgent, sortBy]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchPosts(true);
        }
    };

    // Calculate active filters count
    const activeFiltersCount =
        (search ? 1 : 0) +
        contentTypes.length +
        (region ? 1 : 0) +
        (isFeatured ? 1 : 0) +
        (isUrgent ? 1 : 0);

    return (
        <Section>
            <div className="inner-wrapper space-y-8">
                {/* Filters */}
                <DiasporaFilters
                    search={search}
                    onSearchChange={setSearch}
                    contentTypes={contentTypes}
                    onContentTypesChange={setContentTypes}
                    region={region}
                    onRegionChange={setRegion}
                    isFeatured={isFeatured}
                    onIsFeaturedChange={setIsFeatured}
                    isUrgent={isUrgent}
                    onIsUrgentChange={setIsUrgent}
                    onClearFilters={clearFilters}
                    activeFiltersCount={activeFiltersCount}
                />

                {/* Sort Tabs & Results Count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <DiasporaSortTabs sortBy={sortBy} onSortChange={setSortBy} />

                    <div className="normal-text text-slate-600">
                        Showing{" "}
                        <span className="font-bold text-slate-900">
                            {totalCount}
                        </span>{" "}
                        posts
                    </div>
                </div>

                {/* Posts Grid or Empty State */}
                {posts.length > 0 ? (
                    <DiasporaGrid
                        posts={posts}
                        hasMore={hasMore}
                        onLoadMore={handleLoadMore}
                    />
                ) : (
                    <DiasporaEmptyState
                        hasActiveFilters={hasActiveFilters()}
                        onClearFilters={clearFilters}
                    />
                )}
            </div>
        </Section>
    );
};


export default DiasporaPageContent;