"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, Globe, Briefcase, Zap, Star, AlertCircle } from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";
import { placeholderImage } from "@/data/constants";
import { typeConfig } from "@/data/opportunityConfig";

interface OpportunityDetailHeroProps {
    opportunity: Opportunity;
}

const OpportunityDetailHero = ({ opportunity }: OpportunityDetailHeroProps) => {
    const config = typeConfig[opportunity.opportunity_type] || typeConfig.job;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const daysUntilDeadline = opportunity.days_until_deadline;
    const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 7;
    const isExpiringSoon = daysUntilDeadline !== null && daysUntilDeadline <= 14;

    return (
        <section className="relative w-full bg-primary">
            {/* Featured Image with Overlay */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                    src={opportunity.featured_image ?? placeholderImage}
                    alt={opportunity.title}
                    fill
                    priority
                    className="object-cover"
                />

                {/* Ghana Flag Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/80 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="inner-wrapper pb-8 md:pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl space-y-4"
                        >
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Type Badge */}
                                <span
                                    className="px-4 py-2 rounded-lg text-white font-bold normal-text-2 flex items-center gap-2 shadow-lg"
                                    style={{ backgroundColor: config.color }}
                                >
                                    {config.icon}
                                    {config.label}
                                </span>

                                {/* Category Badge */}
                                {opportunity.category && (
                                    <Link
                                        href={`/opportunities?category__slug=${opportunity.category.slug}`}
                                        className="px-3 py-1.5 rounded-lg text-white font-bold small-text transition-all duration-300 hover:scale-105"
                                        style={{ backgroundColor: opportunity.category.color }}
                                    >
                                        {opportunity.category.name}
                                    </Link>
                                )}

                                {/* Remote Badge */}
                                {opportunity.is_remote && (
                                    <span className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold small-text flex items-center gap-1.5">
                                        <Globe className="w-3.5 h-3.5" />
                                        Remote
                                    </span>
                                )}

                                {/* Diaspora Badge */}
                                {opportunity.is_diaspora && (
                                    <span className="px-3 py-1.5 rounded-lg bg-secondary text-primary font-bold small-text flex items-center gap-1.5">
                                        <Globe className="w-3.5 h-3.5" />
                                        Diaspora
                                    </span>
                                )}

                                {/* Featured Badge */}
                                {opportunity.is_featured && (
                                    <span className="px-3 py-1.5 rounded-lg bg-secondary text-primary font-bold small-text flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5" />
                                        FEATURED
                                    </span>
                                )}

                                {/* Urgent Badge */}
                                {isUrgent && (
                                    <span className="px-3 py-1.5 rounded-lg bg-accent text-white font-bold small-text flex items-center gap-1.5 animate-pulse">
                                        <Zap className="w-3.5 h-3.5" />
                                        URGENT
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="massive-text text-white leading-tight">
                                {opportunity.title}
                            </h1>

                            {/* Summary */}
                            <p className="big-text-4 text-white/90 leading-relaxed">
                                {opportunity.summary}
                            </p>

                            {/* Quick Info */}
                            <div className="flex flex-wrap items-center gap-4 text-white">
                                {/* Organization */}
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" />
                                    <span className="normal-text font-semibold">
                                        {opportunity.organization_name}
                                    </span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span className="normal-text font-semibold">
                                        {opportunity.location}
                                    </span>
                                </div>

                                {/* Deadline */}
                                {opportunity.deadline && daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span className={`normal-text font-semibold ${isUrgent ? "text-accent" : ""}`}>
                                            {daysUntilDeadline} days left
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Deadline Warning */}
                            {isUrgent && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/20 backdrop-blur-sm border border-accent text-white">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="normal-text font-semibold">
                                        Application deadline is approaching! Apply before{" "}
                                        {formatDate(opportunity.deadline!)}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Deadline Badge (Floating) */}
                {opportunity.deadline && daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                    <div
                        className={`absolute top-8 right-8 rounded-xl p-4 shadow-2xl ${isUrgent
                                ? "bg-accent text-white"
                                : isExpiringSoon
                                    ? "bg-secondary text-primary"
                                    : "bg-white text-slate-900"
                            }`}
                    >
                        <div className="text-center">
                            <div className="massive-text font-bold leading-none">
                                {daysUntilDeadline}
                            </div>
                            <div className="normal-text-2 uppercase font-semibold">
                                {daysUntilDeadline === 1 ? "Day Left" : "Days Left"}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OpportunityDetailHero;
