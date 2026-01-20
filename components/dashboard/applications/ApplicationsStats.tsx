import { Application } from "@/types/applications.types";
import {
    FileText,
    Clock,
    CheckCircle,
    Calendar,
    TrendingUp,
} from "lucide-react";

interface ApplicationsStatsProps {
    applications: Application[];
}

const ApplicationsStats = ({ applications }: ApplicationsStatsProps) => {
    // Calculate statistics
    const stats = {
        total: applications.length,
        submitted: applications.filter((app) => app.status === "submitted").length,
        underReview: applications.filter((app) => app.status === "under_review")
            .length,
        shortlisted: applications.filter((app) => app.status === "shortlisted")
            .length,
        interviewScheduled: applications.filter(
            (app) => app.status === "interview_scheduled"
        ).length,
        accepted: applications.filter((app) => app.status === "accepted").length,
        rejected: applications.filter((app) => app.status === "rejected").length,
        draft: applications.filter((app) => app.status === "draft").length,
    };

    const statCards = [
        {
            label: "Total",
            value: stats.total,
            icon: FileText,
            color: "bg-slate-500/10 text-slate-700",
            iconColor: "text-slate-600",
        },
        {
            label: "In Review",
            value: stats.submitted + stats.underReview,
            icon: Clock,
            color: "bg-blue-500/10 text-blue-700",
            iconColor: "text-blue-600",
        },
        {
            label: "Shortlisted",
            value: stats.shortlisted + stats.interviewScheduled,
            icon: TrendingUp,
            color: "bg-secondary/20 text-primary",
            iconColor: "text-secondary",
        },
        {
            label: "Interviews",
            value: stats.interviewScheduled,
            icon: Calendar,
            color: "bg-purple-500/10 text-purple-700",
            iconColor: "text-purple-600",
        },
        {
            label: "Accepted",
            value: stats.accepted,
            icon: CheckCircle,
            color: "bg-green-500/10 text-green-700",
            iconColor: "text-green-600",
        },
        {
            label: "Draft",
            value: stats.draft,
            icon: FileText,
            color: "bg-slate-500/10 text-slate-700",
            iconColor: "text-slate-500",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className="bg-white rounded-xl border-2 border-slate-200 p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
                            >
                                <Icon
                                    className={`w-5 h-5 ${stat.iconColor}`}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="big-text-3 font-bold text-slate-900">
                                {stat.value}
                            </p>
                            <p className="small-text text-slate-600">{stat.label}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ApplicationsStats;