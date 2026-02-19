"use client";

import { useSearchParams } from "next/navigation";
import { Bookmark } from "@/types/bookmarks.types";
import { SavedItemCard } from "@/components";

interface SavedItemsGridProps {
    bookmarks: Bookmark[];
    onRemove: (bookmark: Bookmark) => Promise<void>;
    removingIds: Set<number>;
}

const filterTypeMap: Record<string, Bookmark["content_type_name"] | null> = {
    news: "newsarticle",
    event: "event",
    opportunity: "opportunity",
    diaspora: "diasporapost",
    announcement: "announcement",
};

const SavedItemsGrid = ({ bookmarks, onRemove, removingIds }: SavedItemsGridProps) => {
    const searchParams = useSearchParams();
    const currentType = searchParams.get("type") || "all";

    // Filter bookmarks by type
    const filteredBookmarks =
        currentType === "all"
            ? bookmarks
            : bookmarks.filter((b) => b.content_type_name === filterTypeMap[currentType]);

    if (filteredBookmarks.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-slate-200">
                <p className="normal-text text-slate-600">
                    No saved items found for this filter.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookmarks.map((bookmark) => (
                <SavedItemCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onRemove={onRemove}
                    isRemoving={removingIds.has(bookmark.id)}
                />
            ))}
        </div>
    );
};

export default SavedItemsGrid;
