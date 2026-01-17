"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    DollarSign,
    Briefcase,
    Users,
    Eye,
    Heart,
    Globe,
    Clock,
    Building2,
} from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";

interface OpportunityDetailMetaProps {
    opportunity: Opportunity;
}

const OpportunityDetailMeta = ({ opportunity }: OpportunityDetailMetaProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
        >
            <div className="space-y-6">
                {/* Organization Info */}
                <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200 shrink-0">
                        {opportunity.organization_logo ? (
                            <Image
                                src={opportunity.organization_logo}
                                alt={opportunity.organization_name}
                                fill
                                className="object-contain p-2"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-slate-400" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="big-text-5 font-bold text-slate-900">
                                {opportunity.organization_name}
                            </h3>
                            {opportunity.organization_verified && (
                                <span
                                    className="text-secondary"
                                    title="Verified Organization"
                                >
                                    ✓
                                </span>
                            )}
                        </div>
                        <p className="small-text text-slate-600">
                            Posted by {opportunity.posted_by.display_name}
                        </p>
                    </div>
                </div>

                {/* Opportunity Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="small-text-2 text-slate-500 mb-1">Location</p>
                            <p className="normal-text font-semibold text-slate-900">
                                {opportunity.location}
                            </p>
                            {opportunity.is_remote && (
                                <p className="small-text text-primary flex items-center gap-1 mt-1">
                                    <Globe className="w-3 h-3" />
                                    Remote work available
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Employment Type (for jobs) */}
                    {opportunity.employment_type && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="small-text-2 text-slate-500 mb-1">Employment Type</p>
                                <p className="normal-text font-semibold text-slate-900 capitalize">
                                    {opportunity.employment_type_display}
                                </p>
                                {opportunity.experience_level && (
                                    <p className="small-text text-slate-600 capitalize">
                                        {opportunity.experience_level_display}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Salary */}
                    {opportunity.show_salary && opportunity.salary_range && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <DollarSign className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="small-text-2 text-slate-500 mb-1">Salary Range</p>
                                <p className="normal-text font-semibold text-slate-900">
                                    {opportunity.salary_range}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Funding Amount (for scholarships/grants) */}
                    {opportunity.funding_amount && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <DollarSign className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="small-text-2 text-slate-500 mb-1">Funding</p>
                                <p className="normal-text font-semibold text-slate-900">
                                    {opportunity.funding_currency} {parseFloat(opportunity.funding_amount).toLocaleString()}
                                </p>
                                {opportunity.duration && (
                                    <p className="small-text text-slate-600">{opportunity.duration}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Deadline */}
                    {opportunity.deadline && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="small-text-2 text-slate-500 mb-1">Application Deadline</p>
                                <p className="normal-text font-semibold text-slate-900">
                                    {formatDate(opportunity.deadline)}
                                </p>
                                {opportunity.days_until_deadline !== null && opportunity.days_until_deadline > 0 && (
                                    <p className={`small-text font-semibold ${
                                        opportunity.days_until_deadline <= 7
                                            ? "text-accent"
                                            : "text-slate-600"
                                    }`}>
                                        <Clock className="w-3 h-3 inline mr-1" />
                                        {opportunity.days_until_deadline} days remaining
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Applications Count */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="small-text-2 text-slate-500 mb-1">Applications</p>
                            <p className="normal-text font-semibold text-slate-900">
                                {formatNumber(opportunity.applications_count)}
                            </p>
                        </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Eye className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="small-text-2 text-slate-500 mb-1">Views & Likes</p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4 text-slate-600" />
                                    <span className="small-text font-semibold text-slate-900">
                                        {formatNumber(opportunity.views_count)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4 text-slate-600" />
                                    <span className="small-text font-semibold text-slate-900">
                                        {formatNumber(opportunity.likes_count)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {opportunity.tags && opportunity.tags.length > 0 && (
                    <div className="pt-6 border-t border-slate-200">
                        <p className="small-text text-slate-600 mb-3">Skills & Keywords:</p>
                        <div className="flex flex-wrap gap-2">
                            {opportunity.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/opportunities?tag=${tag.slug}`}
                                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary small-text-2 font-medium transition-colors"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default OpportunityDetailMeta;