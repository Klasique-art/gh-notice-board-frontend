"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState } from "react";

const MyEventsFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("search") || ""
    );

    const currentStatus = searchParams.get("status") || "all";

    const statusFilters = [
        { value: "all", label: "All Events" },
        { value: "published", label: "Published" },
        { value: "draft", label: "Draft" },
        { value: "upcoming", label: "Upcoming" },
        { value: "past", label: "Past" },
        { value: "cancelled", label: "Cancelled" },
    ];

    const handleStatusChange = (status: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (status === "all") {
            params.delete("status");
        } else {
            params.set("status", status);
        }
        params.delete("page"); // Reset to first page
        router.push(`?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
            params.set("search", searchQuery);
        } else {
            params.delete("search");
        }
        params.delete("page"); // Reset to first page
        router.push(`?${params.toString()}`);
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        router.push("/dashboard/my-events");
    };

    const hasActiveFilters = currentStatus !== "all" || searchQuery;

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        placeholder="Search events by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary normal-text"
                    />
                </div>
            </form>

            {/* Status Filters */}
            <div className="space-y-2">
                <label className="small-text font-semibold text-slate-700">
                    Filter by Status
                </label>
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => handleStatusChange(filter.value)}
                            className={`px-4 py-2 rounded-lg font-medium normal-text-2 transition-all ${currentStatus === filter.value
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <button
                    onClick={handleClearFilters}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium normal-text-2 transition-colors"
                >
                    <X className="w-4 h-4" aria-hidden="true" />
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default MyEventsFilters;