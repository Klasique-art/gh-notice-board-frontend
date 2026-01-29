"use client";

import { BookmarksResponse, BookmarkStats } from "@/types/bookmarks.types";
import {
    SavedItemsHeader,
    SavedItemsFilters,
    SavedItemsGrid,
    SavedItemsEmptyState,
} from "@/components";

interface SavedItemsContentProps {
    bookmarks: BookmarksResponse;
    stats: BookmarkStats;
}

const SavedItemsContent = ({ bookmarks, stats }: SavedItemsContentProps) => {
    const hasBookmarks = bookmarks.count > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <SavedItemsHeader stats={stats} />

            {hasBookmarks ? (
                <>
                    {/* Filters */}
                    <SavedItemsFilters stats={stats} />

                    {/* Bookmarks Grid */}
                    <SavedItemsGrid bookmarks={bookmarks.results} />
                </>
            ) : (
                <SavedItemsEmptyState />
            )}
        </div>
    );
};

export default SavedItemsContent;