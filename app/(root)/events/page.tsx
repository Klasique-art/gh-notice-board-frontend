import { Metadata } from "next";
import Link from "next/link";
import { EventHero, EventPageContent } from "@/components";
import { getEvents } from "@/app/lib/events";
import { EventCategory } from "@/types/events.types";

export const metadata: Metadata = {
    title: "Upcoming Events | Ghana Notice Board",
    description: "Discover conferences, workshops, networking events, and cultural celebrations across Ghana and the diaspora. Find in-person, virtual, and hybrid events near you.",
    keywords: [
        "Ghana events",
        "Accra events",
        "Kumasi events",
        "Ghana conferences",
        "networking Ghana",
        "tech events Ghana",
        "cultural events Ghana",
        "business events Ghana",
        "Ghana workshops",
        "virtual events Ghana",
    ],
    openGraph: {
        title: "Upcoming Events | Ghana Notice Board",
        description: "Discover events and networking opportunities across Ghana",
        type: "website",
        locale: "en_GH",
    },
    twitter: {
        card: "summary_large_image",
        title: "Upcoming Events | Ghana Notice Board",
        description: "Discover events and networking opportunities across Ghana",
    },
};

const EventsPage = async () => {
    try {
        // Fetch initial events from backend
        const eventsData = await getEvents({
            ordering: 'start_date',
            page: 1,
        });

        const events = eventsData.results;

        // Extract unique categories
        const categories = events
            .filter(event => event.category !== null)
            .map(event => event.category!);

        const uniqueCategories: EventCategory[] = Array.from(
            new Map(categories.map(cat => [cat.slug, cat])).values()
        );

        return (
            <main className="min-h-screen bg-slate-50">
                <EventHero />
                <EventPageContent
                    initialEvents={events}
                    availableCategories={uniqueCategories}
                    totalCount={eventsData.count}
                />
            </main>
        );
    } catch (error) {
        console.error('Error loading events page:', error);

        return (
            <main className="min-h-screen bg-slate-50">
                <div className="inner-wrapper py-20 text-center">
                    <h1 className="big-text-1 font-bold text-slate-900 mb-4">
                        Unable to Load Events
                    </h1>
                    <p className="normal-text text-slate-600 mb-8">
                        We're having trouble loading events. Please try again later.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </main>
        );
    }
};

export default EventsPage;