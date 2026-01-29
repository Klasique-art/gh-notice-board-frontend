import { Metadata } from "next";
import { MyEventsContent } from "@/components";
import { mockMyCreatedEventsResponse } from "@/data/mockMyEvents";

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
    // In production: Fetch user's events from API
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");

    // const params = await searchParams;
    // const events = await fetchMyEvents(params);

    const events = mockMyCreatedEventsResponse;

    return (
        <main className="dash-page">
            <MyEventsContent events={events} />
        </main>
    );
};

export default MyEventsPage;
