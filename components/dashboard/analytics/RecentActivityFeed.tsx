import { RecentActivity } from "@/types/analytics.types";
import {
    Eye,
    Heart,
    Share2,
    MessageCircle,
    Bookmark,
    FileText,
    Briefcase,
    Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityFeedProps {
    activities: RecentActivity[];
}

const RecentActivityFeed = ({ activities }: RecentActivityFeedProps) => {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case "view":
                return Eye;
            case "like":
                return Heart;
            case "share":
                return Share2;
            case "comment":
                return MessageCircle;
            case "bookmark":
                return Bookmark;
            case "post_created":
                return FileText;
            case "application":
                return Briefcase;
            default:
                return Clock;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case "view":
                return { icon: "text-blue-600", bg: "bg-blue-100" };
            case "like":
                return { icon: "text-accent", bg: "bg-accent/10" };
            case "share":
                return { icon: "text-primary", bg: "bg-primary/10" };
            case "comment":
                return { icon: "text-purple-600", bg: "bg-purple-100" };
            case "bookmark":
                return { icon: "text-secondary", bg: "bg-secondary/20" };
            case "post_created":
                return { icon: "text-green-600", bg: "bg-green-100" };
            case "application":
                return { icon: "text-primary", bg: "bg-primary/10" };
            default:
                return { icon: "text-slate-600", bg: "bg-slate-100" };
        }
    };

    const getContentTypeColor = (type: string) => {
        switch (type) {
            case "news":
                return "text-blue-600";
            case "events":
                return "text-purple-600";
            case "opportunities":
                return "text-primary";
            case "diaspora":
                return "text-secondary";
            default:
                return "text-slate-600";
        }
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-slate-900">
                    Recent Activity
                </h3>
            </div>

            <div className="space-y-4">
                {activities.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    const colors = getActivityColor(activity.type);
                    const relativeTime = formatDistanceToNow(
                        new Date(activity.created_at),
                        { addSuffix: true }
                    );

                    return (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            {/* Icon */}
                            <div
                                className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center shrink-0`}
                            >
                                <Icon className={`w-5 h-5 ${colors.icon}`} aria-hidden="true" />
                            </div>

                            {/* Activity Details */}
                            <div className="flex-1 min-w-0">
                                <p className="normal-text text-slate-900 mb-1">
                                    <span className="font-semibold">{activity.type_display}</span>{" "}
                                    <span className={`font-medium ${getContentTypeColor(activity.content_type)}`}>
                                        {activity.content_title}
                                    </span>
                                </p>

                                {activity.details && (
                                    <p className="small-text text-slate-600 mb-1 line-clamp-2">
                                        {activity.details}
                                    </p>
                                )}

                                <p className="small-text-2 text-slate-500">{relativeTime}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default RecentActivityFeed;