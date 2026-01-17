"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Video, Star } from "lucide-react";
import { Event } from "@/types/events.types";
import { placeholderImage } from "@/data/constants";

interface EventDetailRelatedProps {
    events: Event[];
}

const EventDetailRelated = ({ events }: EventDetailRelatedProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
        }).format(date);
    };

    const getEventTypeIcon = (eventType: Event["event_type"]) => {
        switch (eventType) {
            case "virtual":
                return <Video className="w-3 h-3" />;
            case "hybrid":
                return (
                    <>
                        <MapPin className="w-3 h-3" />
                        <Video className="w-3 h-3" />
                    </>
                );
            default:
                return <MapPin className="w-3 h-3" />;
        }
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
                <h3 className="big-text-5 font-bold text-slate-900">Related Events</h3>

                {/* Events List */}
                <div className="space-y-4">
                    {events.map((event, index) => (
                        <motion.article
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/events/${event.slug}`} className="block">
                                <div className="flex gap-3">
                                    {/* Thumbnail */}
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                        <Image
                                            src={event.featured_image ?? placeholderImage}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {event.is_featured && (
                                            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                                                <Star className="w-3 h-3 text-primary" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="small-text font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                            {event.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1 text-slate-500 small-text-2">
                                            <Calendar className="w-3 h-3" />
                                            <time dateTime={event.start_date}>
                                                {formatDate(event.start_date)}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1 text-slate-500 small-text-2">
                                            {getEventTypeIcon(event.event_type)}
                                            <span className="truncate">{event.venue_name}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider (except last item) */}
                                {index < events.length - 1 && (
                                    <div className="mt-4 border-b border-slate-100" />
                                )}
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* View More Link */}
                <Link
                    href="/events"
                    className="block w-full py-2.5 px-4 bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary text-center rounded-lg font-semibold small-text transition-all duration-300"
                >
                    View More Events
                </Link>
            </div>
        </motion.div>
    );
};

export default EventDetailRelated;