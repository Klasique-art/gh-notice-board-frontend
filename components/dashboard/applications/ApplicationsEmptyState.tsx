import { FileText, Search, Plus } from "lucide-react";
import { AppButton } from "@/components";

interface ApplicationsEmptyStateProps {
    hasFilters: boolean;
}

const ApplicationsEmptyState = ({ hasFilters }: ApplicationsEmptyStateProps) => {
    if (hasFilters) {
        // Show when filters are active but no results
        return (
            <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
                    <Search className="w-10 h-10 text-slate-400" aria-hidden="true" />
                </div>
                <h3 className="big-text-3 font-bold text-slate-900 mb-2">
                    No applications found
                </h3>
                <p className="normal-text text-slate-600 mb-6 max-w-md mx-auto">
                    No applications match your current filters. Try adjusting your search
                    criteria or clear all filters.
                </p>
                <AppButton
                    url="/dashboard/applications"
                    title="Clear Filters"
                    variant="secondary"
                    size="md"
                />
            </div>
        );
    }

    // Show when user has no applications at all
    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
            <h3 className="big-text-3 font-bold text-slate-900 mb-2">
                No applications yet
            </h3>
            <p className="normal-text text-slate-600 mb-6 max-w-md mx-auto">
                You haven&apos;t applied to any opportunities yet. Start exploring
                thousands of jobs, scholarships, and opportunities across Ghana and the
                diaspora.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
                <AppButton
                    url="/opportunities"
                    title="Browse Opportunities"
                    icon={<Plus className="w-5 h-5" />}
                    variant="primary"
                    size="lg"
                />
                <AppButton
                    url="/opportunities?type=job"
                    title="Find Jobs"
                    variant="ghost"
                    size="lg"
                />
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <div className="big-text-2 font-bold text-primary mb-1">5,000+</div>
                    <div className="small-text text-slate-600">Active Opportunities</div>
                </div>
                <div className="text-center">
                    <div className="big-text-2 font-bold text-primary mb-1">50+</div>
                    <div className="small-text text-slate-600">New Jobs Daily</div>
                </div>
                <div className="text-center">
                    <div className="big-text-2 font-bold text-primary mb-1">1,000+</div>
                    <div className="small-text text-slate-600">Scholarships Available</div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsEmptyState;