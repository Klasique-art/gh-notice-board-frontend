import {
    AnalyticsData,
    AnalyticsOverview,
    ContentPerformance,
    TimeSeriesDataPoint,
    TopContent,
    ApplicationAnalytics,
    RecentActivity,
    EngagementBreakdown,
    GrowthMetrics,
} from "@/types/analytics.types";

// Overview Statistics
const mockOverview: AnalyticsOverview = {
    total_views: 15_420,
    total_likes: 892,
    total_shares: 234,
    total_comments: 156,
    total_bookmarks: 445,
    total_followers: 1_234,
    total_following: 567,
    total_posts: 8, // User's own posts
    total_applications: 6,
};

// Content Performance by Type
const mockContentPerformance: ContentPerformance[] = [
    {
        content_type: "news",
        content_type_display: "News Articles",
        total_items: 3,
        total_views: 8_930,
        total_likes: 456,
        total_shares: 123,
        total_comments: 89,
        avg_engagement: 5.8, // (likes + shares + comments) / views * 100
    },
    {
        content_type: "events",
        content_type_display: "Events",
        total_items: 2,
        total_views: 3_240,
        total_likes: 189,
        total_shares: 56,
        total_comments: 34,
        avg_engagement: 8.6,
    },
    {
        content_type: "opportunities",
        content_type_display: "Opportunities",
        total_items: 2,
        total_views: 2_450,
        total_likes: 178,
        total_shares: 45,
        total_comments: 23,
        avg_engagement: 10.0,
    },
    {
        content_type: "diaspora",
        content_type_display: "Diaspora Content",
        total_items: 1,
        total_views: 800,
        total_likes: 69,
        total_shares: 10,
        total_comments: 10,
        avg_engagement: 11.1,
    },
];

// Time Series Data (Last 30 days)
const generateTimeSeriesData = (): TimeSeriesDataPoint[] => {
    const data: TimeSeriesDataPoint[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Generate realistic trending data
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const baseMultiplier = isWeekend ? 0.6 : 1.0;

        // Add some randomness and growth trend
        const growthFactor = 1 + (29 - i) * 0.02; // Gradual growth over time
        const randomFactor = 0.8 + Math.random() * 0.4;

        data.push({
            date: date.toISOString().split("T")[0],
            views: Math.round(
                400 * baseMultiplier * growthFactor * randomFactor
            ),
            likes: Math.round(25 * baseMultiplier * growthFactor * randomFactor),
            shares: Math.round(8 * baseMultiplier * growthFactor * randomFactor),
            comments: Math.round(5 * baseMultiplier * growthFactor * randomFactor),
            posts_created: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0,
        });
    }

    return data;
};

const mockTimeSeries = generateTimeSeriesData();

// Top Performing Content
const mockTopContent: TopContent[] = [
    {
        id: "1",
        title: "Ghana's Tech Hub Attracts $50M International Investment",
        slug: "ghana-tech-hub-investment-2025",
        content_type: "news",
        content_type_display: "News",
        views_count: 5_420,
        likes_count: 312,
        shares_count: 89,
        comments_count: 67,
        engagement_score: 468, // likes + shares + comments
        published_at: "2025-01-12T08:00:00Z",
    },
    {
        id: "2",
        title: "Accra Tech Summit 2025",
        slug: "accra-tech-summit-2025",
        content_type: "events",
        content_type_display: "Event",
        views_count: 2_340,
        likes_count: 156,
        shares_count: 45,
        comments_count: 23,
        engagement_score: 224,
        published_at: "2025-01-10T12:00:00Z",
    },
    {
        id: "3",
        title: "Senior Software Engineer - Full Stack",
        slug: "senior-software-engineer-accra",
        content_type: "opportunities",
        content_type_display: "Job",
        views_count: 2_340,
        likes_count: 89,
        shares_count: 23,
        comments_count: 15,
        engagement_score: 127,
        published_at: "2025-01-08T10:00:00Z",
    },
    {
        id: "4",
        title: "New Scholarship Program Opens for Ghanaian Students",
        slug: "scholarship-program-ghana-students-2025",
        content_type: "news",
        content_type_display: "News",
        views_count: 1_890,
        likes_count: 134,
        shares_count: 56,
        comments_count: 28,
        engagement_score: 218,
        published_at: "2025-01-11T10:30:00Z",
    },
    {
        id: "5",
        title: "Mastercard Foundation Scholars Program 2025",
        slug: "mastercard-scholars-program-2025",
        content_type: "opportunities",
        content_type_display: "Scholarship",
        views_count: 1_670,
        likes_count: 98,
        shares_count: 34,
        comments_count: 19,
        engagement_score: 151,
        published_at: "2025-01-07T10:00:00Z",
    },
];

