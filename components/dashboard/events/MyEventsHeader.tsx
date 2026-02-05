import { Calendar } from "lucide-react";
import { AppButton } from "@/components";

interface MyEventsHeaderProps {
    count: number;
}

const MyEventsHeader = ({ count }: MyEventsHeaderProps) => {
    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-2 font-bold text-slate-900">My Events</h1>
                    <p className="normal-text text-slate-600">
                        {count > 0
                            ? `You have created ${count} ${count === 1 ? "event" : "events"}`
                            : "You haven't created any events yet"}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                    <AppButton
                        variant="primary"
                        className="flex items-center gap-2"
                        title="Create Event"
                        url="/dashboard/my-events/create"
                    />
            </div>
        </div>
    );
};

export default MyEventsHeader;