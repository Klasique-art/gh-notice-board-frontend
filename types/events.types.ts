// types/events.types.ts

/* ===========================
   User / Organizer Types
=========================== */

export type UserType = "regular" | "journalist" | "organization" | "government" | "verified";

export type Organizer = {
    id: number;
    username: string;
    full_name: string;
    display_name: string;
    avatar: string | null;
    is_verified: boolean;
    verification_badge: string;
};

/* ===========================
   Event Category
=========================== */

export type EventCategory = {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    is_active: boolean;
    order: number;
    events_count?: number;
    created_at: string;
    updated_at: string;
};

/* ===========================
   Tag
=========================== */

export type EventTag = {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: number;
    category_name: string;
    usage_count: number;
    is_active: boolean;
    created_at: string;
    is_subscribed: boolean;
};

/* ===========================
   Event Type & Status
=========================== */

export type EventType = "in-person" | "virtual" | "hybrid";

export type EventStatus =
    | "draft"
    | "pending_review"
    | "published"
    | "cancelled"
    | "postponed"
    | "completed";

/* ===========================
   Event (List View)
=========================== */

export type Event = {
    id: string;
    title: string;
    slug: string;
    summary: string;
    featured_image: string | null;
    
    category: EventCategory | null;
    tags: EventTag[];
    organizer: Organizer;
    
    venue_name: string;
    venue_address: string;
    
    event_type: EventType;
    start_date: string;
    end_date: string;
    timezone: string;
    
    is_featured: boolean;
    is_trending: boolean;
    status: EventStatus;
    
    registration_required: boolean;
    max_attendees: number;
    registered_count: number;
    
    views_count: number;
    likes_count: number;
    shares_count: number;
    
    user_registered: boolean;
    user_liked: boolean;
    user_bookmarked: boolean;
    
    is_upcoming: boolean;
    is_ongoing: boolean;
    is_past: boolean;
    days_until: number | null;
    
    price: string; // Decimal as string
    currency: string;
    early_bird_price: string | null;
    early_bird_deadline: string | null;
    
    created_at: string;
    updated_at: string;
};

/* ===========================
   Event Detail
=========================== */

export type EventSpeaker = {
    id: number;
    name: string;
    title: string;
    bio: string;
    photo: string | null;
    linkedin_url: string;
    twitter_username: string;
    website: string;
    order: number;
};

export type EventSponsor = {
    id: number;
    name: string;
    logo: string;
    website: string;
    description: string;
    sponsorship_level: "title" | "platinum" | "gold" | "silver" | "bronze" | "partner";
    order: number;
};

export type EventImage = {
    id: number;
    image: string;
    caption: string;
    is_cover: boolean;
    order: number;
    created_at: string;
};

export type EventRegistration = {
    id: number;
    user: Organizer;
    registration_type: string;
    ticket_number: string;
    attendance_status: string;
    checked_in_at: string | null;
    special_requirements: string;
    is_speaker: boolean;
    is_vip: boolean;
    created_at: string;
};

export type EventDetail = Event & {
    description: string;
    agenda: string;
    venue_details: string;
    venue_map_url: string;
    virtual_meeting_url: string;
    virtual_meeting_password: string;
    
    registration_instructions: string;
    cancellation_policy: string;
    covid_safety_measures: string;
    parking_info: string;
    accessibility_info: string;
    
    contact_email: string;
    contact_phone: string;
    website_url: string;
    facebook_event_url: string;
    livestream_url: string;
    
    speakers: EventSpeaker[];
    sponsors: EventSponsor[];
    gallery_images: EventImage[];
    registration_list: EventRegistration[];
    related_events: Event[];
    
    is_cancelled: boolean;
    cancellation_reason: string;
    allow_waitlist: boolean;
    waitlist_count: number;
    check_in_code: string;
    certificate_template: string;
};

/* ===========================
   Paginated Response
=========================== */

export type PaginatedEventsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Event[];
};

/* ===========================
   Event Filters
=========================== */

export type EventFilters = {
    search?: string;
    category?: string; // UUID
    category_slug?: string;
    tag?: string; // slug
    organizer?: string; // UUID
    status?: EventStatus | 'all';
    event_type?: EventType;
    is_featured?: boolean;
    is_trending?: boolean;
    is_upcoming?: boolean;
    start_date_from?: string; // YYYY-MM-DD
    start_date_to?: string; // YYYY-MM-DD
    ordering?: string; // e.g., 'start_date', '-start_date'
    page?: number;
};