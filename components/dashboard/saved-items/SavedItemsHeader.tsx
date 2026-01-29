import { Bookmark, Calendar, Briefcase, Globe } from "lucide-react";
import { BookmarkStats } from "@/types/bookmarks.types";

interface SavedItemsHeaderProps {
    stats: BookmarkStats;
}

const SavedItemsHeader = ({ stats }: SavedItemsHeaderProps) => {
    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-2 font-bold text-slate-900">Saved Items</h1>
                    <p className="normal-text text-slate-600">
                        {stats.total > 0
                            ? `You have saved ${stats.total} ${stats.total === 1 ? "item" : "items"}`
                            : "You haven't saved any items yet"}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            {stats.total > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Bookmark className="w-5 h-5 text-secondary" aria-hidden="true" />
                            <span className="small-text text-slate-600">All Items</span>
                        </div>
                        <p className="big-text-3 font-bold text-slate-900">{stats.total}</p>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                            <span className="small-text text-slate-600">Events</span>
                        </div>
                        <p className="big-text-3 font-bold text-slate-900">{stats.events}</p>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Bookmark className="w-5 h-5 text-blue-600" aria-hidden="true" />
                            <span className="small-text text-slate-600">News</span>
                        </div>
                        <p className="big-text-3 font-bold text-slate-900">{stats.news}</p>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-5 h-5 text-green-600" aria-hidden="true" />
                            <span className="small-text text-slate-600">Jobs</span>
                        </div>
                        <p className="big-text-3 font-bold text-slate-900">{stats.opportunities}</p>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-5 h-5 text-purple-600" aria-hidden="true" />
                            <span className="small-text text-slate-600">Other</span>
                        </div>
                        <p className="big-text-3 font-bold text-slate-900">
                            {stats.diaspora + stats.announcements}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedItemsHeader;