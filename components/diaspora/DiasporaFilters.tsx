"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    X,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Pin,
    Award,
    Newspaper,
    Users,
    Globe,
    Landmark,
    Calendar,
    TrendingUp,
    BookOpen,
    Home,
    Lightbulb,
    Handshake,
} from "lucide-react";
import { DiasporaContentType, DiasporaRegion } from "@/types/diaspora.types";

interface DiasporaFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    contentTypes: DiasporaContentType[];
    onContentTypesChange: (types: DiasporaContentType[]) => void;
    region: DiasporaRegion | "";
    onRegionChange: (region: DiasporaRegion | "") => void;
    isFeatured: boolean;
    onIsFeaturedChange: (value: boolean) => void;
    isUrgent: boolean;
    onIsUrgentChange: (value: boolean) => void;
    onClearFilters: () => void;
    activeFiltersCount: number;
}

const DiasporaFilters = ({
    search,
    onSearchChange,
    contentTypes,
    onContentTypesChange,
    region,
    onRegionChange,
    isFeatured,
    onIsFeaturedChange,
    isUrgent,
    onIsUrgentChange,
    onClearFilters,
    activeFiltersCount,
}: DiasporaFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Content type configuration (12 types)
    const contentTypeOptions: {
        value: DiasporaContentType;
        label: string;
        icon: React.ReactNode;
        color: string;
    }[] = [
        {
            value: "news",
            label: "News",
            icon: <Newspaper className="w-4 h-4" />,
            color: "bg-blue-500",
        },
        {
            value: "story",
            label: "Success Story",
            icon: <Award className="w-4 h-4" />,
            color: "bg-green-500",
        },
        {
            value: "interview",
            label: "Interview",
            icon: <Users className="w-4 h-4" />,
            color: "bg-purple-500",
        },
        {
            value: "immigration",
            label: "Immigration",
            icon: <Globe className="w-4 h-4" />,
            color: "bg-amber-500",
        },
        {
            value: "embassy",
            label: "Embassy",
            icon: <Landmark className="w-4 h-4" />,
            color: "bg-red-500",
        },
        {
            value: "community",
            label: "Community",
            icon: <Users className="w-4 h-4" />,
            color: "bg-pink-500",
        },
        {
            value: "event",
            label: "Event",
            icon: <Calendar className="w-4 h-4" />,
            color: "bg-indigo-500",
        },
        {
            value: "investment",
            label: "Investment",
            icon: <TrendingUp className="w-4 h-4" />,
            color: "bg-teal-500",
        },
        {
            value: "cultural",
            label: "Cultural",
            icon: <BookOpen className="w-4 h-4" />,
            color: "bg-orange-500",
        },
        {
            value: "homecoming",
            label: "Homecoming",
            icon: <Home className="w-4 h-4" />,
            color: "bg-cyan-500",
        },
        {
            value: "advice",
            label: "Advice",
            icon: <Lightbulb className="w-4 h-4" />,
            color: "bg-purple-500",
        },
        {
            value: "partnership",
            label: "Partnership",
            icon: <Handshake className="w-4 h-4" />,
            color: "bg-lime-500",
        },
    ];

    // Region options (8 regions)
    const regionOptions: { value: DiasporaRegion; label: string }[] = [
        { value: "north-america", label: "North America" },
        { value: "europe", label: "Europe" },
        { value: "asia", label: "Asia" },
        { value: "africa", label: "Africa" },
        { value: "south-america", label: "South America" },
        { value: "oceania", label: "Oceania" },
        { value: "middle-east", label: "Middle East" },
        { value: "global", label: "Global" },
    ];

    const handleContentTypeToggle = (type: DiasporaContentType) => {
        if (contentTypes.includes(type)) {
            onContentTypesChange(contentTypes.filter((t) => t !== type));
        } else {
            onContentTypesChange([...contentTypes, type]);
        }
    };

    return (
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search diaspora posts..."
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all normal-text"
                />
                {search && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onIsFeaturedChange(!isFeatured)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold small-text transition-all ${
                        isFeatured
                            ? "bg-linear-to-r from-secondary to-secondary/80 text-primary shadow-md"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                    <Award className="w-4 h-4" />
                    Featured
                </button>

                <button
                    onClick={() => onIsUrgentChange(!isUrgent)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold small-text transition-all ${
                        isUrgent
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                    <AlertCircle className="w-4 h-4" />
                    Urgent
                </button>

                {/* Active Filters Count */}
                {activeFiltersCount > 0 && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white font-semibold small-text hover:bg-accent-100 transition-colors shadow-md"
                    >
                        <X className="w-4 h-4" />
                        Clear All ({activeFiltersCount})
                    </button>
                )}
            </div>

            {/* Expandable Filters */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
                <span className="font-semibold normal-text text-slate-700">
                    Advanced Filters
                </span>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                )}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 overflow-hidden"
                    >
                        {/* Content Types */}
                        <div className="space-y-3">
                            <label className="block font-semibold normal-text text-slate-700">
                                Content Types
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                {contentTypeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            handleContentTypeToggle(
                                                option.value
                                            )
                                        }
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium small-text transition-all ${
                                            contentTypes.includes(option.value)
                                                ? `${option.color} text-white shadow-md`
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        {option.icon}
                                        <span className="truncate">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Region Filter */}
                        <div className="space-y-3">
                            <label className="block font-semibold normal-text text-slate-700">
                                Region
                            </label>
                            <select
                                value={region}
                                onChange={(e) =>
                                    onRegionChange(
                                        e.target.value as
                                            | DiasporaRegion
                                            | ""
                                    )
                                }
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all normal-text bg-white"
                            >
                                <option value="">All Regions</option>
                                {regionOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DiasporaFilters;