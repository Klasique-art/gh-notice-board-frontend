"use client";

import { motion } from "framer-motion";
import { Clock, Eye, Calendar, TrendingUp, Zap } from "lucide-react";

export type SortOption =
    | "-published_at"
    | "deadline"
    | "-deadline"
    | "-views_count"
    | "-created_at";

interface SortTabOption {
    value: SortOption;
    label: string;
    icon: React.ReactNode;
}

interface OpportunitySortTabsProps {
    activeSort: SortOption;
    onSortChange: (sort: SortOption) => void;
}

const sortOptions: SortTabOption[] = [
    {
        value: "-published_at",
        label: "Latest",
        icon: <Zap className="w-4 h-4" />,
    },
    {
        value: "deadline",
        label: "Deadline: Soonest",
        icon: <Clock className="w-4 h-4" />,
    },
    {
        value: "-deadline",
        label: "Deadline: Latest",
        icon: <Calendar className="w-4 h-4" />,
    },
    {
        value: "-views_count",
        label: "Most Viewed",
        icon: <Eye className="w-4 h-4" />,
    },
    {
        value: "-created_at",
        label: "Recently Added",
        icon: <TrendingUp className="w-4 h-4" />,
    },
];

const OpportunitySortTabs = ({
    activeSort,
    onSortChange,
}: OpportunitySortTabsProps) => {
    return (
        <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max px-2 py-1">
                {sortOptions.map((option) => {
                    const isActive = activeSort === option.value;

                    return (
                        <button
                            key={option.value}
                            onClick={() => onSortChange(option.value)}
                            className={`
                relative px-4 py-2.5 rounded-lg font-semibold normal-text transition-all duration-300
                flex items-center gap-2 whitespace-nowrap
                ${isActive
                                    ? "text-primary bg-primary/10 shadow-sm"
                                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                                }
              `}
                        >
                            {option.icon}
                            <span>{option.label}</span>

                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeOpportunityTab"
                                    className="absolute inset-0 border-2 border-primary rounded-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default OpportunitySortTabs;