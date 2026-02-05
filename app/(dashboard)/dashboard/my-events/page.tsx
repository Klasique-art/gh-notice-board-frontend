import { Metadata } from "next";
import { redirect } from "next/navigation";

import { MyEventsContent } from "@/components";
import { getCurrentUser } from "@/app/lib/auth";
import { getMyEvents } from "@/app/lib/events";
import { EventStatus } from "@/types/events.types";

export const metadata: Metadata = {
    title: "My Events | Ghana Notice Board",
    description:
        "Manage your events, track registrations, and create new events on Ghana Notice Board.",
    keywords: ["my events", "event management", "create event", "Ghana events"],
};

type SearchParams = Promise<{
    status?: string;
    search?: string;
    page?: string;
}>;

const MyEventsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    // Get current user
    const user = await getCurrentUser();

    // Redirect to login if not authenticated
    if (!user) {
        redirect("/login");
    }

    // Parse search params
    const params = await searchParams;
    const page = params.page ? parseInt(params.page) : 1;
    const status = params.status as EventStatus | undefined;
    const search = params.search;

    try {
        // Fetch user's events from API
        const events = await getMyEvents(user.id, {
            status,
            search,
            page,
            page_size: 12,
            ordering: '-created_at', // Most recent first
        });

        return (
            <main className="dash-page">
                <MyEventsContent events={events} />
            </main>
        );
    } catch (error) {
        console.error('Error fetching my events:', error);

        // Return empty state on error
        return (
            <main className="dash-page">
                <MyEventsContent
                    events={{
                        count: 0,
                        next: null,
                        previous: null,
                        results: []
                    }}
                />
            </main>
        );
    }
};

export default MyEventsPage;
