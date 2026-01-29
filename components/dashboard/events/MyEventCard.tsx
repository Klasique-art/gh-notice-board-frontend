import { Event } from "@/types/events.types";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar,
    MapPin,
    Users,
    Eye,
    Heart,
    ExternalLink,
    Edit,
    Video,
    DollarSign,
    Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface MyEventCardProps {
    event: Event;
}

const MyEventCard = ({ event }: MyEventCardProps) => {
    const getStatusBadge = (status: string) => {
        const configs = {
            draft: { bg: "bg-slate-100", text: "text-slate-700", label: "Draft" },
            pending_review: {
                bg: "bg-blue-100",
                text: "text-blue-700",
                label: "Pending Review",
            },
            published: {
                bg: "bg-green-100",
                text: "text-green-700",
                label: "Published",
            },
            cancelled: { bg: "bg-red-100", text: "text-red-700", label: "Cancelled" },
            postponed: {
                bg: "bg-secondary/20",
                text: "text-primary",
                label: "Postponed",
            },
            completed: {
                bg: "bg-slate-100",
                text: "text-slate-700",
                label: "Completed",
            },
        };
        return configs[status as keyof typeof configs] || configs.draft;
    };

    const statusBadge = getStatusBadge(event.status);

    const eventDate = new Date(event.start_date);
    const formattedDate = eventDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const formattedTime = eventDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const registrationPercentage = event.max_attendees
        ? (event.registered_count / event.max_attendees) * 100
        : 0;

    const getEventTypeIcon = () => {
        switch (event.event_type) {
            case "virtual":
                return (
                    <div className="flex items-center gap-1 small-text text-blue-600">
                        <Video className="w-4 h-4" aria-hidden="true" />
                        <span>Virtual</span>
                    </div>
                );
            case "hybrid":
                return (
                    <div className="flex items-center gap-1 small-text text-purple-600">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <Video className="w-4 h-4" aria-hidden="true" />
                        <span>Hybrid</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-1 small-text text-primary">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span>In-Person</span>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 hover:border-primary hover:shadow-lg transition-all duration-300">
            {/* Header Image */}
            <div className="relative h-48 rounded-t-xl overflow-hidden">
                <Image
                    src={
                        event.featured_image ||
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
                    }
                    alt={event.title}
                    fill
                    className="object-cover"
                />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <span
                        className={`px-3 py-1 rounded-full ${statusBadge.bg} ${statusBadge.text} small-text font-semibold`}
                    >
                        {statusBadge.label}
                    </span>
                </div>

                {/* Featured Badge */}
                {event.is_featured && (
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-secondary text-primary small-text font-semibold">
                            ⭐ Featured
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <div>
                    <Link
                        href={`/events/${event.slug}`}
                        className="block group/title mb-2"
                    >
                        <h3 className="big-text-4 font-bold text-slate-900 line-clamp-2 group-hover/title:text-primary transition-colors">
                            {event.title}
                        </h3>
                    </Link>
                    <p className="normal-text text-slate-600 line-clamp-2">
                        {event.summary}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 small-text text-slate-600">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <div>
                            <p className="font-semibold">{formattedDate}</p>
                            <p>{formattedTime}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 small-text text-slate-600">
                        {event.event_type === "virtual" ? (
                            <Video className="w-4 h-4" aria-hidden="true" />
                        ) : (
                            <MapPin className="w-4 h-4" aria-hidden="true" />
                        )}
                        <p className="line-clamp-2">{event.venue_name}</p>
                    </div>
                </div>

                {/* Event Type & Price */}
                <div className="flex items-center justify-between gap-3">
                    {getEventTypeIcon()}

                    {event.is_free ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full small-text font-semibold">
                            FREE
                        </span>
                    ) : (
                        <div className="flex items-center gap-1 small-text text-slate-700 font-semibold">
                            <DollarSign className="w-4 h-4" aria-hidden="true" />
                            <span>
                                GHS {event.price.toLocaleString()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Registration Stats */}
                <div>
                    <div className="flex items-center justify-between mb-2 small-text text-slate-600">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" aria-hidden="true" />
                            <span>
                                {event.registered_count} / {event.max_attendees || "∞"}{" "}
                                registered
                            </span>
                        </div>
                        {event.max_attendees && event.max_attendees > 0 && (
                            <span className="font-semibold">
                                {registrationPercentage.toFixed(0)}% full
                            </span>
                        )}
                    </div>

                    {event.max_attendees && event.max_attendees > 0 && (
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center gap-4 pt-3 border-t-2 border-slate-100 small-text text-slate-600">
                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        <span>{event.views_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-accent" aria-hidden="true" />
                        <span>{event.likes_count.toLocaleString()}</span>
                    </div>
                    {event.days_until_event && event.days_until_event > 0 && (
                        <div className="flex items-center gap-1 ml-auto">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            <span className="font-semibold">
                                {event.days_until_event} days to go
                            </span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t-2 border-slate-100">
                    <Link
                        href={`/events/${event.slug}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium normal-text-2 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        View Event
                    </Link>

                    <Link
                        href={`/dashboard/my-events/${event.id}/edit`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-100 text-white rounded-lg font-medium normal-text-2 transition-colors"
                    >
                        <Edit className="w-4 h-4" aria-hidden="true" />
                        Edit Event
                    </Link>
                </div>

                {/* Updated Time */}
                {event.updated_at && (
                    <p className="small-text-2 text-slate-500 text-center">
                        Updated {formatDistanceToNow(new Date(event.updated_at))} ago
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyEventCard;