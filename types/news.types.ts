// types/news.types.ts

/* ===========================
   User / Author Types
=========================== */

export type UserType = "regular" | "journalist" | "organization" | "government" | "verified";

export type UserProfile = {
    occupation: string;
    company: string;
    skills: string[];
    show_email: boolean;
    show_location: boolean;
    allow_messages: boolean;
    theme: "light" | "dark" | "auto";
    language: "en" | "tw" | "ga" | "ee";
    created_at: string;
    updated_at: string;
};

export type Author = {
    id: number;
    username: string;
    full_name: string;
    display_name: string;
    avatar: string | null;
    is_verified: boolean;
    verification_badge: string;
};

export type AuthorFull = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    display_name: string;
    bio: string;
    location: string;
    website: string;
    twitter_username: string;
    linkedin_url: string;
    github_username: string;
    avatar: string | null;
    cover_image: string | null;
    is_public: boolean;
    email_notifications: boolean;
    push_notifications: boolean;
    followers_count: number;
    following_count: number;
    posts_count: number;
    is_verified: boolean;
    verification_badge: string;
    user_type: UserType;
    created_at: string;
    updated_at: string;
    last_seen: string | null;
    profile: UserProfile;
};

/* ===========================
   Category & Tags
=========================== */

export type NewsCategory = {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    order: number;
    is_active: boolean;
    created_at: string;
};

export type NewsTag = {
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
   Article Status
=========================== */

export type NewsStatus = "draft" | "pending" | "published" | "archived" | "rejected";

/* ===========================
   News Image
=========================== */

export type NewsImage = {
    id: string;
    image: string;
    caption: string;
    credit: string;
    order: number;
    created_at: string;
};

/* ===========================
   Main News Article (List View)
=========================== */

export type NewsArticle = {
    id: string;
    title: string;
    slug: string;
    summary: string;
    featured_image: string | null;

    category: NewsCategory | null;
    tags: NewsTag[];
    author: Author;
    source: string;

    status: NewsStatus;
    is_breaking: boolean;
    is_featured: boolean;
    is_trending: boolean;

    views_count: number;
    likes_count: number;
    comments_count: number;
    shares_count: number;

    user_liked: boolean;
    user_bookmarked: boolean;
    reading_time: number; // in minutes
    is_new: boolean;

    published_at: string | null;
    created_at: string;
};

/* ===========================
   News Article Detail (Detail View)
=========================== */

export type NewsArticleDetail = NewsArticle & {
    content: string;
    meta_title: string;
    meta_description: string;
    keywords: string;
    image_caption: string;
    image_credit: string;
    location: string;
    source_url: string;

    is_exclusive: boolean;
    is_ai_generated: boolean;
    ai_summary: string;

    gallery_images: NewsImage[];
    published_by: Author | null;
    related_articles: NewsArticle[];

    allow_comments: boolean;
    require_comment_approval: boolean;

    updated_at: string;
    breaking_expires_at: string | null;
};

/* ===========================
   Paginated Response
=========================== */

export type PaginatedNewsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: NewsArticle[];
};

/* ===========================
   News Filters
=========================== */

export type NewsFilters = {
    search?: string;
    category?: string; // UUID
    category_slug?: string;
    tag?: string; // slug
    author?: string; // UUID
    status?: NewsStatus | 'all';
    is_featured?: boolean;
    is_breaking?: boolean;
    is_trending?: boolean;
    is_ai_generated?: boolean;
    date_from?: string; // YYYY-MM-DD
    date_to?: string; // YYYY-MM-DD
    ordering?: string; // e.g., '-published_at', '-views_count', '-likes_count'
    page?: number;
};