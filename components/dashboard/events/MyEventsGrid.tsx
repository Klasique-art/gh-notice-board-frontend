import { Event } from "@/types/events.types";
import { MyEventCard } from "@/components";

interface MyEventsGridProps {
    events: Event[];
}

const MyEventsGrid = ({ events }: MyEventsGridProps) => {
    if (events.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-slate-200">
                <p className="normal-text text-slate-600">
                    No events found matching your filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
                <MyEventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default MyEventsGrid;