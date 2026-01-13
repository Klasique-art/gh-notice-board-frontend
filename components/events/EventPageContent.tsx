"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { EventFilters, EventSortTabs, EventGrid } from "@/components";
import { Event } from "@/types/events.types";
import { useEventFilters } from "@/hooks/useEventFilters";

// Items per page for pagination
const ITEMS_PER_PAGE = 12;

interface EventPageContentProps {
    initialEvents: Event[];
    availableCategories: { slug: string; name: string; color: string }[];
}

const EventPageContent = ({
    initialEvents,
    availableCategories,
}: EventPageContentProps) => {
    const {
        filters,
        sort,
        handleFiltersChange,
        handleSortChange,
        clearFilters,
        hasActiveFilters,
    } = useEventFilters();

    const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Filter and sort events
    const filteredAndSortedEvents = useMemo(() => {
        let result = [...initialEvents];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (event) =>
                    event.title.toLowerCase().includes(searchLower) ||
                    event.summary.toLowerCase().includes(searchLower) ||
                    event.organizer.full_name.toLowerCase().includes(searchLower) ||
                    event.venue_name.toLowerCase().includes(searchLower)
            );
        }

        // Apply category filter
        if (filters.category.length > 0) {
            result = result.filter((event) =>
                filters.category.includes(event.category.slug)
            );
        }

        // Apply event type filter
        if (filters.event_type.length > 0) {
            result = result.filter((event) =>
                filters.event_type.includes(event.event_type)
            );
        }

        // Apply virtual filter
        if (filters.is_virtual) {
            result = result.filter(
                (event) => event.event_type === "virtual" || event.event_type === "hybrid"
            );
        }

        // Apply free filter
        if (filters.is_free) {
            result = result.filter((event) => event.price === 0);
        }

        // Apply featured filter
        if (filters.is_featured) {
            result = result.filter((event) => event.is_featured);
        }

        // Apply city filter
        if (filters.city) {
            const cityLower = filters.city.toLowerCase();
            result = result.filter((event) =>
                event.venue_address.toLowerCase().includes(cityLower)
            );
        }

        // Apply date filters
        if (filters.date_from) {
            const fromDate = new Date(filters.date_from);
            result = result.filter(
                (event) => new Date(event.start_date) >= fromDate
            );
        }

        if (filters.date_to) {
            const toDate = new Date(filters.date_to);
            toDate.setHours(23, 59, 59, 999); // End of day
            result = result.filter((event) => new Date(event.end_date) <= toDate);
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (sort) {
                case "start_date":
                    return (
                        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
                    );
                case "-start_date":
                    return (
                        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
                    );
                case "-created_at":
                    return (
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );
                case "-views_count":
                    return b.views_count - a.views_count;
                case "-likes_count":
                    return b.likes_count - a.likes_count;
                case "-registration_count":
                    return b.registered_count - a.registered_count;
                case "price":
                    return a.price - b.price;
                case "-price":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return result;
    }, [initialEvents, filters, sort]);

    // Paginated events
    const paginatedEvents = useMemo(() => {
        return filteredAndSortedEvents.slice(0, currentPage * ITEMS_PER_PAGE);
    }, [filteredAndSortedEvents, currentPage]);

    const hasMore = paginatedEvents.length < filteredAndSortedEvents.length;

    // Update displayed events when paginated events change
    useEffect(() => {
        setDisplayedEvents(paginatedEvents);
    }, [paginatedEvents]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sort]);

    // Load more events (infinite scroll)
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
                                {filteredAndSortedEvents.length}
                            </span>{" "}
                            {filteredAndSortedEvents.length === 1 ? "event" : "events"} found
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