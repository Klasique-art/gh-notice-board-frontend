"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Video, Star, Users } from "lucide-react";
import { Event } from "@/types/events.types";
import { placeholderImage } from "@/data/constants";

interface EventDetailHeroProps {
    event: Event;
}

const EventDetailHero = ({ event }: EventDetailHeroProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
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

    const getEventTypeIcon = () => {
        switch (event.event_type) {
            case "virtual":
                return <Video className="w-4 h-4" />;
            case "hybrid":
                return (
                    <>
                        <MapPin className="w-4 h-4" />
                        <Video className="w-4 h-4" />
                    </>
                );
            default:
                return <MapPin className="w-4 h-4" />;
        }
    };

    const getEventTypeLabel = () => {
        switch (event.event_type) {
            case "virtual":
                return "Virtual Event";
            case "hybrid":
                return "Hybrid Event";
            default:
                return "In-Person Event";
        }
    };

    return (
        <section className="relative w-full bg-primary">
            {/* Featured Image with Overlay */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                    src={event.featured_image ?? placeholderImage}
                    alt={event.title}
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
                                {/* Category Badge */}
                                <Link
                                    href={`/events?category=${event.category.slug}`}
                                    className="px-3 py-1.5 rounded-lg text-white font-bold small-text transition-all duration-300 hover:scale-105"
                                    style={{ backgroundColor: event.category.color }}
                                >
                                    {event.category.name}
                                </Link>

                                {/* Event Type Badge */}
                                <span className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold small-text flex items-center gap-1.5">
                                    {getEventTypeIcon()}
                                    {getEventTypeLabel()}
                                </span>

                                {/* Featured Badge */}
                                {event.is_featured && (
                                    <span className="px-3 py-1.5 rounded-lg bg-secondary text-primary font-bold small-text flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5" />
                                        FEATURED
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="massive-text text-white leading-tight">
                                {event.title}
                            </h1>

                            {/* Summary */}
                            <p className="big-text-4 text-white/90 leading-relaxed">
                                {event.summary}
                            </p>

                            {/* Quick Event Info */}
                            <div className="flex flex-wrap items-center gap-4 text-white">
                                {/* Date */}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <div>
                                        <div className="normal-text font-semibold">
                                            {formatDate(event.start_date)}
                                        </div>
                                        <div className="small-text text-white/80">
                                            {formatTime(event.start_date)} - {formatTime(event.end_date)}
                                        </div>
                                    </div>
                                </div>

                                {/* Attendees */}
                                {event.registration_required && (
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        <div className="normal-text font-semibold">
                                            {event.registered_count} / {event.max_attendees || "∞"} registered
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Date Badge (Floating) */}
                <div className="absolute top-8 right-8 bg-white rounded-xl p-4 shadow-2xl">
                    <div className="text-center">
                        <div className="massive-text font-bold text-accent leading-none">
                            {new Date(event.start_date).getDate()}
                        </div>
                        <div className="normal-text text-slate-600 uppercase font-semibold">
                            {new Date(event.start_date).toLocaleDateString("en-GB", {
                                month: "short",
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetailHero;