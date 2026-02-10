import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Video } from "lucide-react";

import { Section } from "@/components";
import { Event } from "@/types/events.types";

interface UpcomingEventsSectionProps {
    events: Event[];
}

const UpcomingEventsSection = ({ events }: UpcomingEventsSectionProps) => {
    const parsePrice = (value: string) => {
        const parsed = Number.parseFloat(value);
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    return (
        <Section
            title="Upcoming Events"
            subtitle="Connect with the community through events across Ghana"
            titleStyles="text-primary"
            subtitleStyles="text-slate-600"
            titleId="upcoming-events"
            ariaLabelledby="upcoming-events"
        >
            <div className="grid md:grid-cols-2 gap-4">
                {events.slice(0, 4).map((event) => (
                    <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="group flex gap-4 bg-white rounded-xl border-2 border-slate-200 hover:border-secondary transition-all overflow-hidden p-2 md:p-4"
                    >
                        {/* Image */}
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                            <Image
                                src={event.featured_image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Event Type Badge */}
                            {event.event_type === "virtual" && (
                                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-accent flex-center">
                                    <Video className="w-4 h-4 text-white" />
                                </div>
                            )}
                            {event.event_type === "hybrid" && (
                                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-secondary">
                                    <span className="small-text-2 text-primary font-bold">HYBRID</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {/* Date Badge */}
                            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary small-text font-semibold mb-2">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.start_date).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                })}
                            </div>

                            {/* Title */}
                            <h3 className="big-text-5 font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                {event.title}
                            </h3>

                            {/* Details */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-slate-600 small-text">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span className="line-clamp-1">{event.venue_name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 small-text">
                                    <Users className="w-3 h-3 shrink-0" />
                                    <span>
                                        {event.registered_count} / {event.max_attendees || "8"} registered
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            {parsePrice(event.price) > 0 ? (
                                <div className="mt-3 pt-3 border-t border-slate-200">
                                    <span className="normal-text font-bold text-primary">
                                        {new Intl.NumberFormat("en-GH", {
                                            style: "currency",
                                            currency: "GHS",
                                        }).format(parsePrice(event.price))}
                                    </span>
                                </div>
                            ) : (
                                <div className="mt-3 pt-3 border-t border-slate-200">
                                    <span className="normal-text font-bold text-secondary">FREE</span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white hover:bg-accent-100 transition-all group"
                >
                    <Calendar className="w-5 h-5" />
                    <span className="big-text-5 font-semibold">View All Events</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </Section>
    );
};

export default UpcomingEventsSection;
