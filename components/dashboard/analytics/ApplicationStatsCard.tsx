import { ApplicationAnalytics } from "@/types/analytics.types";
import { Briefcase, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

interface ApplicationStatsCardProps {
  analytics: ApplicationAnalytics;
}

const ApplicationStatsCard = ({ analytics }: ApplicationStatsCardProps) => {
  const statusBreakdown = [
    { label: "Draft", value: analytics.draft, color: "bg-slate-500" },
    { label: "Submitted", value: analytics.submitted, color: "bg-blue-500" },
    { label: "Under Review", value: analytics.under_review, color: "bg-blue-600" },
    { label: "Shortlisted", value: analytics.shortlisted, color: "bg-purple-500" },
    {
      label: "Interview",
      value: analytics.interview_scheduled,
      color: "bg-secondary",
    },
    { label: "Accepted", value: analytics.accepted, color: "bg-green-500" },
    { label: "Rejected", value: analytics.rejected, color: "bg-red-500" },
    { label: "Withdrawn", value: analytics.withdrawn, color: "bg-slate-400" },
  ].filter((item) => item.value > 0); // Only show statuses with values

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" aria-hidden="true" />
          <h3 className="big-text-4 font-bold text-slate-900">Applications</h3>
        </div>
        <Link
          href="/dashboard/applications"
          className="small-text text-primary hover:text-primary-100 font-medium"
        >
          View All →
        </Link>
      </div>

      {/* Total Applications */}
      <div className="text-center mb-6 p-4 bg-primary/5 rounded-lg">
        <p className="massive-text font-bold text-primary">
          {analytics.total_applications}
        </p>
        <p className="normal-text text-slate-600">Total Applications</p>
      </div>

      {/* Status Breakdown */}
      <div className="space-y-3 mb-6">
        {statusBreakdown.map((status, index) => {
          const percentage = (status.value / analytics.total_applications) * 100;
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="small-text text-slate-700">{status.label}</span>
                <span className="small-text font-semibold text-slate-900">
                  {status.value}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${status.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Metrics */}
      <div className="space-y-3 pt-4 border-t-2 border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle
              className="w-4 h-4 text-green-600"
              aria-hidden="true"
            />
            <span className="small-text text-slate-600">Acceptance Rate</span>
          </div>
          <span className="normal-text font-bold text-green-600">
            {analytics.acceptance_rate.toFixed(1)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span className="small-text text-slate-600">Avg. Response Time</span>
          </div>
          <span className="normal-text font-bold text-blue-600">
            {analytics.avg_response_time.toFixed(1)} days
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatsCard;