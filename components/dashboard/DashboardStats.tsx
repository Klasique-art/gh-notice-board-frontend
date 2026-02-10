import { FileText, Clock, Briefcase, Bookmark, Eye, TrendingUp } from "lucide-react";
import type { DashboardStatsData } from "@/app/lib/dashboard";

const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
};

type DashboardStatsProps = {
    stats: DashboardStatsData;
};

const DashboardStats = ({ stats }: DashboardStatsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {/* Published Content */}
            <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-4 border-2 border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="big-text-3 font-bold text-slate-900 mb-1">
                    {stats.published_content}
                </p>
                <p className="small-text text-slate-600">Published Content</p>
            </div>

            {/* Pending Review */}
            <div className="bg-linear-to-br from-secondary/5 to-secondary/10 rounded-xl p-4 border-2 border-secondary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                    </div>
                    {stats.pending_submissions > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary text-primary text-xs font-bold">
                            {stats.pending_submissions}
                        </span>
                    )}
                </div>
                <p className="big-text-3 font-bold text-slate-900 mb-1">
                    {stats.pending_submissions}
                </p>
                <p className="small-text text-slate-600">Pending Review</p>
            </div>

            {/* Applications */}
            <div className="bg-linear-to-br from-accent/5 to-accent/10 rounded-xl p-4 border-2 border-accent/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                </div>
                <p className="big-text-3 font-bold text-slate-900 mb-1">
                    {stats.active_applications}
                </p>
                <p className="small-text text-slate-600">Active Applications</p>
            </div>

            {/* Saved Items */}
            <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Bookmark className="w-5 h-5 text-white" />
                    </div>
                </div>
                <p className="big-text-3 font-bold text-slate-900 mb-1">
                    {stats.saved_items}
                </p>
                <p className="small-text text-slate-600">Saved Items</p>
            </div>

            {/* Total Views */}
            <div className="bg-linear-to-br from-primary/5 to-secondary/10 rounded-xl p-4 border-2 border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                    </div>
                </div>
                <p className="big-text-3 font-bold text-slate-900 mb-1">
                    {formatNumber(stats.total_views)}
                </p>
                <p className="small-text text-slate-600">Total Views</p>
            </div>
        </div>
    );
};

export default DashboardStats;
