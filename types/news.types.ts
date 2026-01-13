/* ===========================
   User / Author Types
=========================== */

export type UserType =
    | "journalist"
    | "organization"
    | "individual"
    | "admin";

export type UserProfile = {
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

export type Author = {
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

    user_type: UserType;

    created_at: string;
    updated_at: string;
    last_seen?: string;

    profile: UserProfile;
};

/* ===========================
   Category & Tags
=========================== */

export type NewsCategory = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon: string;
    color: string;
};

export type NewsTag = {
    id: number;
    name: string;
    slug: string;
};

/* ===========================
   Article Status
=========================== */

export type NewsStatus =
    | "draft"
    | "published"
    | "archived";

/* ===========================
   Main News Article
=========================== */

export type NewsArticle = {
    id: string;

    title: string;
    slug: string;
    summary: string;
    content: string;

    featured_image?: string | null;
    image_caption?: string;

    author: Author;
    category: NewsCategory;
    tags: NewsTag[];

    status: NewsStatus;

    is_breaking: boolean;
    is_featured: boolean;
    is_trending: boolean;

    views_count: number;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    bookmarks_count: number;

    published_at?: string | null;
    created_at: string;
    updated_at: string;
};
