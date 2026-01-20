import { Application } from "@/types/applications.types";
import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Calendar,
    Briefcase,
    Clock,
    ExternalLink,
    FileText,
    TrendingUp,
    CheckCircle,
    XCircle,
    AlertCircle,
    GraduationCap,
    DollarSign,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ApplicationCardProps {
    application: Application;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
    const opportunity = application.opportunity_details;

    // Status badge configuration
    const getStatusConfig = (status: string) => {
        switch (status) {
            case "draft":
                return {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                    icon: FileText,
                    label: "Draft",
                };
            case "submitted":
                return {
                    bg: "bg-blue-100",
                    text: "text-blue-700",
                    icon: Clock,
                    label: "Submitted",
                };
            case "under_review":
                return {
                    bg: "bg-blue-100",
                    text: "text-blue-700",
                    icon: Clock,
                    label: "Under Review",
                };
            case "shortlisted":
                return {
                    bg: "bg-purple-100",
                    text: "text-purple-700",
                    icon: TrendingUp,
                    label: "Shortlisted",
                };
            case "interview_scheduled":
                return {
                    bg: "bg-secondary/20",
                    text: "text-primary",
                    icon: Calendar,
                    label: "Interview Scheduled",
                };
            case "accepted":
                return {
                    bg: "bg-green-100",
                    text: "text-green-700",
                    icon: CheckCircle,
                    label: "Accepted",
                };
            case "rejected":
                return {
                    bg: "bg-red-100",
                    text: "text-red-700",
                    icon: XCircle,
                    label: "Rejected",
                };
            case "withdrawn":
                return {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                    icon: AlertCircle,
                    label: "Withdrawn",
                };
            default:
                return {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                    icon: FileText,
                    label: status,
                };
        }
    };

    const statusConfig = getStatusConfig(application.status);
    const StatusIcon = statusConfig.icon;

    // Opportunity type icon
    const getOpportunityIcon = (type: string) => {
        switch (type) {
            case "job":
            case "internship":
                return Briefcase;
            case "scholarship":
            case "fellowship":
                return GraduationCap;
            case "grant":
            case "funding":
                return DollarSign;
            default:
                return Briefcase;
        }
    };

    const OpportunityIcon = getOpportunityIcon(opportunity.opportunity_type);

    // Format dates
    const appliedDate = application.submitted_at
        ? formatDistanceToNow(new Date(application.submitted_at), {
            addSuffix: true,
        })
        : "Not submitted";

    const interviewDate = application.interview_date
        ? new Date(application.interview_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 hover:border-primary transition-all duration-300 hover:shadow-lg group">
            <div className="p-6">
                {/* Header Section */}
                <div className="flex items-start gap-4 mb-4">
                    {/* Company Logo */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-200 shrink-0">
                        {opportunity.organization_logo ? (
                            <Image
                                src={opportunity.organization_logo}
                                alt={opportunity.organization_name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                <OpportunityIcon className="w-8 h-8 text-primary" />
                            </div>
                        )}
                    </div>

                    {/* Title and Company */}
                    <div className="flex-1 min-w-0">
                        <Link
                            href={`/opportunities/${opportunity.slug}`}
                            className="block group/link"
                        >
                            <h3 className="big-text-4 font-bold text-slate-900 mb-1 group-hover/link:text-primary transition-colors line-clamp-2">
                                {opportunity.title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="normal-text font-semibold text-slate-700">
                                {opportunity.organization_name}
                            </p>
                            {opportunity.organization_verified && (
                                <span className="text-secondary text-sm" title="Verified">
                                    ✓
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div
                        className={`px-3 py-1.5 rounded-lg ${statusConfig.bg} flex items-center gap-2 shrink-0`}
                    >
                        <StatusIcon
                            className={`w-4 h-4 ${statusConfig.text}`}
                            aria-hidden="true"
                        />
                        <span className={`small-text font-semibold ${statusConfig.text}`}>
                            {statusConfig.label}
                        </span>
                    </div>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 small-text text-slate-600">
                    <div className="flex items-center gap-1.5">
                        <OpportunityIcon className="w-4 h-4" aria-hidden="true" />
                        <span>{opportunity.opportunity_type_display}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span>
                            {opportunity.is_remote ? "Remote" : opportunity.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        <span>Applied {appliedDate}</span>
                    </div>
                </div>

                {/* AI Match Score (if available) */}
                {application.ai_match_score && (
                    <div className="mb-4 p-3 bg-secondary/10 rounded-lg border-2 border-secondary/20">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
                            <span className="small-text font-semibold text-primary">
                                {Math.round(application.ai_match_score * 100)}% Match Score
                            </span>
                        </div>
                        {application.ai_match_reasons && (
                            <p className="small-text text-slate-700 line-clamp-2">
                                {application.ai_match_reasons}
                            </p>
                        )}
                    </div>
                )}

                {/* Interview Information (if scheduled) */}
                {application.interview_date && (
                    <div className="mb-4 p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar
                                className="w-4 h-4 text-purple-600"
                                aria-hidden="true"
                            />
                            <span className="small-text font-semibold text-purple-900">
                                Interview Scheduled
                            </span>
                        </div>
                        <p className="small-text text-purple-800">{interviewDate}</p>
                        {application.interview_location && (
                            <p className="small-text text-purple-700 mt-1">
                                📍 {application.interview_location}
                            </p>
                        )}
                    </div>
                )}

                {/* Reviewer Notes (if available) */}
                {application.reviewer_notes && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-blue-600" aria-hidden="true" />
                            <span className="small-text font-semibold text-blue-900">
                                Feedback
                            </span>
                        </div>
                        <p className="small-text text-blue-800">
                            {application.reviewer_notes}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t-2 border-slate-100">
                    <Link
                        href={`/opportunities/${opportunity.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium normal-text-2 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        View Opportunity
                    </Link>
                    <Link
                        href={`/dashboard/applications/${application.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-100 text-white rounded-lg font-medium normal-text-2 transition-colors"
                    >
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        View Application
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;