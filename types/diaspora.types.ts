/* ===========================
   EXACT TYPES FROM DJANGO BACKEND
   Matches DiasporaPostListSerializer
=========================== */

import { User, Category, Tag } from "./opportunities.types";

// Content Type Choices (from models.py CONTENT_TYPE_CHOICES lines 13-26)
export type DiasporaContentType =
    | "news"
    | "story"
    | "interview"
    | "immigration"
    | "embassy"
    | "community"
    | "event"
    | "investment"
    | "cultural"
    | "homecoming"
    | "advice"
    | "partnership";

// Status Choices (from models.py STATUS_CHOICES lines 28-34)
export type DiasporaStatus =
    | "draft"
    | "pending_review"
    | "published"
    | "featured"
    | "archived";

// Region Choices (from models.py REGION_CHOICES lines 36-45)
export type DiasporaRegion =
    | "north-america"
    | "europe"
    | "asia"
    | "africa"
    | "south-america"
    | "oceania"
    | "middle-east"
    | "global";

/* ===========================
   MAIN DIASPORA POST TYPE
   Matches DiasporaPostListSerializer.Meta.fields (lines 45-58)
=========================== */

export interface DiasporaPost {
    // Core fields
    id: string; // UUID
    title: string;
    slug: string;
    summary: string;
    featured_image: string | null;

    // Content categorization
    content_type: DiasporaContentType;
    content_type_display: string; // Computed by backend
    category: Category | null;
    tags: Tag[];
    author: User;
    is_diaspora_author: boolean;

    // Location details
    region: DiasporaRegion;
    region_display: string; // Computed by backend
    country: string;
    city: string;
    diaspora_community: string;

    // Organization details
    organization_name: string;
    organization_logo: string | null;
    organization_verified: boolean;

    // Status and visibility
    is_featured: boolean;
    is_trending: boolean;
    is_urgent: boolean;
    is_pinned: boolean;

    // Engagement tracking
    views_count: number;
    likes_count: number;
    comments_count: number;
    shares_count: number;

    // User-specific engagement (requires authentication)
    user_liked: boolean;
    user_bookmarked: boolean;

    // Computed properties (from model @property decorators)
    is_active: boolean; // status in ['published', 'featured']
    is_event: boolean; // content_type == 'event' and has event_date
    is_upcoming_event: boolean; // is_event and event_date > now
    is_investment_opportunity: boolean; // content_type == 'investment' and has investment_amount

    // Event-specific fields
    event_date: string | null; // ISO datetime
    opportunity_deadline: string | null; // ISO datetime

    // Investment-specific fields
    investment_amount: string | null; // Decimal as string
    investment_currency: string;

    // Status and timestamps
    status: DiasporaStatus;
    created_at: string; // ISO datetime
    published_at: string | null; // ISO datetime
}

/* ===========================
   DETAIL SERIALIZER TYPE
   For single diaspora post view (DiasporaPostDetailSerializer)
=========================== */

export interface DiasporaPostDetail extends DiasporaPost {
    // Additional fields from DiasporaPostDetailSerializer (lines 92-102)
    content: string; // Full content with rich text
    organization_type: string;

    // Contact information
    contact_person: string;
    contact_email: string;
    contact_phone: string;
    whatsapp_number: string;
    website_url: string;
    social_media_links: Record<string, string>; // JSON field

    // Media
    featured_video_url: string;
    gallery_images: DiasporaImage[];

    // Engagement settings
    allow_comments: boolean;
    allow_sharing: boolean;
    requires_membership: boolean;

    // Additional event details
    event_location: string;
    event_registration_url: string;

    // Partnership details
    partnership_type: string;

    // AI features
    is_ai_translated: boolean;
    ai_translations: Record<string, string>; // JSON field
    ai_summary: string;
    ai_tags: string;

    // Related content
    related_posts: DiasporaPost[];
    from_same_organization: DiasporaPost[];

    // Timestamps
    updated_at: string; // ISO datetime
}

export interface DiasporaImage {
    id: string;
    image: string;
    caption: string;
    order: number;
    created_at: string;
}

/* ===========================
   FILTER PARAMETERS
   From views.py DiasporaPostViewSet (lines 16-19)
=========================== */

export interface DiasporaFilters {
    search?: string; // Searches title, content, country, organization_name
    content_type?: DiasporaContentType | DiasporaContentType[];
    category__slug?: string;
    country?: string;
    region?: DiasporaRegion;
    is_featured?: boolean;
    is_urgent?: boolean;
}

export type DiasporaSortOption =
    | "-published_at"
    | "published_at"
    | "-views_count"
    | "views_count"
    | "-created_at"
    | "created_at";

export type { User, Tag, Category } from "./opportunities.types";