"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface ApplicationsFiltersProps {
    currentStatus: string;
    currentType: string;
    currentSearch: string;
}

const ApplicationsFilters = ({
    currentStatus,
    currentType,
    currentSearch,
}: ApplicationsFiltersProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(currentSearch);

    const statusOptions = [
        { value: "all", label: "All Status", count: null },
        { value: "draft", label: "Draft", count: null },
        { value: "submitted", label: "Submitted", count: null },
        { value: "under_review", label: "Under Review", count: null },
        { value: "shortlisted", label: "Shortlisted", count: null },
        { value: "interview_scheduled", label: "Interview Scheduled", count: null },
        { value: "accepted", label: "Accepted", count: null },
        { value: "rejected", label: "Rejected", count: null },
        { value: "withdrawn", label: "Withdrawn", count: null },
    ];

    const typeOptions = [
        { value: "all", label: "All Types" },
        { value: "job", label: "Jobs" },
        { value: "scholarship", label: "Scholarships" },
        { value: "grant", label: "Grants" },
        { value: "internship", label: "Internships" },
        { value: "fellowship", label: "Fellowships" },
    ];

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all" || !value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // Reset to page 1 when filtering
        params.delete("page");

        router.push(`/dashboard/applications?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilter("search", searchValue);
    };

    const clearFilters = () => {
        router.push("/dashboard/applications");
        setSearchValue("");
    };

    const hasActiveFilters =
        currentStatus !== "all" || currentType !== "all" || currentSearch;

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal
                    className="w-5 h-5 text-primary"
                    aria-hidden="true"
                />
                <h2 className="big-text-5 font-semibold text-slate-900">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="ml-auto text-accent hover:text-accent-100 small-text font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search applications by title or company..."
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none normal-text"
                    />
                </form>

                {/* Status Filter */}
                <div>
                    <label className="block normal-text-2 font-medium text-slate-700 mb-2">
                        Application Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateFilter("status", option.value)}
                                className={`px-4 py-2 rounded-lg font-medium normal-text-2 transition-all ${currentStatus === option.value
                                        ? "bg-primary text-white shadow-md"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Opportunity Type Filter */}
                <div>
                    <label className="block normal-text-2 font-medium text-slate-700 mb-2">
                        Opportunity Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {typeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateFilter("type", option.value)}
                                className={`px-4 py-2 rounded-lg font-medium normal-text-2 transition-all ${currentType === option.value
                                        ? "bg-secondary text-primary shadow-md"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsFilters;