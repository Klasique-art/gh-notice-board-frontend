/* ===========================
   Event Type Discriminators
=========================== */

export type EventType = "in-person" | "virtual" | "hybrid";

/* ===========================
   Category
=========================== */

export type EventCategory = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon: string; // lucide-react icon name
    color: string; // hex color
};

/* ===========================
   Organizer
=========================== */

export type OrganizerProfile = {
    occupation?: string;
    company?: string;
    skills: string[];
    interests: string[];
    show_email: boolean;
    show_location: boolean;
    allow_messages: boolean;
    theme: "light" | "dark" | "auto";
    language: string;
    created_at: string;
    updated_at: string;
};

export type Organizer = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    display_name: string;
    bio?: string;
    location?: string;
    website?: string;
    twitter_username?: string;
    linkedin_url?: string;
    github_username?: string;
    avatar?: string | null;
    cover_image?: string | null;

    is_public: boolean;
    email_notifications: boolean;
    push_notifications: boolean;

    followers_count: number;
    following_count: number;
    posts_count: number;

    is_verified: boolean;
    verification_badge?: string;
    user_type: "individual" | "organization";

    created_at: string;
    updated_at: string;
    last_seen?: string;

    profile: OrganizerProfile;
};

/* ===========================
   Base Event
=========================== */

type BaseEvent = {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;

    start_date: string;
    end_date: string;

    featured_image?: string | null;

    organizer: Organizer;
    category: EventCategory;

    registration_required: boolean;
    max_attendees?: number;
    registered_count: number;

    price: number;
    currency: "GHS" | "USD" | "EUR";

    status: "draft" | "published" | "archived";
    is_featured: boolean;

    views_count: number;
    likes_count: number;

    created_at: string;
};

/* ===========================
   Event Variants (Discriminated Union)
=========================== */

export type InPersonEvent = BaseEvent & {
    event_type: "in-person";
    venue_name: string;
    venue_address: string;
    virtual_meeting_url?: "";
};

export type VirtualEvent = BaseEvent & {
    event_type: "virtual";
    venue_name: "Online" | "Online via Zoom" | "Virtual Event";
    venue_address: "Virtual Event";
    virtual_meeting_url: string;
};

export type HybridEvent = BaseEvent & {
    event_type: "hybrid";
    venue_name: string;
    venue_address: string;
    virtual_meeting_url: string;
};

/* ===========================
   Final Event Type
=========================== */

export type Event = InPersonEvent | VirtualEvent | HybridEvent;
