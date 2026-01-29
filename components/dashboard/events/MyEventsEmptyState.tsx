import Link from "next/link";
import { Calendar, Plus, Ticket, TrendingUp } from "lucide-react";
import { AppButton } from "@/components";

const MyEventsEmptyState = () => {
    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto space-y-6">
                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Calendar className="w-10 h-10 text-primary" aria-hidden="true" />
                </div>

                {/* Message */}
                <div>
                    <h3 className="big-text-3 font-bold text-slate-900 mb-2">
                        No Events Yet
                    </h3>
                    <p className="normal-text text-slate-600">
                        You haven&apos;t created any events yet. Start organizing your first
                        event and connect with the community!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/dashboard/my-events/create">
                        <AppButton
                            variant="primary"
                            className="flex items-center gap-2 w-full sm:w-auto"
                        >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                            Create Your First Event
                        </AppButton>
                    </Link>

                    <Link href="/events">
                        <AppButton
                            variant="ghost"
                            className="flex items-center gap-2 w-full sm:w-auto"
                        >
                            <TrendingUp className="w-4 h-4" aria-hidden="true" />
                            Browse Events
                        </AppButton>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="pt-6 border-t-2 border-slate-100">
                    <p className="small-text text-slate-600 mb-4">
                        Get started with event management
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                                <span className="big-text-5 font-bold text-primary">500+</span>
                            </div>
                            <p className="small-text text-slate-600">Active Events</p>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Ticket className="w-5 h-5 text-secondary" aria-hidden="true" />
                                <span className="big-text-5 font-bold text-primary">
                                    10,000+
                                </span>
                            </div>
                            <p className="small-text text-slate-600">Attendees</p>
                        </div>
                    </div>
                </div>

                {/* View My Tickets Link */}
                <div className="pt-4">
                    <Link
                        href="/dashboard/my-tickets"
                        className="text-primary hover:text-primary-100 font-medium normal-text transition-colors inline-flex items-center gap-2"
                    >
                        <Ticket className="w-4 h-4" aria-hidden="true" />
                        View Events I&apos;m Attending
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyEventsEmptyState;