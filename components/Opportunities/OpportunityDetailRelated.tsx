"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, Star } from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";
import { placeholderImage } from "@/data/constants";

interface OpportunityDetailRelatedProps {
    opportunities: Opportunity[];
}

const OpportunityDetailRelated = ({ opportunities }: OpportunityDetailRelatedProps) => {
    const formatDeadline = (dateString: string | null, daysLeft: number | null) => {
        if (!dateString || !daysLeft || daysLeft <= 0) return null;
        return `${daysLeft} days left`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
        >
            <div className="space-y-4">
                {/* Header */}
                <h3 className="big-text-5 font-bold text-slate-900">Related Opportunities</h3>

                {/* Opportunities List */}
                <div className="space-y-4">
                    {opportunities.map((opportunity, index) => (
                        <motion.article
                            key={opportunity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/opportunities/${opportunity.slug}`} className="block">
                                <div className="flex gap-3">
                                    {/* Thumbnail/Logo */}
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200 shrink-0">
                                        {opportunity.organization_logo || opportunity.featured_image ? (
                                            <Image
                                                src={
                                                    opportunity.organization_logo ||
                                                    opportunity.featured_image ||
                                                    placeholderImage
                                                }
                                                alt={opportunity.title}
                                                fill
                                                className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Briefcase className="w-8 h-8 text-slate-400" />
                                            </div>
                                        )}
                                        {opportunity.is_featured && (
                                            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                                                <Star className="w-3 h-3 text-primary" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="small-text font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                            {opportunity.title}
                                        </h4>
                                        <p className="small-text-2 text-slate-600 mt-1 truncate">
                                            {opportunity.organization_name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-slate-500 small-text-2">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{opportunity.city}</span>
                                        </div>
                                        {opportunity.deadline && opportunity.days_until_deadline !== null && (
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="w-3 h-3 text-slate-500" />
                                                <span
                                                    className={`small-text-2 font-semibold ${
                                                        opportunity.days_until_deadline <= 7
                                                            ? "text-accent"
                                                            : "text-slate-500"
                                                    }`}
                                                >
                                                    {formatDeadline(
                                                        opportunity.deadline,
                                                        opportunity.days_until_deadline
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {opportunity.show_salary && opportunity.salary_range && (
                                            <div className="flex items-center gap-1 mt-1 text-primary small-text-2 font-semibold">
                                                <DollarSign className="w-3 h-3" />
                                                {opportunity.salary_range}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Divider (except last item) */}
                                {index < opportunities.length - 1 && (
                                    <div className="mt-4 border-b border-slate-100" />
                                )}
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* View More Link */}
                <Link
                    href="/opportunities"
                    className="block w-full py-2.5 px-4 bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary text-center rounded-lg font-semibold small-text transition-all duration-300"
                >
                    View More Opportunities
                </Link>
            </div>
        </motion.div>
    );
};

export default OpportunityDetailRelated;