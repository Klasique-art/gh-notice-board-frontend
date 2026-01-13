"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Users,
    Eye,
    Heart,
    Bookmark,
    Video,
    Star,
} from "lucide-react";
import { Event } from "@/types/events.types";

interface EventCardProps {
    event: Event;
    index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(date);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };

    const getEventTypeIcon = () => {
        switch (event.event_type) {
            case "virtual":
                return <Video className="w-3.5 h-3.5" />;
            case "hybrid":
                return (
                    <>
                        <MapPin className="w-3.5 h-3.5" />
                        <Video className="w-3.5 h-3.5" />
                    </>
                );
            default:
                return <MapPin className="w-3.5 h-3.5" />;
        }
    };

    const getEventTypeLabel = () => {
        switch (event.event_type) {
            case "virtual":
                return "Virtual";
            case "hybrid":
                return "Hybrid";
            default:
                return "In-Person";
        }
    };

    const isFree = event.price === 0;
    const spotsLeft = event.max_attendees
        ? event.max_attendees - event.registered_count
        : null;
    const isAlmostFull = spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 20;

    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="group relative bg-white rounded-xl border border-slate-200 hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                {event.is_featured && (
                    <span className="px-3 py-1 rounded-full bg-primary text-white small-text font-bold shadow-lg">
                        <Star className="w-3 h-3 inline mr-1" />
                        FEATURED
                    </span>
                )}
                {isFree && (
                    <span className="px-3 py-1 rounded-full bg-secondary text-primary small-text font-bold shadow-lg">
                        FREE
                    </span>
                )}
            </div>

            {/* Featured Image */}
            <Link
                href={`/events/${event.slug}`}
                className="block relative aspect-16/10 overflow-hidden bg-slate-100"
            >
                <Image
                    src={event.featured_image ?? "/placeholder-event.jpg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Date Badge */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-2 shadow-lg">
                    <div className="text-center">
                        <div className="big-text-4 font-bold text-accent leading-none">
                            {new Date(event.start_date).getDate()}
                        </div>
                        <div className="small-text-2 text-slate-600 uppercase">
                            {new Date(event.start_date).toLocaleDateString("en-GB", {
                                month: "short",
                            })}
                        </div>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-2 md:p-4 space-y-4">
                {/* Category & Event Type */}
                <div className="flex items-center justify-between gap-2">
                    <Link
                        href={`/events?category=${event.category.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white small-text-2 font-semibold transition-colors"
                        style={{ backgroundColor: event.category.color }}
                    >
                        {event.category.name}
                    </Link>
                    <div
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 small-text-2 font-medium"
                        title={getEventTypeLabel()}
                    >
                        {getEventTypeIcon()}
                    </div>
                </div>

                {/* Title */}
                <Link href={`/events/${event.slug}`}>
                    <h3 className="big-text-4 font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                    </h3>
                </Link>

                {/* Summary */}
                <p className="normal-text-2 text-slate-600 line-clamp-2">
                    {event.summary}
                </p>

                {/* Event Details */}
                <div className="space-y-2">
                    {/* Date & Time */}
                    <div className="flex items-start gap-2 text-slate-600 small-text">
                        <Calendar className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                            <div className="font-semibold text-slate-900">
                                {formatDate(event.start_date)}
                                {event.end_date &&
                                    formatDate(event.end_date) !== formatDate(event.start_date) &&
                                    ` - ${formatDate(event.end_date)}`}
                            </div>
                            <div className="small-text-2">
                                {formatTime(event.start_date)} - {formatTime(event.end_date)}
                            </div>
                        </div>
                    </div>

                    {/* Venue */}
                    {event.event_type !== "virtual" && event.venue_name && (
                        <div className="flex items-start gap-2 text-slate-600 small-text">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                            <div className="truncate">
                                <div className="font-semibold text-slate-900 truncate">
                                    {event.venue_name}
                                </div>
                                {event.venue_address && (
                                    <div className="small-text-2 truncate">{event.venue_address}</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Registration */}
                    {event.registration_required && (
                        <div className="flex items-center gap-2 text-slate-600 small-text">
                            <Users className="w-4 h-4 shrink-0" />
                            <div className="flex items-center gap-2">
                                <span>
                                    {event.registered_count} / {event.max_attendees || "∞"} registered
                                </span>
                                {isAlmostFull && (
                                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent small-text-2 font-bold">
                                        {spotsLeft} left!
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Price & Engagement */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    {/* Price */}
                    <div className="flex items-center gap-1">
                        {isFree ? (
                            <span className="big-text-5 font-bold text-secondary">FREE</span>
                        ) : (
                            <>
                                <span className="big-text-5 font-bold text-slate-900">
                                    {event.currency} {event.price.toFixed(2)}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-3 text-slate-500 small-text-2">
                        <span className="flex items-center gap-1" title="Views">
                            <Eye className="w-3.5 h-3.5" />
                            {formatNumber(event.views_count)}
                        </span>
                        <span className="flex items-center gap-1" title="Likes">
                            <Heart className="w-3.5 h-3.5" />
                            {formatNumber(event.likes_count)}
                        </span>
                    </div>
                </div>

                {/* Organizer */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        {event.organizer.avatar ? (
                            <Image
                                src={event.organizer.avatar}
                                alt={event.organizer.full_name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary text-white small-text font-bold">
                                {event.organizer.first_name[0]}
                                {event.organizer.last_name[0]}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="small-text-2 text-slate-600">Organized by</p>
                        <Link
                            href={`/profile/${event.organizer.username}`}
                            className="small-text font-semibold text-slate-900 truncate hover:text-primary transition-colors block"
                        >
                            {event.organizer.display_name}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Actions (Hover) */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <button
                    className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors"
                    title="Bookmark"
                >
                    <Bookmark className="w-4 h-4" />
                </button>
            </div>
        </motion.article>
    );
};

export default EventCard;