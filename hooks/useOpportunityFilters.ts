"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface OpportunityFiltersState {
    search: string;
    opportunity_type: string[];
    category: string[];
    is_remote: boolean;
    is_diaspora: boolean;
    is_featured: boolean;
}

export type SortOption =
    | "-published_at"
    | "deadline"
    | "-deadline"
    | "-views_count"
    | "-created_at";

export const useOpportunityFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse initial filters from URL
    const parseInitialFilters = useCallback((): OpportunityFiltersState => {
        const typeParam = searchParams.get("opportunity_type");
        const categoryParam = searchParams.get("category__slug");

        return {
            search: searchParams.get("search") || "",
            opportunity_type: typeParam ? typeParam.split(",").filter(Boolean) : [],
            category: categoryParam ? categoryParam.split(",").filter(Boolean) : [],
            is_remote: searchParams.get("is_remote") === "true",
            is_diaspora: searchParams.get("is_diaspora") === "true",
            is_featured: searchParams.get("is_featured") === "true",
        };
    }, [searchParams]);

    const [filters, setFilters] = useState<OpportunityFiltersState>(
        parseInitialFilters
    );
    const [sort, setSort] = useState<SortOption>(
        (searchParams.get("ordering") as SortOption) || "-published_at"
    );

    // Update URL when filters or sort changes
    const updateURL = useCallback(
        (newFilters: OpportunityFiltersState, newSort: SortOption) => {
            const params = new URLSearchParams();

            // Add filters to URL
            if (newFilters.search) params.set("search", newFilters.search);
            if (newFilters.opportunity_type.length > 0) {
                params.set("opportunity_type", newFilters.opportunity_type.join(","));
            }
            if (newFilters.category.length > 0) {
                params.set("category__slug", newFilters.category.join(","));
            }
            if (newFilters.is_remote) params.set("is_remote", "true");
            if (newFilters.is_diaspora) params.set("is_diaspora", "true");
            if (newFilters.is_featured) params.set("is_featured", "true");

            // Add sort to URL
            if (newSort !== "-published_at") {
                params.set("ordering", newSort);
            }

            // Update URL without page reload
            const queryString = params.toString();
            router.push(queryString ? `/opportunities?${queryString}` : "/opportunities", {
                scroll: false,
            });
        },
        [router]
    );

    // Handle filter changes
    const handleFiltersChange = useCallback(
        (newFilters: OpportunityFiltersState) => {
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
        const emptyFilters: OpportunityFiltersState = {
            search: "",
            opportunity_type: [],
            category: [],
            is_remote: false,
            is_diaspora: false,
            is_featured: false,
        };
        setFilters(emptyFilters);
        updateURL(emptyFilters, sort);
    }, [sort, updateURL]);

    // Check if any filters are active
    const hasActiveFilters = useCallback(() => {
        return (
            filters.search !== "" ||
            filters.opportunity_type.length > 0 ||
            filters.category.length > 0 ||
            filters.is_remote ||
            filters.is_diaspora ||
            filters.is_featured
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