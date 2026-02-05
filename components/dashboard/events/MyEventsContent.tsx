"use client";

import { PaginatedEventsResponse } from "@/types/events.types";
import {
    MyEventsHeader,
    MyEventsStats,
    MyEventsFilters,
    MyEventsGrid,
    MyEventsEmptyState,
} from "@/components";

interface MyEventsContentProps {
    events: PaginatedEventsResponse;
}

const MyEventsContent = ({ events }: MyEventsContentProps) => {
    const hasEvents = events.count > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <MyEventsHeader count={events.count} />

            {hasEvents ? (
                <>
                    {/* Stats */}
                    <MyEventsStats events={events.results} />

                    {/* Filters */}
                    <MyEventsFilters />

                    {/* Events Grid */}
                    <MyEventsGrid events={events.results} />
                </>
            ) : (
                <MyEventsEmptyState />
            )}
        </div>
    );
};

export default MyEventsContent;