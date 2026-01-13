"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Filter,
    X,
    Search,
    Calendar,
    MapPin,
    Video,
    DollarSign,
    Star,
} from "lucide-react";

export interface EventFiltersState {
    search: string;
    category: string[];
    event_type: string[];
    is_virtual: boolean;
    is_free: boolean;
    is_featured: boolean;
    date_from: string;
    date_to: string;
    city: string;
}

interface EventFiltersProps {
    filters: EventFiltersState;
    onFiltersChange: (filters: EventFiltersState) => void;
    availableCategories: { slug: string; name: string; color: string }[];
}

const eventTypes = [
    { value: "in-person", label: "In-Person", icon: <MapPin className="w-4 h-4" /> },
    { value: "virtual", label: "Virtual", icon: <Video className="w-4 h-4" /> },
    {
        value: "hybrid",
        label: "Hybrid",
        icon: (
            <>
                <MapPin className="w-3.5 h-3.5" />
                <Video className="w-3.5 h-3.5" />
            </>
        ),
    },
];

const EventFilters = ({
    filters,
    onFiltersChange,
    availableCategories,
}: EventFiltersProps) => {
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

    const handleEventTypeToggle = (type: string) => {
        const newTypes = filters.event_type.includes(type)
            ? filters.event_type.filter((t) => t !== type)
            : [...filters.event_type, type];
        onFiltersChange({ ...filters, event_type: newTypes });
    };

    const toggleFilter = (key: "is_virtual" | "is_free" | "is_featured") => {
        onFiltersChange({ ...filters, [key]: !filters[key] });
    };

    const handleDateChange = (type: "from" | "to", value: string) => {
        if (type === "from") {
            onFiltersChange({ ...filters, date_from: value });
        } else {
            onFiltersChange({ ...filters, date_to: value });
        }
    };

    const handleCityChange = (value: string) => {
        onFiltersChange({ ...filters, city: value });
    };

    const clearAllFilters = () => {
        onFiltersChange({
            search: "",
            category: [],
            event_type: [],
            is_virtual: false,
            is_free: false,
            is_featured: false,
            date_from: "",
            date_to: "",
            city: "",
        });
    };

    const activeFilterCount =
        filters.category.length +
        filters.event_type.length +
        (filters.is_virtual ? 1 : 0) +
        (filters.is_free ? 1 : 0) +
        (filters.is_featured ? 1 : 0) +
        (filters.date_from ? 1 : 0) +
        (filters.date_to ? 1 : 0) +
        (filters.city ? 1 : 0);

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
                        placeholder="Search events, organizers, venues..."
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
                                    <Star className="w-5 h-5 text-secondary" />
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
                                        onClick={() => toggleFilter("is_free")}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                      ${filters.is_free
                                                ? "bg-secondary text-primary shadow-md"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }
                    `}
                                    >
                                        <DollarSign className="w-4 h-4" />
                                        Free Events
                                    </button>
                                    <button
                                        onClick={() => toggleFilter("is_virtual")}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                      ${filters.is_virtual
                                                ? "bg-accent text-white shadow-md"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }
                    `}
                                    >
                                        <Video className="w-4 h-4" />
                                        Virtual
                                    </button>
                                </div>
                            </div>

                            {/* Event Types */}
                            <div className="space-y-3">
                                <h3 className="big-text-5 font-bold text-slate-900">Event Type</h3>
                                <div className="flex flex-wrap gap-2">
                                    {eventTypes.map((type) => (
                                        <button
                                            key={type.value}
                                            onClick={() => handleEventTypeToggle(type.value)}
                                            className={`
                        px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                        ${filters.event_type.includes(type.value)
                                                    ? "bg-primary text-white shadow-md"
                                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                }
                      `}
                                        >
                                            {type.icon}
                                            {type.label}
                                        </button>
                                    ))}
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

                            {/* Location */}
                            <div className="space-y-3">
                                <h3 className="big-text-5 font-bold text-slate-900 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Location
                                </h3>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={filters.city}
                                        onChange={(e) => handleCityChange(e.target.value)}
                                        placeholder="Filter by city (e.g., Accra, Kumasi)"
                                        className="w-full h-10 pl-10 pr-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none transition-colors normal-text-2"
                                    />
                                </div>
                            </div>

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

export default EventFilters;