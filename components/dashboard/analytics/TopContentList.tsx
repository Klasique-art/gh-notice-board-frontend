import { TopContent } from "@/types/analytics.types";
import Link from "next/link";
import { Trophy, Eye, Heart, Share2, MessageCircle } from "lucide-react";

interface TopContentListProps {
    content: TopContent[];
}

const TopContentList = ({ content }: TopContentListProps) => {
    const getMedalColor = (index: number) => {
        if (index === 0) return "text-secondary"; // Gold
        if (index === 1) return "text-slate-400"; // Silver
        if (index === 2) return "text-amber-700"; // Bronze
        return "text-slate-600";
    };

    const getContentTypeColor = (type: string) => {
        switch (type) {
            case "news":
                return "bg-blue-100 text-blue-700";
            case "events":
                return "bg-purple-100 text-purple-700";
            case "opportunities":
                return "bg-primary/10 text-primary";
            case "diaspora":
                return "bg-secondary/20 text-primary";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-secondary" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-slate-900">
                    Top Performing Content
                </h3>
            </div>

            <div className="space-y-4">
                {content.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-lg border-2 border-slate-200 hover:border-primary transition-all hover:shadow-md"
                    >
                        {/* Rank */}
                        <div className="shrink-0">
                            <div
                                className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center ${getMedalColor(
                                    index
                                )}`}
                            >
                                <span className="big-text-5 font-bold">#{index + 1}</span>
                            </div>
                        </div>

                        {/* Content Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <Link
                                    href={`/${item.content_type}/${item.slug}`}
                                    className="flex-1 min-w-0 group"
                                >
                                    <h4 className="normal-text font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                </Link>
                                <span
                                    className={`px-2 py-1 rounded-full small-text-2 font-medium shrink-0 ${getContentTypeColor(
                                        item.content_type
                                    )}`}
                                >
                                    {item.content_type_display}
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-4 small-text text-slate-600">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" aria-hidden="true" />
                                    <span>{item.views_count.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4 text-accent" aria-hidden="true" />
                                    <span>{item.likes_count.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Share2 className="w-4 h-4 text-primary" aria-hidden="true" />
                                    <span>{item.shares_count.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle
                                        className="w-4 h-4 text-purple-600"
                                        aria-hidden="true"
                                    />
                                    <span>{item.comments_count.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Engagement Score */}
                        <div className="text-right shrink-0">
                            <p className="big-text-5 font-bold text-primary">
                                {item.engagement_score}
                            </p>
                            <p className="small-text-2 text-slate-600">Engagement</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopContentList;