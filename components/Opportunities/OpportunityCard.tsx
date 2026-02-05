"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Briefcase,
    DollarSign,
    Users,
    MapPin,
    Clock,
    Eye,
    Globe,
    Zap,
} from "lucide-react";

import { typeConfig } from "@/data/opportunityConfig";
import { Opportunity } from "@/types/opportunities.types";

interface OpportunityCardProps {
    opportunity: Opportunity;
    index?: number;
}

const OpportunityCard = ({ opportunity, index = 0 }: OpportunityCardProps) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const config = typeConfig[opportunity.opportunity_type] || typeConfig.job;

    // Calculate days until deadline
    const daysUntilDeadline = opportunity.deadline
        ? Math.ceil(
            (new Date(opportunity.deadline).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
        : null;

    const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 7;
    const isExpiringSoon = daysUntilDeadline !== null && daysUntilDeadline <= 14;

    // Use backend's computed salary_range field (from OpportunityListSerializer)
    const salary = opportunity.show_salary && opportunity.salary_range
        ? opportunity.salary_range
        : null;

    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="group relative bg-white rounded-2xl border-2 border-slate-200 hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
            {/* linear Accent */}
            <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                    background: `linear-linear(90deg, ${config.color}, ${config.color}dd)`,
                }}
            />

            {/* Content */}
            <div className="p-2 md:p-4 space-y-4">
                {/* Header: Logo + Badges */}
                <div className="flex items-start gap-4">
                    {/* Organization Logo */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200 group-hover:border-primary/30 transition-colors">
                        {opportunity.organization_logo ? (
                            <Image
                                src={opportunity.organization_logo}
                                alt={opportunity.organization_name}
                                fill
                                className="object-contain p-2"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Briefcase className="w-8 h-8 text-slate-400" />
                            </div>
                        )}
                    </div>

                    {/* Badges */}
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap gap-2">
                            {/* Type Badge */}
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white small-text-2 font-bold shadow-md ${config.bg}`}
                            >
                                {config.icon}
                                {config.label}
                            </span>

                            {/* Remote Badge */}
                            {opportunity.is_remote && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-primary to-primary-100 text-white small-text-2 font-bold shadow-md">
                                    <Globe className="w-3.5 h-3.5" />
                                    Remote
                                </span>
                            )}

                            {/* Diaspora Badge */}
                            {opportunity.is_diaspora && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-secondary to-secondary/80 text-primary small-text-2 font-bold shadow-md">
                                    <Globe className="w-3.5 h-3.5" />
                                    Diaspora
                                </span>
                            )}
                        </div>

                        {/* Deadline Badge */}
                        {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full small-text-2 font-semibold ${isUrgent
                                        ? "bg-red-100 text-red-700"
                                        : isExpiringSoon
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    <Clock className="w-3 h-3" />
                                    {daysUntilDeadline === 1
                                        ? "Last day!"
                                        : `${daysUntilDeadline} days left`}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Organization Name */}
                <div>
                    <p className="normal-text-2 text-slate-600 font-medium">
                        {opportunity.organization_name}
                    </p>
                </div>

                {/* Title */}
                <Link href={`/opportunities/${opportunity.slug}`}>
                    <h3 className="big-text-4 font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {opportunity.title}
                    </h3>
                </Link>

                {/* Summary */}
                <p className="normal-text-2 text-slate-600 line-clamp-2">
                    {opportunity.summary}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-slate-600 small-text">
                        <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate">{opportunity.city}</span>
                    </div>

                    {/* Employment Type */}
                    {opportunity.employment_type && (
                        <div className="flex items-center gap-2 text-slate-600 small-text capitalize">
                            <Briefcase className="w-4 h-4 shrink-0 text-slate-400" />
                            <span className="truncate">
                                {opportunity.employment_type.replace("-", " ")}
                            </span>
                        </div>
                    )}

                    {/* Salary (if available) */}
                    {salary && (
                        <div className="col-span-2 flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20">
                                <DollarSign className="w-4 h-4 text-primary" />
                                <span className="normal-text-2 font-bold text-slate-900">
                                    {salary}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer: Stats & CTA */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-slate-500 small-text-2">
                        <span className="flex items-center gap-1" title="Views">
                            <Eye className="w-3.5 h-3.5" />
                            {opportunity.views_count.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1" title="Applications">
                            <Users className="w-3.5 h-3.5" />
                            {opportunity.applications_count.toLocaleString()}
                        </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={`/opportunities/${opportunity.slug}`}
                        className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold normal-text-2 transition-all shadow-md hover:shadow-lg flex items-center gap-2 group/btn"
                    >
                        <span>View Details</span>
                        <Zap className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Decorative Element */}
            <div
                className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: config.color }}
            />
        </motion.article>
    );
};

export default OpportunityCard;