"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, DollarSign, Users, Eye, Heart, Video } from "lucide-react";
import { Event } from "@/types/events.types";

interface EventDetailMetaProps {
    event: Event;
}

const EventDetailMeta = ({ event }: EventDetailMetaProps) => {
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

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    const priceValue = parseFloat(event.price);
    const isFree = priceValue === 0;

    const spotsLeft = event.max_attendees
        ? event.max_attendees - event.registered_count
        : null;
    const isAlmostFull = spotsLeft !== null && spotsLeft <= 50 && spotsLeft > 0;
    const isFull = spotsLeft !== null && spotsLeft <= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="small-text-2 text-slate-500 mb-1">Date</p>
                        <p className="normal-text font-semibold text-slate-900">
                            {formatDate(event.start_date)}
                        </p>
                        {formatDate(event.end_date) !== formatDate(event.start_date) && (
                            <p className="small-text text-slate-600">
                                to {formatDate(event.end_date)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="small-text-2 text-slate-500 mb-1">Time</p>
                        <p className="normal-text font-semibold text-slate-900">
                            {formatTime(event.start_date)} - {formatTime(event.end_date)}
                        </p>
                        <p className="small-text text-slate-600">GMT (Africa/Accra)</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {event.event_type === "virtual" ? (
                            <Video className="w-5 h-5 text-primary" />
                        ) : (
                            <MapPin className="w-5 h-5 text-primary" />
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="small-text-2 text-slate-500 mb-1">Location</p>
                        <p className="normal-text font-semibold text-slate-900">
                            {event.venue_name}
                        </p>
                        {event.event_type !== "virtual" && event.venue_address && (
                            <p className="small-text text-slate-600">{event.venue_address}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="small-text-2 text-slate-500 mb-1">Price</p>
                        {isFree ? (
                            <p className="normal-text font-bold text-secondary">FREE</p>
                        ) : (
                            <p className="normal-text font-semibold text-slate-900">
                                {event.currency} {priceValue.toFixed(2)}
                            </p>
                        )}
                    </div>
                </div>

                {event.registration_required && (
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="small-text-2 text-slate-500 mb-1">Attendees</p>
                            <p className="normal-text font-semibold text-slate-900">
                                {event.registered_count} / {event.max_attendees || "8"} registered
                            </p>
                            {isAlmostFull && (
                                <p className="small-text text-accent font-semibold">
                                    Only {spotsLeft} spots left!
                                </p>
                            )}
                            {isFull && (
                                <p className="small-text text-accent font-semibold">Event Full</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="small-text-2 text-slate-500 mb-1">Engagement</p>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-slate-600" />
                                <span className="small-text font-semibold text-slate-900">
                                    {formatNumber(event.views_count)}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-slate-600" />
                                <span className="small-text font-semibold text-slate-900">
                                    {formatNumber(event.likes_count)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventDetailMeta;
