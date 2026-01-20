import { Opportunity } from "@/types/opportunities.types";
import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Briefcase,
    Calendar,
    ExternalLink,
    DollarSign,
    GraduationCap,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ApplicationOpportunityCardProps {
    opportunity: Opportunity;
}

const ApplicationOpportunityCard = ({
    opportunity,
}: ApplicationOpportunityCardProps) => {
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

    const deadlineText = opportunity.deadline
        ? opportunity.days_until_deadline! > 0
            ? `${opportunity.days_until_deadline} days left`
            : "Deadline passed"
        : "No deadline";

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h3 className="big-text-4 font-bold text-slate-900">
                    Opportunity Details
                </h3>
                <Link
                    href={`/opportunities/${opportunity.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-100 text-white rounded-lg font-medium normal-text-2 transition-colors"
                >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    View Full Details
                </Link>
            </div>

            <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-200 shrink-0">
                    {opportunity.organization_logo ? (
                        <Image
                            src={opportunity.organization_logo}
                            alt={opportunity.organization_name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <OpportunityIcon className="w-10 h-10 text-primary" />
                        </div>
                    )}
                </div>

                {/* Opportunity Info */}
                <div className="flex-1 min-w-0">
                    <Link
                        href={`/opportunities/${opportunity.slug}`}
                        className="block group/link"
                    >
                        <h4 className="big-text-4 font-bold text-slate-900 mb-2 group-hover/link:text-primary transition-colors">
                            {opportunity.title}
                        </h4>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                        <p className="normal-text font-semibold text-slate-700">
                            {opportunity.organization_name}
                        </p>
                        {opportunity.organization_verified && (
                            <span className="text-secondary text-sm" title="Verified">
                                ✓
                            </span>
                        )}
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 small-text text-slate-600">
                            <OpportunityIcon className="w-4 h-4" aria-hidden="true" />
                            <span>{opportunity.opportunity_type_display}</span>
                        </div>

                        <div className="flex items-center gap-2 small-text text-slate-600">
                            <MapPin className="w-4 h-4" aria-hidden="true" />
                            <span>
                                {opportunity.is_remote ? "Remote" : opportunity.location}
                            </span>
                        </div>

                        {opportunity.employment_type && (
                            <div className="flex items-center gap-2 small-text text-slate-600">
                                <Briefcase className="w-4 h-4" aria-hidden="true" />
                                <span>{opportunity.employment_type_display}</span>
                            </div>
                        )}

                        {opportunity.deadline && (
                            <div className="flex items-center gap-2 small-text text-slate-600">
                                <Calendar className="w-4 h-4" aria-hidden="true" />
                                <span
                                    className={
                                        opportunity.days_until_deadline! <= 7
                                            ? "text-accent font-semibold"
                                            : ""
                                    }
                                >
                                    {deadlineText}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    {opportunity.summary && (
                        <p className="mt-4 normal-text text-slate-700 line-clamp-3">
                            {opportunity.summary}
                        </p>
                    )}

                    {/* Tags */}
                    {opportunity.tags && opportunity.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {opportunity.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag.id}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full small-text font-medium"
                                >
                                    {tag.name}
                                </span>
                            ))}
                            {opportunity.tags.length > 3 && (
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full small-text font-medium">
                                    +{opportunity.tags.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationOpportunityCard;