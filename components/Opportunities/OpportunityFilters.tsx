"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Filter,
    X,
    Search,
    Briefcase,
    GraduationCap,
    DollarSign,
    Users,
    Globe,
    Home,
    Star,
    Award,
    Rocket,
    Heart,
    Lightbulb,
    Target,
} from "lucide-react";

export interface OpportunityFiltersState {
    search: string;
    opportunity_type: string[];
    category: string[];
    is_remote: boolean;
    is_diaspora: boolean;
    is_featured: boolean;
}

interface OpportunityFiltersProps {
    filters: OpportunityFiltersState;
    onFiltersChange: (filters: OpportunityFiltersState) => void;
    availableCategories: { slug: string; name: string; color: string }[];
}

const opportunityTypes = [
    { value: "job", label: "Jobs", icon: <Briefcase className="w-4 h-4" />, color: "#3B82F6" },
    { value: "scholarship", label: "Scholarships", icon: <GraduationCap className="w-4 h-4" />, color: "#10B981" },
    { value: "grant", label: "Grants", icon: <DollarSign className="w-4 h-4" />, color: "#8B5CF6" },
    { value: "internship", label: "Internships", icon: <Users className="w-4 h-4" />, color: "#F59E0B" },
    { value: "fellowship", label: "Fellowships", icon: <Award className="w-4 h-4" />, color: "#EC4899" },
    { value: "volunteer", label: "Volunteer", icon: <Heart className="w-4 h-4" />, color: "#EF4444" },
    { value: "business", label: "Business", icon: <Rocket className="w-4 h-4" />, color: "#6366F1" },
    { value: "funding", label: "Funding", icon: <DollarSign className="w-4 h-4" />, color: "#14B8A6" },
    { value: "mentorship", label: "Mentorship", icon: <Lightbulb className="w-4 h-4" />, color: "#F97316" },
    { value: "training", label: "Training", icon: <Target className="w-4 h-4" />, color: "#06B6D4" },
];

const OpportunityFilters = ({
    filters,
    onFiltersChange,
    availableCategories,
}: OpportunityFiltersProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchChange = (value: string) => {
        onFiltersChange({ ...filters, search: value });
    };

    const handleTypeToggle = (type: string) => {
        const newTypes = filters.opportunity_type.includes(type)
            ? filters.opportunity_type.filter((t) => t !== type)
            : [...filters.opportunity_type, type];
        onFiltersChange({ ...filters, opportunity_type: newTypes });
    };

    const handleCategoryToggle = (slug: string) => {
        const newCategories = filters.category.includes(slug)
            ? filters.category.filter((c) => c !== slug)
            : [...filters.category, slug];
        onFiltersChange({ ...filters, category: newCategories });
    };

    const toggleFilter = (key: "is_remote" | "is_diaspora" | "is_featured") => {
        onFiltersChange({ ...filters, [key]: !filters[key] });
    };

    const clearAllFilters = () => {
        onFiltersChange({
            search: "",
            opportunity_type: [],
            category: [],
            is_remote: false,
            is_diaspora: false,
            is_featured: false,
        });
    };

    const activeFilterCount =
        filters.opportunity_type.length +
        filters.category.length +
        (filters.is_remote ? 1 : 0) +
        (filters.is_diaspora ? 1 : 0) +
        (filters.is_featured ? 1 : 0);

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
                        placeholder="Search opportunities, organizations, locations..."
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
                                        onClick={() => toggleFilter("is_remote")}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                      ${filters.is_remote
                                                ? "bg-linear-to-r from-primary to-primary-100 text-white shadow-md"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }
                    `}
                                    >
                                        <Globe className="w-4 h-4" />
                                        Remote
                                    </button>
                                    <button
                                        onClick={() => toggleFilter("is_diaspora")}
                                        className={`
                      px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all flex items-center gap-2
                      ${filters.is_diaspora
                                                ? "bg-linear-to-r from-secondary to-secondary/80 text-primary shadow-md"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }
                    `}
                                    >
                                        <Globe className="w-4 h-4" />
                                        Diaspora
                                    </button>
                                </div>
                            </div>

                            {/* Opportunity Types */}
                            <div className="space-y-3">
                                <h3 className="big-text-5 font-bold text-slate-900">
                                    Opportunity Type
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                                    {opportunityTypes.map((type) => (
                                        <button
                                            key={type.value}
                                            onClick={() => handleTypeToggle(type.value)}
                                            className={`
                        px-3 py-2.5 rounded-lg font-semibold small-text transition-all flex items-center justify-center gap-2
                        ${filters.opportunity_type.includes(type.value)
                                                    ? "text-white shadow-md scale-105"
                                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                }
                      `}
                                            style={{
                                                backgroundColor: filters.opportunity_type.includes(type.value)
                                                    ? type.color
                                                    : undefined,
                                            }}
                                        >
                                            {type.icon}
                                            <span>{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            {availableCategories.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="big-text-5 font-bold text-slate-900">
                                        Categories
                                    </h3>
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
                            )}

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

export default OpportunityFilters;