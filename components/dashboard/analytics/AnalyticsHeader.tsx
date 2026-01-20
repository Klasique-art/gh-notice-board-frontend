import { TrendingUp } from "lucide-react";

interface AnalyticsHeaderProps {
    period: "7days" | "30days" | "90days" | "year" | "all_time";
}

const AnalyticsHeader = ({ period }: AnalyticsHeaderProps) => {
    const periodLabels = {
        "7days": "Last 7 Days",
        "30days": "Last 30 Days",
        "90days": "Last 90 Days",
        year: "Last Year",
        all_time: "All Time",
    };

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-2 font-bold text-slate-900">Analytics</h1>
                    <p className="normal-text text-slate-600">
                        Your performance insights • {periodLabels[period]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsHeader;