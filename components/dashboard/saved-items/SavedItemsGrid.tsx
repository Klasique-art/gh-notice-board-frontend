"use client";

import { useSearchParams } from "next/navigation";
import { Bookmark } from "@/types/bookmarks.types";
import { SavedItemCard } from "@/components";

interface SavedItemsGridProps {
    bookmarks: Bookmark[];
}

const SavedItemsGrid = ({ bookmarks }: SavedItemsGridProps) => {
    const searchParams = useSearchParams();
    const currentType = searchParams.get("type") || "all";

    // Filter bookmarks by type
    const filteredBookmarks =
        currentType === "all"
            ? bookmarks
            : bookmarks.filter((b) => b.content_type_name === currentType);

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
                <SavedItemCard key={bookmark.id} bookmark={bookmark} />
            ))}
        </div>
    );
};

export default SavedItemsGrid;