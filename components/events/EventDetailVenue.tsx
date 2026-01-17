"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Video } from "lucide-react";
import { Event } from "@/types/events.types";

interface EventDetailVenueProps {
    event: Event;
}

const EventDetailVenue = ({ event }: EventDetailVenueProps) => {
    const handleGetDirections = () => {
        // Open Google Maps with venue address
        const address = encodeURIComponent(
            `${event.venue_name}, ${event.venue_address}`
        );
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank");
    };

    const handleJoinVirtual = () => {
        if (event.virtual_meeting_url) {
            window.open(event.virtual_meeting_url, "_blank");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8"
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="big-text-3 font-bold text-slate-900 mb-2">
                        {event.event_type === "virtual" ? "Virtual Meeting" : "Location"}
                    </h2>
                    <div className="w-16 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
                </div>

                {/* Venue Details */}
                <div className="space-y-4">
                    {/* Venue Name */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            {event.event_type === "virtual" ? (
                                <Video className="w-5 h-5 text-primary" />
                            ) : (
                                <MapPin className="w-5 h-5 text-primary" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="big-text-5 font-bold text-slate-900">
                                {event.venue_name}
                            </h3>
                            {event.event_type !== "virtual" && event.venue_address && (
                                <p className="normal-text text-slate-600 mt-1">
                                    {event.venue_address}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {event.event_type !== "virtual" && (
                            <button
                                onClick={handleGetDirections}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold normal-text-2 transition-all duration-300 hover:scale-105"
                            >
                                <Navigation className="w-4 h-4" />
                                Get Directions
                            </button>
                        )}

                        {(event.event_type === "virtual" || event.event_type === "hybrid") &&
                            event.virtual_meeting_url && (
                                <button
                                    onClick={handleJoinVirtual}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary hover:bg-secondary/90 text-primary font-semibold normal-text-2 transition-all duration-300 hover:scale-105"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    {event.event_type === "virtual"
                                        ? "Join Virtual Event"
                                        : "Join Virtual Option"}
                                </button>
                            )}
                    </div>

                    {/* Map Placeholder */}
                    {event.event_type !== "virtual" && (
                        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200">
                            {/* Map placeholder - In production, integrate Google Maps or Mapbox */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                                    <p className="normal-text text-slate-600">
                                        Map view coming soon
                                    </p>
                                    <button
                                        onClick={handleGetDirections}
                                        className="mt-2 text-primary hover:text-primary-100 small-text font-semibold underline"
                                    >
                                        View on Google Maps
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hybrid Event Notice */}
                    {event.event_type === "hybrid" && (
                        <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                            <p className="small-text text-slate-700">
                                <span className="font-semibold">Hybrid Event:</span> Attend
                                in-person at {event.venue_name} or join virtually via the link above.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EventDetailVenue;