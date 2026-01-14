"use client";

import { useState, useMemo } from "react";
import { DiasporaPost } from "@/types/diaspora.types";
import { Section } from "@/components";
import DiasporaFilters from "./DiasporaFilters";
import DiasporaSortTabs from "./DiasporaSortTabs";
import DiasporaGrid from "./DiasporaGrid";
import DiasporaEmptyState from "./DiasporaEmptyState";
import { useDiasporaFilters } from "@/hooks/useDiasporaFilters";

interface DiasporaPageContentProps {
    initialPosts: DiasporaPost[];
}

const DiasporaPageContent = ({ initialPosts }: DiasporaPageContentProps) => {
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

    // Pagination state
    const [displayCount, setDisplayCount] = useState(12);

    // Filter and sort posts
    const filteredAndSortedPosts = useMemo(() => {
        let filtered = [...initialPosts];

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchLower) ||
                    post.summary.toLowerCase().includes(searchLower) ||
                    post.country.toLowerCase().includes(searchLower) ||
                    post.organization_name.toLowerCase().includes(searchLower)
            );
        }

        // Content type filter
        if (contentTypes.length > 0) {
            filtered = filtered.filter((post) =>
                contentTypes.includes(post.content_type)
            );
        }

        // Region filter
        if (region) {
            filtered = filtered.filter((post) => post.region === region);
        }

        // Featured filter
        if (isFeatured) {
            filtered = filtered.filter((post) => post.is_featured);
        }

        // Urgent filter
        if (isUrgent) {
            filtered = filtered.filter((post) => post.is_urgent);
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "-published_at":
                    return (
                        new Date(b.published_at || b.created_at).getTime() -
                        new Date(a.published_at || a.created_at).getTime()
                    );
                case "published_at":
                    return (
                        new Date(a.published_at || a.created_at).getTime() -
                        new Date(b.published_at || b.created_at).getTime()
                    );
                case "-views_count":
                    return b.views_count - a.views_count;
                case "views_count":
                    return a.views_count - b.views_count;
                case "-created_at":
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
                case "created_at":
                    return (
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    );
                default:
                    return 0;
            }
        });

        return filtered;
    }, [
        initialPosts,
        search,
        contentTypes,
        region,
        isFeatured,
        isUrgent,
        sortBy,
    ]);

    // Paginated posts
    const displayedPosts = filteredAndSortedPosts.slice(0, displayCount);
    const hasMore = displayCount < filteredAndSortedPosts.length;

    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 12);
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
                            {displayedPosts.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-slate-900">
                            {filteredAndSortedPosts.length}
                        </span>{" "}
                        posts
                    </div>
                </div>

                {/* Posts Grid or Empty State */}
                {displayedPosts.length > 0 ? (
                    <DiasporaGrid
                        posts={displayedPosts}
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