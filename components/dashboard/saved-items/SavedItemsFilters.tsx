"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BookmarkStats } from "@/types/bookmarks.types";

interface SavedItemsFiltersProps {
    stats: BookmarkStats;
}

const SavedItemsFilters = ({ stats }: SavedItemsFiltersProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentType = searchParams.get("type") || "all";

    const filters = [
        { value: "all", label: "All Items", count: stats.total },
        { value: "event", label: "Events", count: stats.events },
        { value: "news", label: "News", count: stats.news },
        { value: "opportunity", label: "Jobs", count: stats.opportunities },
        { value: "diaspora", label: "Diaspora", count: stats.diaspora },
        { value: "announcement", label: "Announcements", count: stats.announcements },
    ];

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (type === "all") {
            params.delete("type");
        } else {
            params.set("type", type);
        }
        params.delete("page"); // Reset to first page
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
            <label className="small-text font-semibold text-slate-700 mb-3 block">
                Filter by Type
            </label>
            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => handleTypeChange(filter.value)}
                        className={`px-4 py-2 rounded-lg font-medium normal-text-2 transition-all ${currentType === filter.value
                                ? "bg-primary text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                    >
                        {filter.label}
                        <span
                            className={`ml-2 ${currentType === filter.value
                                    ? "text-white/80"
                                    : "text-slate-500"
                                }`}
                        >
                            ({filter.count})
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SavedItemsFilters;
