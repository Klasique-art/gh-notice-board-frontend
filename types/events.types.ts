// types/events.types.ts

/* ===========================
   User / Organizer Types
=========================== */

export type UserType = "regular" | "journalist" | "organization" | "government" | "verified";

export type Organizer = {
    id: string;  // ✅ Changed from number to string (UUID)
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
    description?: string;  // ✅ Optional in backend
    category?: number;  // ✅ Optional
    usage_count?: number;  // ✅ Optional
    is_trending?: boolean;  // ✅ This exists on tags
    created_at?: string;  // ✅ Optional
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
    is_recurring: boolean;  // ✅ Added from backend
    status: EventStatus;
    
    registration_required: boolean;
    registration_url: string;  // ✅ Added
    registration_deadline: string | null;  // ✅ Added
    max_attendees: number;
    registered_count: number;
    allow_waitlist: boolean;  // ✅ Added
    waitlist_count: number;  // ✅ Added
    
    views_count: number;
    likes_count: number;
    shares_count: number;
    bookmarks_count: number;  // ✅ Added
    comments_count: number;  // ✅ Added
    user_bookmarked?: boolean;
    
    price: string; // Decimal as string
    currency?: string; // compatibility with legacy UI usage
    is_free: boolean;  // ✅ Added
    
    created_at: string;
    updated_at: string;
    published_at: string | null;  // ✅ Added
    is_upcoming?: boolean;
    is_past?: boolean;
};

/* ===========================
   Event Detail
=========================== */

export type EventSpeaker = {
    id: string;  // ✅ Changed to string (UUID)
    event: string;  // ✅ Added - event UUID
    name: string;
    title: string;
    bio: string;
    photo: string | null;
    company: string;  // ✅ Added
    linkedin_url: string;
    twitter_username: string;
    website: string;  // ✅ Added
    order: number;
};

export type EventSponsor = {
    id: string;  // ✅ Changed to string (UUID)
    event: string;  // ✅ Added - event UUID
    name: string;
    logo: string | null;  // ✅ Can be null
    website_url: string;  // ✅ Changed field name
    description: string;
    sponsor_level: "platinum" | "gold" | "silver" | "bronze";  // ✅ Fixed levels
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
    id: string;  // ✅ Changed to string (UUID)
    event: string;  // ✅ Event UUID
    user: Organizer | null;  // ✅ Can be null for non-users
    first_name: string;  // ✅ Added
    last_name: string;  // ✅ Added
    email: string;  // ✅ Added
    phone: string;  // ✅ Added
    registration_type: 'attendee' | 'speaker' | 'sponsor' | 'volunteer';  // ✅ Added types
    status: 'confirmed' | 'waitlist' | 'cancelled';  // ✅ Added
    attended: boolean;  // ✅ Added
    additional_info: Record<string, unknown>;  // ✅ Added
    registered_at: string;  // ✅ Changed field name
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
    
    contact_email: string;
    contact_phone: string;
    website_url: string;
    
    speakers: EventSpeaker[];
    sponsors: EventSponsor[];
    gallery_images: EventImage[];  // ✅ If backend has this
    related_events: Event[];  // ✅ If backend has this
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
    category?: string;
    category_slug?: string;
    tag?: string;
    organizer?: string;
    status?: EventStatus;  // ✅ Removed 'all' - handle in UI
    event_type?: EventType;
    is_featured?: boolean;
    is_free?: boolean;  // ✅ Added
    is_virtual?: boolean;
    date_from?: string;
    date_to?: string;
    // Backward-compatible aliases used by existing frontend code
    start_date__gte?: string;
    start_date__lte?: string;
    location?: string;  // ✅ Added
    city?: string;
    region?: string;
    ordering?: string; // e.g., 'start_date', '-created_at'
    page?: number;
    page_size?: number;  // ✅ Added
};
