"use client";

import Link from "next/link";
import { ArrowRight, Eye, Heart } from "lucide-react";

const recentContent = [
    {
        id: "1",
        type: "news",
        title: "Ghana's Tech Sector Growth",
        status: "published",
        views: 1234,
        likes: 89,
        created_at: "2025-01-15T10:00:00Z",
    },
    {
        id: "2",
        type: "event",
        title: "Accra Tech Summit 2025",
        status: "published",
        views: 856,
        likes: 45,
        created_at: "2025-01-14T14:00:00Z",
    },
    {
        id: "3",
        type: "opportunity",
        title: "Senior Software Engineer Position",
        status: "pending_review",
        views: 0,
        likes: 0,
        created_at: "2025-01-13T09:00:00Z",
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

const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "published":
            return "bg-primary/10 text-primary border-primary/20";
        case "pending_review":
            return "bg-secondary/20 text-primary border-secondary";
        default:
            return "bg-slate-100 text-slate-700 border-slate-200";
    }
};

const DashboardRecentContent = () => {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-slate-200 shadow-md">
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
                    <h2 className="big-text-4 font-bold text-slate-900">Recent Content</h2>
                    <Link
                        href="/dashboard/my-content"
                        className="small-text font-semibold text-primary hover:text-primary-100 transition-colors flex items-center gap-1"
                    >
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentContent.map((content) => (
                        <div
                            key={content.id}
                            className="flex items-center justify-between p-3 rounded-lg border-2 border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all duration-300"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`px-2 py-0.5 rounded-md text-xs font-bold border ${getStatusColor(
                                            content.status
                                        )}`}
                                    >
                                        {content.status === "published"
                                            ? "Published"
                                            : "Pending Review"}
                                    </span>
                                    <span className="small-text-2 text-slate-500 capitalize">
                                        {content.type}
                                    </span>
                                </div>
                                <h3 className="normal-text-2 font-semibold text-slate-900 truncate">
                                    {content.title}
                                </h3>
                                <p className="small-text-2 text-slate-500 mt-1">
                                    {formatDate(content.created_at)}
                                </p>
                            </div>

                            {content.status === "published" && (
                                <div className="flex items-center gap-3 ml-4 text-slate-500 small-text-2">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-3.5 h-3.5" />
                                        {formatNumber(content.views)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-3.5 h-3.5" />
                                        {content.likes}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardRecentContent;