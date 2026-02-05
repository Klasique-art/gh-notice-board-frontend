import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    EventDetailHero,
    EventDetailMeta,
    EventDetailDescription,
    EventDetailOrganizer,
    EventDetailRegistration,
    EventDetailVenue,
    EventDetailShare,
    EventDetailRelated,
    EventDetailComments,
} from "@/components";
import { getEventBySlug, getEvents } from "@/app/lib/events";

// Type definition for params
type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all events
export async function generateStaticParams() {
    try {
        // Fetch all published events
        const eventsData = await getEvents({
            status: 'published',
            page: 1,
        });

        return eventsData.results.map((event) => ({
            slug: event.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const event = await getEventBySlug(slug);

        if (!event) {
            return {
                title: "Event Not Found | Ghana Notice Board",
            };
        }

        const eventDate = new Date(event.start_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        return {
            title: `${event.title} | Ghana Notice Board`,
            description: event.summary,
            keywords: [
                event.category?.name || 'Event',
                event.event_type,
                event.venue_name,
                "Ghana events",
                event.organizer.display_name,
            ],
            authors: [{ name: event.organizer.display_name }],
            openGraph: {
                title: event.title,
                description: `${event.summary} | ${eventDate}`,
                type: "website",
                images: event.featured_image
                    ? [
                        {
                            url: event.featured_image,
                            width: 1200,
                            height: 630,
                            alt: event.title,
                        },
                    ]
                    : [],
                locale: "en_GH",
            },
            twitter: {
                card: "summary_large_image",
                title: event.title,
                description: `${event.summary} | ${eventDate}`,
                images: event.featured_image ? [event.featured_image] : [],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: "Event Not Found | Ghana Notice Board",
        };
    }
}

// Server Component - Fetches data and assembles page
const EventDetailPage = async ({ params }: Props) => {
    const { slug } = await params;

    try {
        // Fetch event from backend
        const event = await getEventBySlug(slug);

        // Handle 404
        if (!event) {
            notFound();
        }

        // Related events are already included in the detail response
        const relatedEvents = event.related_events || [];

        return (
            <main className="min-h-screen bg-slate-50">
                {/* Hero Section with Featured Image */}
                <EventDetailHero event={event} />

                <div className="inner-wrapper py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Event Metadata */}
                            <EventDetailMeta event={event} />

                            {/* Registration Section */}
                            <EventDetailRegistration event={event} />

                            {/* Event Description */}
                            <EventDetailDescription event={event} />

                            {/* Venue/Location Section */}
                            <EventDetailVenue event={event} />

                            {/* Share Section */}
                            <EventDetailShare event={event} />

                            {/* Comments Section */}
                            <EventDetailComments eventId={event.id} />
                        </div>

                        {/* Sidebar Column */}
                        <aside className="lg:col-span-4 space-y-6">
                            {/* Organizer Card */}
                            <EventDetailOrganizer organizer={event.organizer} />

                            {/* Related Events */}
                            {relatedEvents.length > 0 && (
                                <EventDetailRelated events={relatedEvents} />
                            )}
                        </aside>
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error loading event:', error);
        notFound();
    }
};

export default EventDetailPage;