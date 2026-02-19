"use client";

import { useState } from "react";
import { BookmarksResponse, BookmarkStats } from "@/types/bookmarks.types";
import { removeBookmark } from "@/app/lib/bookmarkInteractions";
import { useToast } from "@/components/ui/ToastProvider";
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

function buildStats(results: BookmarksResponse["results"]): BookmarkStats {
    return {
        total: results.length,
        events: results.filter((item) => item.content_type_name === "event").length,
        news: results.filter((item) => item.content_type_name === "newsarticle").length,
        opportunities: results.filter((item) => item.content_type_name === "opportunity").length,
        diaspora: results.filter((item) => item.content_type_name === "diasporapost").length,
        announcements: results.filter((item) => item.content_type_name === "announcement").length,
    };
}

function mapBookmarkType(bookmark: BookmarksResponse["results"][number]): "news" | "event" | "opportunity" | "diaspora" | null {
    if (bookmark.type) {
        return bookmark.type;
    }

    switch (bookmark.content_type_name) {
        case "newsarticle":
            return "news";
        case "event":
            return "event";
        case "opportunity":
            return "opportunity";
        case "diasporapost":
            return "diaspora";
        default:
            return null;
    }
}

const SavedItemsContent = ({ bookmarks, stats }: SavedItemsContentProps) => {
    const [savedItems, setSavedItems] = useState(bookmarks.results);
    const [savedStats, setSavedStats] = useState(stats);
    const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
    const { showToast } = useToast();
    const hasBookmarks = savedItems.length > 0;

    const handleRemove = async (bookmark: BookmarksResponse["results"][number]) => {
        if (removingIds.has(bookmark.id)) {
            return;
        }

        const bookmarkType = mapBookmarkType(bookmark);
        if (!bookmarkType) {
            showToast({
                title: "Remove failed",
                description: "This bookmark type cannot be removed yet.",
                tone: "error",
            });
            return;
        }

        setRemovingIds((prev) => {
            const next = new Set(prev);
            next.add(bookmark.id);
            return next;
        });

        try {
            await removeBookmark({
                type: bookmarkType,
                object_id: bookmark.object_id,
            });

            setSavedItems((prev) => {
                const nextItems = prev.filter((item) => item.id !== bookmark.id);
                setSavedStats(buildStats(nextItems));
                return nextItems;
            });

            showToast({
                title: "Removed",
                description: "Item removed from your saved list.",
                tone: "info",
            });
        } catch (error) {
            showToast({
                title: "Remove failed",
                description: error instanceof Error ? error.message : "Please try again.",
                tone: "error",
            });
        } finally {
            setRemovingIds((prev) => {
                const next = new Set(prev);
                next.delete(bookmark.id);
                return next;
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <SavedItemsHeader stats={savedStats} />

            {hasBookmarks ? (
                <>
                    {/* Filters */}
                    <SavedItemsFilters stats={savedStats} />

                    {/* Bookmarks Grid */}
                    <SavedItemsGrid
                        bookmarks={savedItems}
                        onRemove={handleRemove}
                        removingIds={removingIds}
                    />
                </>
            ) : (
                <SavedItemsEmptyState />
            )}
        </div>
    );
};

export default SavedItemsContent;
