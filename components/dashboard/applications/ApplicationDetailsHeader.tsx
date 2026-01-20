import { Application } from "@/types/applications.types";
import { formatDistanceToNow } from "date-fns";
import {
    FileText,
    Clock,
    CheckCircle,
    Calendar,
    TrendingUp,
    XCircle,
    AlertCircle,
} from "lucide-react";

interface ApplicationDetailsHeaderProps {
    application: Application;
}

const ApplicationDetailsHeader = ({
    application,
}: ApplicationDetailsHeaderProps) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case "draft":
                return {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                    border: "border-slate-300",
                    icon: FileText,
                    label: "Draft",
                };
            case "submitted":
                return {
                    bg: "bg-blue-100",
                    text: "text-blue-700",
                    border: "border-blue-300",
                    icon: Clock,
                    label: "Submitted",
                };
            case "under_review":
                return {
                    bg: "bg-blue-100",
                    text: "text-blue-700",
                    border: "border-blue-300",
                    icon: Clock,
                    label: "Under Review",
                };
            case "shortlisted":
                return {
                    bg: "bg-purple-100",
                    text: "text-purple-700",
                    border: "border-purple-300",
                    icon: TrendingUp,
                    label: "Shortlisted",
                };
            case "interview_scheduled":
                return {
                    bg: "bg-secondary/20",
                    text: "text-primary",
                    border: "border-secondary",
                    icon: Calendar,
                    label: "Interview Scheduled",
                };
            case "accepted":
                return {
                    bg: "bg-green-100",
                    text: "text-green-700",
                    border: "border-green-300",
                    icon: CheckCircle,
                    label: "Accepted",
                };
            case "rejected":
                return {
                    bg: "bg-red-100",
                    text: "text-red-700",
                    border: "border-red-300",
                    icon: XCircle,
                    label: "Rejected",
                };
            case "withdrawn":
                return {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                    border: "border-slate-300",
                    icon: AlertCircle,
                    label: "Withdrawn",
                };
            default:
                return {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                    border: "border-slate-300",
                    icon: FileText,
                    label: status,
                };
        }
    };

    const statusConfig = getStatusConfig(application.status);
    const StatusIcon = statusConfig.icon;

    const appliedDate = application.submitted_at
        ? formatDistanceToNow(new Date(application.submitted_at), {
            addSuffix: true,
        })
        : "Not submitted";

    const createdDate = new Date(application.created_at).toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="big-text-2 font-bold text-slate-900">
                            Application #{application.id}
                        </h1>
                        <div
                            className={`px-4 py-2 rounded-lg ${statusConfig.bg} border-2 ${statusConfig.border} flex items-center gap-2`}
                        >
                            <StatusIcon
                                className={`w-5 h-5 ${statusConfig.text}`}
                                aria-hidden="true"
                            />
                            <span
                                className={`normal-text font-semibold ${statusConfig.text}`}
                            >
                                {statusConfig.label}
                            </span>
                        </div>
                    </div>

                    <h2 className="big-text-4 font-bold text-slate-900 mb-2">
                        {application.opportunity_details.title}
                    </h2>
                    <p className="normal-text text-slate-600 mb-4">
                        {application.opportunity_details.organization_name}
                        {application.opportunity_details.organization_verified && (
                            <span className="text-secondary ml-1" title="Verified">
                                ✓
                            </span>
                        )}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 small-text text-slate-600">
                        <div>
                            <strong>Applied:</strong> {appliedDate}
                        </div>
                        <div>
                            <strong>Created:</strong> {createdDate}
                        </div>
                        {application.reviewed_at && (
                            <div>
                                <strong>Reviewed:</strong>{" "}
                                {formatDistanceToNow(new Date(application.reviewed_at), {
                                    addSuffix: true,
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsHeader;