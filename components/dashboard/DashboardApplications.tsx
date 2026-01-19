"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const recentApplications = [
    {
        id: "1",
        opportunity_title: "Full Stack Developer - Remote",
        organization: "TechGhana Solutions",
        applied_date: "2025-01-10T10:00:00Z",
        status: "Under Review",
    },
    {
        id: "2",
        opportunity_title: "Mastercard Foundation Scholarship",
        organization: "Mastercard Foundation",
        applied_date: "2025-01-08T15:00:00Z",
        status: "Application Submitted",
    },
];

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

const DashboardApplications = () => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-slate-200 shadow-md">
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
                    <h2 className="big-text-5 font-bold text-slate-900">Applications</h2>
                    <Link
                        href="/dashboard/applications"
                        className="small-text-2 font-semibold text-primary hover:text-primary-100 transition-colors flex items-center gap-1"
                    >
                        View All
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentApplications.map((app) => (
                        <div
                            key={app.id}
                            className="p-3 rounded-lg border-2 border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all duration-300"
                        >
                            <h3 className="small-text font-semibold text-slate-900 mb-1 line-clamp-2">
                                {app.opportunity_title}
                            </h3>
                            <p className="small-text-2 text-slate-600 mb-2">
                                {app.organization}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded-md bg-secondary/20 text-primary text-xs font-bold">
                                    {app.status}
                                </span>
                                <span className="small-text-2 text-slate-500">
                                    {formatDate(app.applied_date)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardApplications;