import { Application } from "@/types/applications.types";
import { TrendingUp, Sparkles } from "lucide-react";

interface ApplicationAIMatchProps {
    application: Application;
}

const ApplicationAIMatch = ({ application }: ApplicationAIMatchProps) => {
    if (!application.ai_match_score) return null;

    const matchPercentage = Math.round(application.ai_match_score * 100);

    const getMatchLevel = (percentage: number) => {
        if (percentage >= 90) return { label: "Excellent Match", color: "green" };
        if (percentage >= 75) return { label: "Good Match", color: "blue" };
        if (percentage >= 60) return { label: "Fair Match", color: "yellow" };
        return { label: "Low Match", color: "red" };
    };

    const matchLevel = getMatchLevel(matchPercentage);

    return (
        <div className="bg-linear-to-br from-secondary/10 to-secondary/5 rounded-xl border-2 border-secondary/30 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-primary">AI Match Score</h3>
            </div>

            {/* Match Percentage */}
            <div className="text-center mb-4">
                <div className="relative inline-block">
                    <svg className="w-32 h-32 transform -rotate-90">
                        {/* Background Circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-slate-200"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - matchPercentage / 100)
                                }`}
                            className="text-primary transition-all duration-1000"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="big-text-1 font-bold text-primary">
                            {matchPercentage}%
                        </span>
                        <span className="small-text text-slate-600">{matchLevel.label}</span>
                    </div>
                </div>
            </div>

            {/* Match Reasons */}
            {application.ai_match_reasons && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <TrendingUp
                            className="w-4 h-4 text-primary"
                            aria-hidden="true"
                        />
                        <h4 className="normal-text font-semibold text-slate-900">
                            Why This Match?
                        </h4>
                    </div>
                    <p className="small-text text-slate-700 leading-relaxed">
                        {application.ai_match_reasons}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ApplicationAIMatch;