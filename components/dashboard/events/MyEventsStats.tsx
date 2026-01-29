import { Event } from "@/types/events.types";
import {
    FileText,
    CheckCircle,
    Clock,
    Calendar,
    XCircle,
    Users,
} from "lucide-react";

interface MyEventsStatsProps {
    events: Event[];
}

const MyEventsStats = ({ events }: MyEventsStatsProps) => {
    // Calculate stats
    const totalEvents = events.length;
    const publishedEvents = events.filter((e) => e.status === "published").length;
    const draftEvents = events.filter((e) => e.status === "draft").length;
    const upcomingEvents = events.filter((e) => e.is_upcoming).length;
    const pastEvents = events.filter((e) => e.is_past).length;
    const totalRegistrations = events.reduce(
        (sum, e) => sum + e.registered_count,
        0
    );

    const stats = [
        {
            label: "Total Events",
            value: totalEvents,
            icon: Calendar,
            color: "text-slate-600",
            bgColor: "bg-slate-100",
        },
        {
            label: "Published",
            value: publishedEvents,
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            label: "Draft",
            value: draftEvents,
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            label: "Upcoming",
            value: upcomingEvents,
            icon: Clock,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            label: "Past Events",
            value: pastEvents,
            icon: XCircle,
            color: "text-slate-600",
            bgColor: "bg-slate-100",
        },
        {
            label: "Total Registrations",
            value: totalRegistrations,
            icon: Users,
            color: "text-secondary",
            bgColor: "bg-secondary/20",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div
                            className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}
                        >
                            <Icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                        </div>
                        <p className="big-text-3 font-bold text-slate-900 mb-1">
                            {stat.value.toLocaleString()}
                        </p>
                        <p className="small-text text-slate-600">{stat.label}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default MyEventsStats;