// Application Analytics
const mockApplicationAnalytics: ApplicationAnalytics = {
    total_applications: 6,
    draft: 1,
    submitted: 1,
    under_review: 1,
    shortlisted: 1,
    interview_scheduled: 0,
    accepted: 1,
    rejected: 1,
    withdrawn: 0,
    acceptance_rate: 20.0, // 1 accepted out of 5 submitted (excluding draft)
    avg_response_time: 4.5, // Average days to get response
};

// Recent Activity
const mockRecentActivity: RecentActivity[] = [
    {
        id: "1",
        type: "like",
        type_display: "Liked",
        content_title: "Ghana's Tech Hub Attracts $50M International Investment",
        content_type: "news",
        created_at: "2025-01-20T10:30:00Z",
    },
    {
        id: "2",
        type: "application",
        type_display: "Applied",
        content_title: "Senior Software Engineer - Full Stack",
        content_type: "opportunities",
        created_at: "2025-01-18T17:00:00Z",
    },
    {
        id: "3",
        type: "comment",
        type_display: "Commented on",
        content_title: "Accra Tech Summit 2025",
        content_type: "events",
        created_at: "2025-01-17T14:20:00Z",
        details: "Great event! Looking forward to attending.",
    },
    {
        id: "4",
        type: "share",
        type_display: "Shared",
        content_title: "New Scholarship Program Opens for Ghanaian Students",
        content_type: "news",
        created_at: "2025-01-16T09:45:00Z",
    },
    {
        id: "5",
        type: "bookmark",
        type_display: "Bookmarked",
        content_title: "Digital Marketing Specialist - Remote",
        content_type: "opportunities",
        created_at: "2025-01-15T16:30:00Z",
    },
    {
        id: "6",
        type: "view",
        type_display: "Viewed",
        content_title: "Kumasi Cultural Festival 2025",
        content_type: "events",
        created_at: "2025-01-14T11:15:00Z",
    },
    {
        id: "7",
        type: "like",
        type_display: "Liked",
        content_title: "Data Analyst - Remote Position",
        content_type: "opportunities",
        created_at: "2025-01-13T08:00:00Z",
    },
    {
        id: "8",
        type: "post_created",
        type_display: "Published",
        content_title: "My Journey into Tech in Ghana",
        content_type: "news",
        created_at: "2025-01-12T15:30:00Z",
    },
];

// Engagement Breakdown
const mockEngagementBreakdown: EngagementBreakdown[] = [
    {
        period: "today",
        views: 340,
        likes: 18,
        shares: 5,
        comments: 3,
        bookmarks: 7,
    },
    {
        period: "week",
        views: 2_450,
        likes: 142,
        shares: 38,
        comments: 24,
        bookmarks: 52,
    },
    {
        period: "month",
        views: 9_680,
        likes: 567,
        shares: 156,
        comments: 98,
        bookmarks: 223,
    },
    {
        period: "all_time",
        views: 15_420,
        likes: 892,
        shares: 234,
        comments: 156,
        bookmarks: 445,
    },
];

// Growth Metrics (compared to previous period)
const mockGrowthMetrics: GrowthMetrics = {
    followers_growth: 12.5, // +12.5% from last month
    posts_growth: 33.3, // +33.3% from last month
    views_growth: 18.7, // +18.7% from last month
    engagement_growth: 15.2, // +15.2% from last month
};

// Main Analytics Data
export const mockAnalyticsData: AnalyticsData = {
    overview: mockOverview,
    content_performance: mockContentPerformance,
    time_series: mockTimeSeries,
    top_content: mockTopContent,
    application_analytics: mockApplicationAnalytics,
    recent_activity: mockRecentActivity,
    engagement_breakdown: mockEngagementBreakdown,
    growth_metrics: mockGrowthMetrics,
    period: "30days",
};