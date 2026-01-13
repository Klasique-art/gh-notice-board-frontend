"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface NewsFiltersState {
    search: string;
    category: string[];
    tag: string[];
    is_featured: boolean;
    is_breaking: boolean;
    is_trending: boolean;
    date_from: string;
    date_to: string;
}

export type SortOption =
    | "-published_at"
    | "-created_at"
    | "-views_count"
    | "-likes_count"
    | "-comments_count"
    | "-shares_count";

export const useNewsFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse initial filters from URL
    const parseInitialFilters = useCallback((): NewsFiltersState => {
        const categoryParam = searchParams.get("category");
        const tagParam = searchParams.get("tag");

        return {
            search: searchParams.get("search") || "",
            category: categoryParam ? categoryParam.split(",").filter(Boolean) : [],
            tag: tagParam ? tagParam.split(",").filter(Boolean) : [],
            is_featured: searchParams.get("is_featured") === "true",
            is_breaking: searchParams.get("is_breaking") === "true",
            is_trending: searchParams.get("is_trending") === "true",
            date_from: searchParams.get("date_from") || "",
            date_to: searchParams.get("date_to") || "",
        };
    }, [searchParams]);

    const [filters, setFilters] = useState<NewsFiltersState>(parseInitialFilters);
    const [sort, setSort] = useState<SortOption>(
        (searchParams.get("ordering") as SortOption) || "-published_at"
    );

    // Update URL when filters or sort changes
    const updateURL = useCallback(
        (newFilters: NewsFiltersState, newSort: SortOption) => {
            const params = new URLSearchParams();

            // Add filters to URL
            if (newFilters.search) params.set("search", newFilters.search);
            if (newFilters.category.length > 0) {
                params.set("category", newFilters.category.join(","));
            }
            if (newFilters.tag.length > 0) {
                params.set("tag", newFilters.tag.join(","));
            }
            if (newFilters.is_featured) params.set("is_featured", "true");
            if (newFilters.is_breaking) params.set("is_breaking", "true");
            if (newFilters.is_trending) params.set("is_trending", "true");
            if (newFilters.date_from) params.set("date_from", newFilters.date_from);
            if (newFilters.date_to) params.set("date_to", newFilters.date_to);

            // Add sort to URL
            if (newSort !== "-published_at") {
                params.set("ordering", newSort);
            }

            // Update URL without page reload
            const queryString = params.toString();
            router.push(queryString ? `/news?${queryString}` : "/news", {
                scroll: false,
            });
        },
        [router]
    );

    // Handle filter changes
    const handleFiltersChange = useCallback(
        (newFilters: NewsFiltersState) => {
            setFilters(newFilters);
            updateURL(newFilters, sort);
        },
        [sort, updateURL]
    );

    // Handle sort changes
    const handleSortChange = useCallback(
        (newSort: SortOption) => {
            setSort(newSort);
            updateURL(filters, newSort);
        },
        [filters, updateURL]
    );

    // Clear all filters
    const clearFilters = useCallback(() => {
        const emptyFilters: NewsFiltersState = {
            search: "",
            category: [],
            tag: [],
            is_featured: false,
            is_breaking: false,
            is_trending: false,
            date_from: "",
            date_to: "",
        };
        setFilters(emptyFilters);
        updateURL(emptyFilters, sort);
    }, [sort, updateURL]);

    // Check if any filters are active
    const hasActiveFilters = useCallback(() => {
        return (
            filters.search !== "" ||
            filters.category.length > 0 ||
            filters.tag.length > 0 ||
            filters.is_featured ||
            filters.is_breaking ||
            filters.is_trending ||
            filters.date_from !== "" ||
            filters.date_to !== ""
        );
    }, [filters]);

    return {
        filters,
        sort,
        handleFiltersChange,
        handleSortChange,
        clearFilters,
        hasActiveFilters,
    };
};