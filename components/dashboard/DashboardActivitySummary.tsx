"use client";

import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { currentUser } from "@/data/dummy.general";

const DashboardActivitySummary = () => {
    const totalEngagement = 892; // In production: fetch from API

    return (
        <div className="mt-6 bg-linear-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border-2 border-slate-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="normal-text-2 font-bold text-slate-900">
                            Your community is growing!
                        </p>
                        <p className="small-text text-slate-600">
                            {currentUser.followers_count.toLocaleString()} followers •{" "}
                            {totalEngagement} total engagements this month
                        </p>
                    </div>
                </div>
                <Link
                    href="/dashboard/analytics"
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold small-text transition-all duration-300 hover:scale-105 shadow-md hidden sm:flex items-center gap-2"
                >
                    View Analytics
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default DashboardActivitySummary;