/* ===========================
   ANALYTICS TYPES
   Based on Django backend engagement tracking
=========================== */

// Overview Statistics
export interface AnalyticsOverview {
    total_views: number;
    total_likes: number;
    total_shares: number;
    total_comments: number;
    total_bookmarks: number;
    total_followers: number;
    total_following: number;
    total_posts: number;
    total_applications: number;
}

// Content Performance by Type
export interface ContentPerformance {
    content_type: "news" | "events" | "opportunities" | "diaspora" | "announcements";
    content_type_display: string;
    total_items: number;
    total_views: number;
    total_likes: number;
    total_shares: number;
    total_comments: number;
    avg_engagement: number; // Average engagement rate
}

// Time-series data point
export interface TimeSeriesDataPoint {
    date: string; // ISO date
    views: number;
    likes: number;
    shares: number;
    comments: number;
    posts_created: number;
}

// Top performing content item
export interface TopContent {
    id: string;
    title: string;
    slug: string;
    content_type: "news" | "events" | "opportunities" | "diaspora" | "announcements";
    content_type_display: string;
    views_count: number;
    likes_count: number;
    shares_count: number;
    comments_count: number;
    engagement_score: number; // Calculated score
    published_at: string;
}

// Application analytics
export interface ApplicationAnalytics {
    total_applications: number;
    draft: number;
    submitted: number;
    under_review: number;
    shortlisted: number;
    interview_scheduled: number;
    accepted: number;
    rejected: number;
    withdrawn: number;
    acceptance_rate: number; // Percentage
    avg_response_time: number; // Days
}

// Recent activity item
export interface RecentActivity {
    id: string;
    type: "view" | "like" | "share" | "comment" | "bookmark" | "post_created" | "application";
    type_display: string;
    content_title: string;
    content_type: "news" | "events" | "opportunities" | "diaspora" | "announcements";
    created_at: string;
    details?: string; // Optional additional info
}

// Engagement breakdown
export interface EngagementBreakdown {
    period: "today" | "week" | "month" | "all_time";
    views: number;
    likes: number;
    shares: number;
    comments: number;
    bookmarks: number;
}

// Growth metrics
export interface GrowthMetrics {
    followers_growth: number; // Change from last period
    posts_growth: number;
    views_growth: number;
    engagement_growth: number;
}

// Main Analytics Response
export interface AnalyticsData {
    overview: AnalyticsOverview;
    content_performance: ContentPerformance[];
    time_series: TimeSeriesDataPoint[];
    top_content: TopContent[];
    application_analytics: ApplicationAnalytics;
    recent_activity: RecentActivity[];
    engagement_breakdown: EngagementBreakdown[];
    growth_metrics: GrowthMetrics;
    period: "7days" | "30days" | "90days" | "year" | "all_time";
}