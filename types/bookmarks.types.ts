/* ===========================
   BOOKMARK TYPES
   Based on Django interactions/models.py Bookmark model
=========================== */

import { Event } from "./events.types";
import { NewsArticle, DiasporaPost, Announcement, Opportunity } from "./content.types";

// Content Type Names (from Django ContentType)
export type BookmarkContentType =
    | "event"
    | "newsarticle"
    | "opportunity"
    | "diasporapost"
    | "announcement";

export type BookmarkInteractionType =
    | "news"
    | "event"
    | "opportunity"
    | "diaspora";

// Base Bookmark (from BookmarkSerializer)
export interface BaseBookmark {
    id: number;
    user: string | number;
    user_username: string;
    content_type: number; // ContentType ID
    content_type_name: BookmarkContentType;
    object_id: string | number;
    type?: BookmarkInteractionType;
    created_at: string;
}

// Bookmark with full content object (for frontend use)
export type Bookmark =
    | EventBookmark
    | NewsBookmark
    | OpportunityBookmark
    | DiasporaBookmark
    | AnnouncementBookmark;

export interface EventBookmark extends BaseBookmark {
    content_type_name: "event";
    content_object: Event;
}

export interface NewsBookmark extends BaseBookmark {
    content_type_name: "newsarticle";
    content_object: NewsArticle;
}

export interface OpportunityBookmark extends BaseBookmark {
    content_type_name: "opportunity";
    content_object: Opportunity;
}

export interface DiasporaBookmark extends BaseBookmark {
    content_type_name: "diasporapost";
    content_object: DiasporaPost;
}

export interface AnnouncementBookmark extends BaseBookmark {
    content_type_name: "announcement";
    content_object: Announcement;
}

// Paginated Response
export interface BookmarksResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Bookmark[];
}

// For filtering/grouping
export interface BookmarkStats {
    total: number;
    events: number;
    news: number;
    opportunities: number;
    diaspora: number;
    announcements: number;
}
