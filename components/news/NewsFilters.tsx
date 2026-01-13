"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search, Calendar, Tag as TagIcon, Star, TrendingUp, Zap } from "lucide-react";

export interface NewsFiltersState {
    search: string;
    category: string[];
    tag: string[];
    is_featured: boolean;
    is_breaking: boolean;
    is_trending: boolean;
    date_from: string;
    date_to: string;
}

interface NewsFiltersProps {
    filters: NewsFiltersState;
    onFiltersChange: (filters: NewsFiltersState) => void;
    availableCategories: { slug: string; name: string; color: string }[];
    availableTags: { slug: string; name: string }[];
}

const NewsFilters = ({
    filters,
    onFiltersChange,
    availableCategories,
    availableTags,
}: NewsFiltersProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchChange = (value: string) => {
        onFiltersChange({ ...filters, search: value });
    };

    const handleCategoryToggle = (slug: string) => {
        const newCategories = filters.category.includes(slug)
            ? filters.category.filter((c) => c !== slug)
            : [...filters.category, slug];
        onFiltersChange({ ...filters, category: newCategories });
    };

    const handleTagToggle = (slug: string) => {
        const newTags = filters.tag.includes(slug)
            ? filters.tag.filter((t) => t !== slug)
            : [...filters.tag, slug];
        onFiltersChange({ ...filters, tag: newTags });
    };

    const toggleFilter = (key: "is_featured" | "is_breaking" | "is_trending") => {
        onFiltersChange({ ...filters, [key]: !filters[key] });
    };

    const handleDateChange = (type: "from" | "to", value: string) => {
        if (type === "from") {
            onFiltersChange({ ...filters, date_from: value });
        } else {
            onFiltersChange({ ...filters, date_to: value });
        }
    };

    const clearAllFilters = () => {
        onFiltersChange({
            search: "",
            category: [],
            tag: [],
            is_featured: false,
            is_breaking: false,
            is_trending: false,
            date_from: "",
            date_to: "",
        });
    };

    const activeFilterCount =
        filters.category.length +
        filters.tag.length +
        (filters.is_featured ? 1 : 0) +
        (filters.is_breaking ? 1 : 0) +
        (filters.is_trending ? 1 : 0) +
        (filters.date_from ? 1 : 0) +
        (filters.date_to ? 1 : 0);

    return (
        <div className="space-y-4">
            {/* Search & Filter Toggle */}
            <div className="flex gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search news articles..."
                        className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors normal-text"
                    />
                </div>

                {/* Filter Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            h-12 px-6 rounded-lg font-semibold normal-text transition-all duration-300 flex items-center gap-2
            ${isOpen || activeFilterCount > 0
                            ? "bg-primary text-white shadow-lg"
                            : "bg-white border-2 border-slate-200 text-slate-700 hover:border-primary"
                        }
          `}
                >
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white small-text-2 font-bold">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-white rounded-lg border-2 border-slate-200 space-y-6">
                            {/* Quick Filters */}
                            <div className="space-y-3">
                                <h3 className="big-text-5 font-bold text-slate-900 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-secondary" />
                                    Quick Filters
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => toggleFilter("is_featured")}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                      ${filters.is_featured
                                                ? "bg-primary text-white shadow-md"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }
                    `}
                                    >
                                        <Star className="w-4 h-4" />
                                        Featured
                                    </button>
                                    <button
                                        onClick={() => toggleFilter("is_breaking")}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                      ${filters.is_breaking
                                                ? "bg-accent text-white shadow-md"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }
                    `}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-current" />
                                        Breaking
                                    </button>
                                    <button
                                        onClick={() => toggleFilter("is_trending")}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                      ${filters.is_trending
                                                ? "bg-secondary text-primary shadow-md"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }
                    `}
                                    >
                                        <TrendingUp className="w-4 h-4" />
                                        Trending
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="space-y-3">
                                <h3 className="big-text-5 font-bold text-slate-900">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableCategories.map((category) => (
                                        <button
                                            key={category.slug}
                                            onClick={() => handleCategoryToggle(category.slug)}
                                            className={`
                        px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all border-2
                        ${filters.category.includes(category.slug)
                                                    ? "text-white shadow-md border-transparent"
                                                    : "bg-white text-slate-700 hover:border-slate-300"
                                                }
                      `}
                                            style={{
                                                backgroundColor: filters.category.includes(category.slug)
                                                    ? category.color
                                                    : undefined,
                                                borderColor: !filters.category.includes(category.slug)
                                                    ? "#e2e8f0"
                                                    : undefined,
                                            }}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            {availableTags.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="big-text-5 font-bold text-slate-900 flex items-center gap-2">
                                        <TagIcon className="w-5 h-5" />
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {availableTags.map((tag) => (
                                            <button
                                                key={tag.slug}
                                                onClick={() => handleTagToggle(tag.slug)}
                                                className={`
                          px-3 py-1.5 rounded-full font-medium small-text transition-all
                          ${filters.tag.includes(tag.slug)
                                                        ? "bg-primary text-white shadow-md"
                                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                    }
                        `}
                                            >
                                                #{tag.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Date Range */}
                            <div className="space-y-3">
                                <h3 className="big-text-5 font-bold text-slate-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Date Range
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block normal-text-2 text-slate-600 mb-1">
                                            From
                                        </label>
                                        <input
                                            type="date"
                                            value={filters.date_from}
                                            onChange={(e) => handleDateChange("from", e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors normal-text-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block normal-text-2 text-slate-600 mb-1">
                                            To
                                        </label>
                                        <input
                                            type="date"
                                            value={filters.date_to}
                                            onChange={(e) => handleDateChange("to", e.target.value)}
                                            className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors normal-text-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={clearAllFilters}
                                    className="w-full h-11 px-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold normal-text transition-colors flex items-center justify-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewsFilters;