import { Metadata } from "next";
import { EventHero } from "@/components";
import {EventPageContent} from "@/components";
import { mockEvents } from "@/data/mockEvents";

// SEO Metadata
export const metadata: Metadata = {
  title: "Upcoming Events | Ghana Notice Board",
  description:
    "Discover conferences, workshops, networking events, and cultural celebrations across Ghana and the diaspora. Find in-person, virtual, and hybrid events near you.",
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

// Server Component - Fetches data and prepares props
const EventsPage = async () => {
  // In production, this would be an API call:
  // const events = await getEvents();
  const events = mockEvents;

  // Extract unique categories
  const categories = events.map((event) => event.category);
  const uniqueCategories = Array.from(
    new Map(categories.map((cat) => [cat.slug, cat])).values()
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section - Server Component */}
      <EventHero />

      {/* Interactive Content - Client Component */}
      <EventPageContent
        initialEvents={events}
        availableCategories={uniqueCategories}
      />
    </main>
  );
};

export default EventsPage;