"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Clock,
    MapPin,
    Globe,
    Briefcase,
    Zap,
    Star,
    Calendar,
    Users,
    TrendingUp,
} from "lucide-react";
import { DiasporaPostDetail } from "@/types/diaspora.types";
import { placeholderImage } from "@/data/constants";

interface DiasporaDetailHeroProps {
    post: DiasporaPostDetail;
}

const DiasporaDetailHero = ({ post }: DiasporaDetailHeroProps) => {

    // Formatting helpers
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "event":
                return <Calendar className="w-3.5 h-3.5" />;
            case "investment":
                return <TrendingUp className="w-3.5 h-3.5" />;
            case "community":
                return <Users className="w-3.5 h-3.5" />;
            default:
                return <Globe className="w-3.5 h-3.5" />;
        }
    };

    return (
        <section className="relative w-full bg-primary">
            {/* Featured Image with Overlay */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                    src={post.featured_image ?? placeholderImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                />

                {/* Gradient Overlay */}
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
                                <span className="px-4 py-2 rounded-lg bg-teal-500 text-white font-bold normal-text-2 flex items-center gap-2 shadow-lg">
                                    {getTypeIcon(post.content_type)}
                                    {post.content_type_display || post.content_type}
                                </span>

                                {/* Category Badge */}
                                {post.category && (
                                    <span
                                        className="px-3 py-1.5 rounded-lg text-white font-bold small-text transition-all"
                                        style={{ backgroundColor: post.category.color }}
                                    >
                                        {post.category.name}
                                    </span>
                                )}

                                {/* Region Badge */}
                                <span className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold small-text flex items-center gap-1.5">
                                    <Globe className="w-3.5 h-3.5" />
                                    {post.region_display}
                                </span>

                                {/* Featured Badge */}
                                {post.is_featured && (
                                    <span className="px-3 py-1.5 rounded-lg bg-secondary text-primary font-bold small-text flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5" />
                                        FEATURED
                                    </span>
                                )}

                                {/* Urgent Badge */}
                                {post.is_urgent && (
                                    <span className="px-3 py-1.5 rounded-lg bg-accent text-white font-bold small-text flex items-center gap-1.5 animate-pulse">
                                        <Zap className="w-3.5 h-3.5" />
                                        URGENT
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="massive-text text-white leading-tight">
                                {post.title}
                            </h1>

                            {/* Summary */}
                            <p className="big-text-4 text-white/90 leading-relaxed">
                                {post.summary}
                            </p>

                            {/* Quick Info */}
                            <div className="flex flex-wrap items-center gap-4 text-white">
                                {/* Organization */}
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" />
                                    <span className="normal-text font-semibold">
                                        {post.organization_name || "Individual Post"}
                                    </span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span className="normal-text font-semibold">
                                        {[post.city, post.country].filter(Boolean).join(", ")}
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span className="normal-text font-semibold">
                                        Posted {formatDate(post.published_at || post.created_at)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiasporaDetailHero;
