"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    MapPin,
    Clock,
    Eye,
    Heart,
    MessageCircle,
    Share2,
    Calendar,
    DollarSign,
    AlertCircle,
    Pin,
    Building2,
    Globe,
    Newspaper,
    Award,
    Users,
    Landmark,
    TrendingUp,
    BookOpen,
    Home,
    Lightbulb,
    Handshake,
    Bookmark,
    Loader2,
} from "lucide-react";
import { DiasporaPost } from "@/types/diaspora.types";
import { addBookmark, removeBookmark } from "@/app/lib/bookmarkInteractions";
import { useToast } from "@/components/ui/ToastProvider";

interface DiasporaCardProps {
    post: DiasporaPost;
    index?: number;
}

const DiasporaCard = ({ post, index = 0 }: DiasporaCardProps) => {
    const [isBookmarked, setIsBookmarked] = useState(post.user_bookmarked);
    const [isBookmarkPending, setIsBookmarkPending] = useState(false);
    const { showToast } = useToast();

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

    // Content type configuration with Ghana flag colors
    const typeConfig: Record<
        string,
        { icon: React.ReactNode; color: string; bg: string; label: string }
    > = {
        news: {
            icon: <Newspaper className="w-4 h-4" />,
            color: "#3B82F6",
            bg: "bg-blue-500",
            label: "News",
        },
        story: {
            icon: <Award className="w-4 h-4" />,
            color: "#10B981",
            bg: "bg-green-500",
            label: "Success Story",
        },
        interview: {
            icon: <Users className="w-4 h-4" />,
            color: "#8B5CF6",
            bg: "bg-purple-500",
            label: "Interview",
        },
        immigration: {
            icon: <Globe className="w-4 h-4" />,
            color: "#F59E0B",
            bg: "bg-amber-500",
            label: "Immigration",
        },
        embassy: {
            icon: <Landmark className="w-4 h-4" />,
            color: "#EF4444",
            bg: "bg-red-500",
            label: "Embassy",
        },
        community: {
            icon: <Users className="w-4 h-4" />,
            color: "#EC4899",
            bg: "bg-pink-500",
            label: "Community",
        },
        event: {
            icon: <Calendar className="w-4 h-4" />,
            color: "#6366F1",
            bg: "bg-indigo-500",
            label: "Event",
        },
        investment: {
            icon: <TrendingUp className="w-4 h-4" />,
            color: "#14B8A6",
            bg: "bg-teal-500",
            label: "Investment",
        },
        cultural: {
            icon: <BookOpen className="w-4 h-4" />,
            color: "#F97316",
            bg: "bg-orange-500",
            label: "Cultural",
        },
        homecoming: {
            icon: <Home className="w-4 h-4" />,
            color: "#06B6D4",
            bg: "bg-cyan-500",
            label: "Homecoming",
        },
        advice: {
            icon: <Lightbulb className="w-4 h-4" />,
            color: "#A855F7",
            bg: "bg-purple-500",
            label: "Advice",
        },
        partnership: {
            icon: <Handshake className="w-4 h-4" />,
            color: "#84CC16",
            bg: "bg-lime-500",
            label: "Partnership",
        },
    };

    const config = typeConfig[post.content_type] || typeConfig.news;

    // Calculate days until event/deadline
    const calculateDaysUntil = (date: string | null) => {
        if (!date) return null;
        return Math.ceil(
            (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
    };

    const eventDaysUntil = calculateDaysUntil(post.event_date);
    const deadlineDaysUntil = calculateDaysUntil(post.opportunity_deadline);

    const handleBookmark = async () => {
        if (isBookmarkPending) return;
        const nextBookmarked = !isBookmarked;
        setIsBookmarkPending(true);
        setIsBookmarked(nextBookmarked);

        try {
            const payload = { type: "diaspora" as const, object_id: post.id };
            if (nextBookmarked) {
                await addBookmark(payload);
                showToast({
                    title: "Saved",
                    description: "This item has been added to your bookmarks.",
                    tone: "success",
                });
            } else {
                await removeBookmark(payload);
                showToast({
                    title: "Removed",
                    description: "This item has been removed from your bookmarks.",
                    tone: "info",
                });
            }
        } catch (error) {
            setIsBookmarked(!nextBookmarked);
            showToast({
                title: "Bookmark update failed",
                description: error instanceof Error ? error.message : "Please try again.",
                tone: "error",
            });
        } finally {
            setIsBookmarkPending(false);
        }
    };

    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="group relative bg-white rounded-2xl border-2 border-slate-200 hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
            {/* Gradient Accent */}
            <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                    background: `linear-gradient(90deg, ${config.color}, ${config.color}dd)`,
                }}
            />

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Header: Organization Logo + Badges */}
                <div className="flex items-start gap-4">
                    {/* Organization Logo or Icon */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200 group-hover:border-primary/30 transition-colors">
                        {post.organization_logo ? (
                            <Image
                                src={post.organization_logo}
                                alt={post.organization_name || "Organization"}
                                fill
                                className="object-contain p-2"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-slate-400" />
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

                            {/* Urgent Badge */}
                            {post.is_urgent && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white small-text-2 font-bold shadow-md animate-pulse">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Urgent
                                </span>
                            )}

                            {/* Pinned Badge */}
                            {post.is_pinned && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-white small-text-2 font-bold shadow-md">
                                    <Pin className="w-3.5 h-3.5" />
                                    Pinned
                                </span>
                            )}

                            {/* Featured Badge */}
                            {post.is_featured && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-secondary to-secondary/80 text-primary small-text-2 font-bold shadow-md">
                                    <Award className="w-3.5 h-3.5" />
                                    Featured
                                </span>
                            )}

                            {/* Verified Organization */}
                            {post.organization_verified && (
                                <span
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary small-text-2 font-bold"
                                    title="Verified Organization"
                                >
                                    ✓ Verified
                                </span>
                            )}
                        </div>

                        {/* Event/Investment Dates */}
                        {post.is_event && eventDaysUntil && eventDaysUntil > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 small-text-2 font-semibold">
                                    <Calendar className="w-3 h-3" />
                                    {eventDaysUntil === 1
                                        ? "Tomorrow"
                                        : `In ${eventDaysUntil} days`}
                                </span>
                            </div>
                        )}

                        {post.is_investment_opportunity &&
                            deadlineDaysUntil &&
                            deadlineDaysUntil > 0 && (
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full small-text-2 font-semibold ${
                                            deadlineDaysUntil <= 7
                                                ? "bg-red-100 text-red-700"
                                                : deadlineDaysUntil <= 14
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        <Clock className="w-3 h-3" />
                                        {deadlineDaysUntil} days left
                                    </span>
                                </div>
                            )}
                    </div>
                </div>

                {/* Organization Name */}
                {post.organization_name && (
                    <div>
                        <p className="normal-text-2 text-slate-600 font-medium">
                            {post.organization_name}
                        </p>
                    </div>
                )}

                {/* Title */}
                <Link href={`/diaspora/${post.slug}`}>
                    <h3 className="big-text-4 font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                </Link>

                {/* Summary */}
                <p className="normal-text-2 text-slate-600 line-clamp-2">
                    {post.summary}
                </p>

                {/* Featured Image */}
                {post.featured_image && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-slate-600 small-text">
                        <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate">
                            {post.city || post.country}
                        </span>
                    </div>

                    {/* Region */}
                    <div className="flex items-center gap-2 text-slate-600 small-text">
                        <Globe className="w-4 h-4 shrink-0 text-slate-400" />
                        <span className="truncate">{post.region_display}</span>
                    </div>

                    {/* Investment Amount */}
                    {post.is_investment_opportunity &&
                        post.investment_amount && (
                            <div className="col-span-2 flex items-center gap-2">
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20">
                                    <DollarSign className="w-4 h-4 text-primary" />
                                    <span className="normal-text-2 font-bold text-slate-900">
                                        {post.investment_currency}{" "}
                                        {parseFloat(
                                            post.investment_amount
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}

                    {/* Diaspora Community */}
                    {post.diaspora_community && (
                        <div className="col-span-2 flex items-center gap-2 text-slate-600 small-text">
                            <Users className="w-4 h-4 shrink-0 text-slate-400" />
                            <span className="truncate">
                                {post.diaspora_community}
                            </span>
                        </div>
                    )}
                </div>

                {/* Footer: Stats & CTA */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-slate-500 small-text-2">
                        <span className="flex items-center gap-1" title="Views">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views_count.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1" title="Likes">
                            <Heart className="w-3.5 h-3.5" />
                            {post.likes_count.toLocaleString()}
                        </span>
                        <span
                            className="flex items-center gap-1"
                            title="Comments"
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            {post.comments_count.toLocaleString()}
                        </span>
                        <span
                            className="flex items-center gap-1"
                            title="Shares"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            {post.shares_count.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleBookmark}
                            disabled={isBookmarkPending}
                            className={`px-3 py-2 rounded-lg border-2 transition-all ${
                                isBookmarked
                                    ? "border-secondary bg-secondary/20 text-primary"
                                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                            aria-label="Bookmark diaspora item"
                            aria-pressed={isBookmarked}
                        >
                            {isBookmarkPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-secondary" : ""}`} />
                            )}
                        </button>
                        <Link
                            href={`/diaspora/${post.slug}`}
                            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold normal-text-2 transition-all shadow-md hover:shadow-lg"
                        >
                            Read More
                        </Link>
                    </div>
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

export default DiasporaCard;
