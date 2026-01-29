"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EventFilters, EventSortTabs, EventGrid } from "@/components";
import { Event, EventCategory, PaginatedEventsResponse } from "@/types/events.types";
import { useEventFilters } from "@/hooks/useEventFilters";

interface EventPageContentProps {
    initialEvents: Event[];
    availableCategories: EventCategory[];
    totalCount: number;
}

const EventPageContent = ({
    initialEvents,
    availableCategories,
    totalCount,
}: EventPageContentProps) => {
    const {
        filters,
        sort,
        handleFiltersChange,
        handleSortChange,
        clearFilters,
        hasActiveFilters,
    } = useEventFilters();

    const [displayedEvents, setDisplayedEvents] = useState<Event[]>(initialEvents);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(totalCount > initialEvents.length);
    const [total, setTotal] = useState(totalCount);

    // Fetch events from API when filters or sort change
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                // Build query params
                const params = new URLSearchParams();

                if (filters.search) params.set('search', filters.search);
                if (filters.category.length > 0) params.set('category_slug', filters.category[0]);
                if (filters.event_type.length > 0) params.set('event_type', filters.event_type[0]);
                if (filters.is_featured) params.set('is_featured', 'true');
                if (filters.date_from) params.set('start_date_from', filters.date_from);
                if (filters.date_to) params.set('start_date_to', filters.date_to);
                params.set('ordering', sort);
                params.set('page', '1');

                const response = await fetch(`/api/events?${params.toString()}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data: PaginatedEventsResponse = await response.json();

                setDisplayedEvents(data.results);
                setTotal(data.count);
                setHasMore(!!data.next);
                setCurrentPage(1);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [filters, sort]);

    // Load more events (pagination)
    const handleLoadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const nextPage = currentPage + 1;

            // Build query params
            const params = new URLSearchParams();

            if (filters.search) params.set('search', filters.search);
            if (filters.category.length > 0) params.set('category_slug', filters.category[0]);
            if (filters.event_type.length > 0) params.set('event_type', filters.event_type[0]);
            if (filters.is_featured) params.set('is_featured', 'true');
            if (filters.date_from) params.set('start_date_from', filters.date_from);
            if (filters.date_to) params.set('start_date_to', filters.date_to);
            params.set('ordering', sort);
            params.set('page', nextPage.toString());

            const response = await fetch(`/api/events?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to load more events');
            }

            const data: PaginatedEventsResponse = await response.json();

            setDisplayedEvents(prev => [...prev, ...data.results]);
            setHasMore(!!data.next);
            setCurrentPage(nextPage);
        } catch (error) {
            console.error('Error loading more events:', error);
        } finally {
            setIsLoading(false);
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
                    <EventFilters
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
                                {total}
                            </span>{" "}
                            {total === 1 ? "event" : "events"} found
                        </p>
                    </div>

                    {/* Sort Tabs */}
                    <div className="bg-white rounded-lg border-2 border-slate-200 p-2">
                        <EventSortTabs activeSort={sort} onSortChange={handleSortChange} />
                    </div>
                </motion.div>

                {/* Events Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <EventGrid
                        events={displayedEvents}
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

export default EventPageContent;