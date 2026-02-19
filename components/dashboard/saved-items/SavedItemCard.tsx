"use client";

import { Bookmark } from "@/types/bookmarks.types";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    MapPin,
    Newspaper,
    Briefcase,
    Globe,
    Bell,
    Eye,
    Heart,
    Clock,
    Bookmark as BookmarkIcon,
    X,
    Video,
    MessageCircle,
    Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SavedItemCardProps {
    bookmark: Bookmark;
    onRemove: (bookmark: Bookmark) => Promise<void>;
    isRemoving?: boolean;
}

const SavedItemCard = ({ bookmark, onRemove, isRemoving = false }: SavedItemCardProps) => {
    const { content_type_name, created_at } = bookmark;

    // Get card details based on content type
    const getCardDetails = () => {
        switch (content_type_name) {
            case "event": {
                const event = bookmark.content_object;
                return {
                    title: event.title,
                    link: `/events/${event.slug}`,
                    image: event.featured_image,
                    icon: event.event_type === "virtual" ? Video : event.event_type === "hybrid" ? Calendar : MapPin,
                    iconColor: "text-primary",
                    bgColor: "bg-primary/10",
                    typeLabel: "Event",
                    typeBadgeColor: "bg-primary text-white",
                    meta: new Date(event.start_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    }),
                    metaIcon: Calendar,
                    summary: event.summary,
                    stats: {
                        views: event.views_count,
                        likes: event.likes_count,
                        comments: event.comments_count || 0,
                    },
                    badge: event.is_free ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full small-text font-semibold">
                            FREE
                        </span>
                    ) : (
                        <span className="small-text text-slate-700 font-semibold">
                            GHS {Number.parseFloat(event.price).toLocaleString()}
                        </span>
                    ),
                };
            }

            case "newsarticle": {
                const news = bookmark.content_object;
                return {
                    title: news.title,
                    link: `/news/${news.slug}`,
                    image: news.featured_image,
                    icon: Newspaper,
                    iconColor: "text-blue-600",
                    bgColor: "bg-blue-100",
                    typeLabel: "News",
                    typeBadgeColor: "bg-blue-600 text-white",
                    meta: new Date(news.published_at || news.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    }),
                    metaIcon: Calendar,
                    summary: news.summary,
                    stats: {
                        views: news.views_count,
                        likes: news.likes_count,
                        comments: news.comments_count,
                    },
                    badge: news.is_breaking && (
                        <span className="px-2 py-1 bg-accent text-white rounded-full small-text font-semibold">
                            🔴 Breaking
                        </span>
                    ),
                };
            }

            case "opportunity": {
                const opp = bookmark.content_object;
                const deadline = opp.deadline
                    ? new Date(opp.deadline).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                    })
                    : null;
                return {
                    title: opp.title,
                    link: `/opportunities/${opp.slug}`,
                    image: opp.organization_logo,
                    icon: Briefcase,
                    iconColor: "text-green-600",
                    bgColor: "bg-green-100",
                    typeLabel: opp.opportunity_type === "job" ? "Job" : opp.opportunity_type.charAt(0).toUpperCase() + opp.opportunity_type.slice(1),
                    typeBadgeColor: "bg-green-600 text-white",
                    meta: opp.location,
                    metaIcon: MapPin,
                    summary: opp.summary,
                    stats: {
                        views: opp.views_count,
                        likes: opp.likes_count,
                        comments: 0,
                    },
                    badge: deadline && (
                        <span className="px-2 py-1 bg-secondary/20 text-primary rounded-full small-text font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Deadline: {deadline}
                        </span>
                    ),
                };
            }

            case "diasporapost": {
                const diaspora = bookmark.content_object;
                return {
                    title: diaspora.title,
                    link: `/diaspora/${diaspora.slug}`,
                    image: diaspora.featured_image,
                    icon: Globe,
                    iconColor: "text-purple-600",
                    bgColor: "bg-purple-100",
                    typeLabel: "Diaspora",
                    typeBadgeColor: "bg-purple-600 text-white",
                    meta: `${diaspora.city}, ${diaspora.country}`,
                    metaIcon: MapPin,
                    summary: diaspora.summary,
                    stats: {
                        views: diaspora.views_count,
                        likes: diaspora.likes_count,
                        comments: diaspora.comments_count,
                    },
                    badge: diaspora.is_urgent && (
                        <span className="px-2 py-1 bg-accent/20 text-accent rounded-full small-text font-semibold">
                            Urgent
                        </span>
                    ),
                };
            }

            case "announcement": {
                const announcement = bookmark.content_object;
                const priority = announcement.priority;
                const priorityColors: Record<"low" | "medium" | "high" | "critical", string> = {
                    low: "bg-slate-100 text-slate-700",
                    medium: "bg-blue-100 text-blue-700",
                    high: "bg-secondary/20 text-primary",
                    critical: "bg-accent/20 text-accent",
                };
                return {
                    title: announcement.title,
                    link: `/announcements/${announcement.slug}`,
                    image: announcement.featured_image,
                    icon: Bell,
                    iconColor: "text-secondary",
                    bgColor: "bg-secondary/20",
                    typeLabel: "Announcement",
                    typeBadgeColor: "bg-secondary text-primary",
                    meta: new Date(announcement.published_at || announcement.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                    }),
                    metaIcon: Calendar,
                    summary: announcement.summary,
                    stats: {
                        views: announcement.views_count,
                        likes: announcement.likes_count,
                        comments: announcement.comments_count,
                    },
                    badge: (
                        <span className={`px-2 py-1 rounded-full small-text font-semibold ${priorityColors[priority]}`}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                        </span>
                    ),
                };
            }

            default:
                return null;
        }
    };

    const details = getCardDetails();
    if (!details) return null;

    const Icon = details.icon;
    const MetaIcon = details.metaIcon;

    const handleRemoveClick = async () => {
        await onRemove(bookmark);
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 hover:border-primary hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="p-4 border-b-2 border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${details.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${details.iconColor}`} aria-hidden="true" />
                    </div>
                    <span className={`px-3 py-1 rounded-full ${details.typeBadgeColor} small-text font-semibold`}>
                        {details.typeLabel}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={handleRemoveClick}
                    disabled={isRemoving}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Remove from saved items"
                >
                    {isRemoving ? (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-600" aria-hidden="true" />
                    ) : (
                        <X className="w-4 h-4 text-slate-600" aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Content */}
            <Link href={details.link} className="block">
                {/* Image */}
                {details.image && (
                    <div className="relative h-48 w-full">
                        <Image
                            src={details.image}
                            alt={details.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Body */}
                <div className="p-5 space-y-4">
                    {/* Title */}
                    <h3 className="big-text-4 font-bold text-slate-900 line-clamp-2 hover:text-primary transition-colors">
                        {details.title}
                    </h3>

                    {/* Summary */}
                    <p className="normal-text text-slate-600 line-clamp-2">
                        {details.summary}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-2 small-text text-slate-600">
                        <MetaIcon className="w-4 h-4" aria-hidden="true" />
                        <span>{details.meta}</span>
                    </div>

                    {/* Badge */}
                    {details.badge && <div>{details.badge}</div>}

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-3 border-t-2 border-slate-100 small-text text-slate-600">
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" aria-hidden="true" />
                            <span>{details.stats.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-accent" aria-hidden="true" />
                            <span>{details.stats.likes.toLocaleString()}</span>
                        </div>
                        {details.stats.comments > 0 && (
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                                <span>{details.stats.comments.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                            <BookmarkIcon className="w-4 h-4 text-secondary" aria-hidden="true" />
                            <span className="text-slate-500">
                                Saved {formatDistanceToNow(new Date(created_at))} ago
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SavedItemCard;
