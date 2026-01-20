import { AnalyticsOverview } from "@/types/analytics.types";
import {
    Eye,
    Heart,
    Share2,
    MessageCircle,
    Bookmark,
    Users,
    UserPlus,
    FileText,
    Briefcase,
} from "lucide-react";

interface AnalyticsOverviewCardsProps {
    overview: AnalyticsOverview;
}

const AnalyticsOverviewCards = ({ overview }: AnalyticsOverviewCardsProps) => {
    const stats = [
        {
            label: "Total Views",
            value: overview.total_views.toLocaleString(),
            icon: Eye,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            label: "Total Likes",
            value: overview.total_likes.toLocaleString(),
            icon: Heart,
            color: "text-accent",
            bgColor: "bg-accent/10",
        },
        {
            label: "Total Shares",
            value: overview.total_shares.toLocaleString(),
            icon: Share2,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            label: "Total Comments",
            value: overview.total_comments.toLocaleString(),
            icon: MessageCircle,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            label: "Bookmarks",
            value: overview.total_bookmarks.toLocaleString(),
            icon: Bookmark,
            color: "text-secondary",
            bgColor: "bg-secondary/20",
        },
        {
            label: "Followers",
            value: overview.total_followers.toLocaleString(),
            icon: Users,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            label: "Following",
            value: overview.total_following.toLocaleString(),
            icon: UserPlus,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            label: "Posts Created",
            value: overview.total_posts.toLocaleString(),
            icon: FileText,
            color: "text-slate-600",
            bgColor: "bg-slate-100",
        },
        {
            label: "Applications",
            value: overview.total_applications.toLocaleString(),
            icon: Briefcase,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                            >
                                <Icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                            </div>
                        </div>
                        <p className="big-text-3 font-bold text-slate-900 mb-1">
                            {stat.value}
                        </p>
                        <p className="small-text text-slate-600">{stat.label}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default AnalyticsOverviewCards;