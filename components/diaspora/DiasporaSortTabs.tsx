"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Eye, Calendar } from "lucide-react";
import { DiasporaSortOption } from "@/types/diaspora.types";

interface DiasporaSortTabsProps {
    sortBy: DiasporaSortOption;
    onSortChange: (sort: DiasporaSortOption) => void;
}

const DiasporaSortTabs = ({ sortBy, onSortChange }: DiasporaSortTabsProps) => {
    const sortOptions: { value: DiasporaSortOption; label: string; icon: React.ReactNode }[] = [
        {
            value: "-published_at",
            label: "Latest",
            icon: <Clock className="w-4 h-4" />,
        },
        {
            value: "-views_count",
            label: "Most Viewed",
            icon: <Eye className="w-4 h-4" />,
        },
        {
            value: "-created_at",
            label: "Recently Added",
            icon: <Calendar className="w-4 h-4" />,
        },
    ];

    return (
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-2">
            <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onSortChange(option.value)}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all ${
                            sortBy === option.value
                                ? "text-white"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                    >
                        {sortBy === option.value && (
                            <motion.div
                                layoutId="activeSort"
                                className="absolute inset-0 bg-linear-to-r from-primary to-primary-100 rounded-lg"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {option.icon}
                            {option.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DiasporaSortTabs;