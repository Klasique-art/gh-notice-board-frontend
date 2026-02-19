"use client";

import Link from "next/link";
import { Calendar, Bookmark } from "lucide-react";

const DashboardQuickActions = () => {
    return (
        <div className="bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl p-4 border-2 border-slate-200 mb-8">
            <h2 className="big-text-5 font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

                <Link
                    href="/dashboard/my-events/create"
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white hover:bg-secondary/10 border-2 border-slate-200 hover:border-secondary transition-all duration-300 hover:scale-105 group"
                >
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 group-hover:bg-secondary flex items-center justify-center transition-colors">
                        <Calendar className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
                    </div>
                    <span className="small-text font-semibold text-slate-700 text-center">
                        Create Event
                    </span>
                </Link>

                <Link
                    href="/dashboard/saved-items"
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:scale-105 group"
                >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                        <Bookmark className="w-5 h-5 text-slate-600 transition-colors" />
                    </div>
                    <span className="small-text font-semibold text-slate-700 text-center">
                        Saved Items
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default DashboardQuickActions;
