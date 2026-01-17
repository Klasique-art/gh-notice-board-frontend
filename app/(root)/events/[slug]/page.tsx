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
import { mockEvents } from "@/data/mockEvents";

// Type definition for params
type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all events
export async function generateStaticParams() {
    // In production, fetch all event slugs from API
    return mockEvents.map((event) => ({
        slug: event.slug,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Await params (Next.js 15+)
    const { slug } = await params;

    // In production, fetch event from API
    const event = mockEvents.find((e) => e.slug === slug);

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
            event.category.name,
            event.event_type,
            event.venue_name,
            "Ghana events",
            event.organizer.full_name,
        ],
        authors: [{ name: event.organizer.full_name }],
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
}

// Server Component - Fetches data and assembles page
const EventDetailPage = async ({ params }: Props) => {
    // Await params (Next.js 15+)
    const { slug } = await params;

    // In production, this would be an API call:
    // const event = await getEventBySlug(slug);
    const event = mockEvents.find((e) => e.slug === slug);

    // Handle 404
    if (!event) {
        notFound();
    }

    // Get related events (same category, exclude current)
    const relatedEvents = mockEvents
        .filter((e) => e.category.slug === event.category.slug && e.id !== event.id)
        .slice(0, 3);

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
};

export default EventDetailPage;