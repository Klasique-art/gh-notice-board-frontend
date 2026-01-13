"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface EventFiltersState {
    search: string;
    category: string[];
    event_type: string[];
    is_virtual: boolean;
    is_free: boolean;
    is_featured: boolean;
    date_from: string;
    date_to: string;
    city: string;
}

export type SortOption =
    | "start_date"
    | "-start_date"
    | "-created_at"
    | "-views_count"
    | "-likes_count"
    | "-registration_count"
    | "price"
    | "-price";

export const useEventFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse initial filters from URL
    const parseInitialFilters = useCallback((): EventFiltersState => {
        const categoryParam = searchParams.get("category");
        const eventTypeParam = searchParams.get("event_type");

        return {
            search: searchParams.get("search") || "",
            category: categoryParam ? categoryParam.split(",").filter(Boolean) : [],
            event_type: eventTypeParam ? eventTypeParam.split(",").filter(Boolean) : [],
            is_virtual: searchParams.get("is_virtual") === "true",
            is_free: searchParams.get("is_free") === "true",
            is_featured: searchParams.get("is_featured") === "true",
            date_from: searchParams.get("date_from") || "",
            date_to: searchParams.get("date_to") || "",
            city: searchParams.get("city") || "",
        };
    }, [searchParams]);

    const [filters, setFilters] = useState<EventFiltersState>(parseInitialFilters);
    const [sort, setSort] = useState<SortOption>(
        (searchParams.get("ordering") as SortOption) || "start_date"
    );

    // Update URL when filters or sort changes
    const updateURL = useCallback(
        (newFilters: EventFiltersState, newSort: SortOption) => {
            const params = new URLSearchParams();

            // Add filters to URL
            if (newFilters.search) params.set("search", newFilters.search);
            if (newFilters.category.length > 0) {
                params.set("category", newFilters.category.join(","));
            }
            if (newFilters.event_type.length > 0) {
                params.set("event_type", newFilters.event_type.join(","));
            }
            if (newFilters.is_virtual) params.set("is_virtual", "true");
            if (newFilters.is_free) params.set("is_free", "true");
            if (newFilters.is_featured) params.set("is_featured", "true");
            if (newFilters.date_from) params.set("date_from", newFilters.date_from);
            if (newFilters.date_to) params.set("date_to", newFilters.date_to);
            if (newFilters.city) params.set("city", newFilters.city);

            // Add sort to URL
            if (newSort !== "start_date") {
                params.set("ordering", newSort);
            }

            // Update URL without page reload
            const queryString = params.toString();
            router.push(queryString ? `/events?${queryString}` : "/events", {
                scroll: false,
            });
        },
        [router]
    );

    // Handle filter changes
    const handleFiltersChange = useCallback(
        (newFilters: EventFiltersState) => {
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
        const emptyFilters: EventFiltersState = {
            search: "",
            category: [],
            event_type: [],
            is_virtual: false,
            is_free: false,
            is_featured: false,
            date_from: "",
            date_to: "",
            city: "",
        };
        setFilters(emptyFilters);
        updateURL(emptyFilters, sort);
    }, [sort, updateURL]);

    // Check if any filters are active
    const hasActiveFilters = useCallback(() => {
        return (
            filters.search !== "" ||
            filters.category.length > 0 ||
            filters.event_type.length > 0 ||
            filters.is_virtual ||
            filters.is_free ||
            filters.is_featured ||
            filters.date_from !== "" ||
            filters.date_to !== "" ||
            filters.city !== ""
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