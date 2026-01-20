import { GrowthMetrics } from "@/types/analytics.types";
import { TrendingUp, TrendingDown, Users, FileText, Eye, Heart } from "lucide-react";

interface GrowthMetricsCardsProps {
    metrics: GrowthMetrics;
}

const GrowthMetricsCards = ({ metrics }: GrowthMetricsCardsProps) => {
    const growthCards = [
        {
            label: "Followers Growth",
            value: metrics.followers_growth,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            label: "Posts Growth",
            value: metrics.posts_growth,
            icon: FileText,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            label: "Views Growth",
            value: metrics.views_growth,
            icon: Eye,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            label: "Engagement Growth",
            value: metrics.engagement_growth,
            icon: Heart,
            color: "text-accent",
            bgColor: "bg-accent/10",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {growthCards.map((card, index) => {
                const Icon = card.icon;
                const isPositive = card.value >= 0;
                const TrendIcon = isPositive ? TrendingUp : TrendingDown;

                return (
                    <div
                        key={index}
                        className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 ${card.color}`} aria-hidden="true" />
                            </div>
                            <div
                                className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                <TrendIcon className="w-4 h-4" aria-hidden="true" />
                                <span className="small-text font-semibold">
                                    {isPositive ? "+" : ""}
                                    {card.value.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                        <p className="small-text text-slate-600">{card.label}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default GrowthMetricsCards;