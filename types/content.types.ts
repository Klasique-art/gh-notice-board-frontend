/* ===========================
   SIMPLIFIED CONTENT TYPES FOR BOOKMARKS
   Minimal types for saved items display - Self-contained
=========================== */

import { CurrentUser } from "./general.types";

// Simplified Category for bookmarks (not using general.types Category)
export interface BookmarkCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon: string; // String icon name, not LucideIcon
    color: string;
}

// Simplified Tag for bookmarks
export interface BookmarkTag {
    id: number;
    name: string;
    slug: string;
    description?: string;
    category?: number | null;
    category_name?: string | null;
    usage_count?: number;
    created_at?: string;
    is_active?: boolean;
}

// News Article (simplified)
export interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    featured_image: string | null;
    author: CurrentUser;
    category: BookmarkCategory | null;
    tags: BookmarkTag[];
    status: "draft" | "pending" | "published" | "archived" | "rejected";
    is_breaking: boolean;
    is_featured: boolean;
    is_trending: boolean;
    views_count: number;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    bookmarks_count: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

// Opportunity (simplified for bookmarks)
export interface Opportunity {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;
    opportunity_type: "job" | "scholarship" | "grant" | "internship" | "volunteer" | "contract";
    organization_name: string;
    organization_logo: string | null;
    location: string;
    city: string;
    country: string;
    is_remote: boolean;
    is_diaspora: boolean;
    employment_type: "full-time" | "part-time" | "contract" | "internship" | "temporary";
    salary_min: number;
    salary_max: number;
    salary_currency: string;
    deadline: string | null;
    application_url: string;
    requirements: string;
    benefits: string;
    category: BookmarkCategory | null;
    tags: BookmarkTag[];
    author: CurrentUser;
    status: "draft" | "pending" | "published" | "expired" | "archived";
    is_featured: boolean;
    is_urgent: boolean;
    views_count: number;
    likes_count: number;
    applications_count: number;
    shares_count: number;
    bookmarks_count: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

// Diaspora Post (simplified)
export interface DiasporaPost {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    featured_image: string | null;
    author: CurrentUser;
    category: BookmarkCategory | null;
    tags: BookmarkTag[];
    content_type: "news" | "story" | "interview" | "immigration" | "embassy" | "community" | "event" | "investment" | "cultural" | "homecoming" | "advice" | "partnership";
    region: "north-america" | "europe" | "asia" | "africa" | "south-america" | "oceania" | "middle-east" | "global";
    country: string;
    city: string;
    status: "draft" | "pending_review" | "published" | "featured" | "archived";
    is_featured: boolean;
    is_urgent: boolean;
    views_count: number;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    bookmarks_count: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

// Announcement (simplified)
export interface Announcement {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    featured_image: string | null;
    author: CurrentUser;
    category: BookmarkCategory | null;
    tags: BookmarkTag[];
    announcement_type: "general" | "urgent" | "event" | "policy" | "update" | "alert" | "maintenance" | "news";
    priority: "low" | "medium" | "high" | "critical";
    target_audience: "all" | "verified" | "journalists" | "organizations" | "government" | "diaspora";
    status: "draft" | "scheduled" | "published" | "expired" | "archived";
    is_pinned: boolean;
    is_critical: boolean;
    requires_acknowledgment: boolean;
    expiry_date: string | null;
    views_count: number;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    acknowledgments_count: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}