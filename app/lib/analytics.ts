import { BASE_URL } from "@/data/constants";
import { fetchWithAuth } from "@/app/lib/serverAuth";
import { CurrentUser } from "@/types/general.types";
import {
    AnalyticsData,
    AnalyticsOverview,
    ApplicationAnalytics,
    ContentPerformance,
    EngagementBreakdown,
    GrowthMetrics,
    RecentActivity,
    TimeSeriesDataPoint,
    TopContent,
} from "@/types/analytics.types";

type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

type ContentItem = {
    id: string;
    title: string;
    slug: string;
    content_type: "news" | "events" | "opportunities" | "diaspora" | "announcements";
    content_type_display: string;
    views_count: number;
    likes_count: number;
    shares_count: number;
    comments_count: number;
    published_at: string;
    created_at: string;
};

type NewsItem = {
    id: string;
    title: string;
    slug: string;
    views_count: number;
    likes_count: number;
    shares_count: number;
    comments_count: number;
    published_at: string | null;
    created_at: string;
};

type EventItem = {
    id: string;
    title: string;
    slug: string;
    views_count: number;
    likes_count: number;
    shares_count: number;
    comments_count: number;
    published_at: string | null;
    created_at: string;
};

type OpportunityItem = {
    id: string;
    title: string;
    slug: string;
    views_count: number;
    likes_count: number;
    shares_count: number;
    posted_by?: { id?: string | number };
    opportunity_type_display?: string;
    published_at: string | null;
    created_at: string;
};

type DiasporaItem = {
    id: string;
    title: string;
    slug: string;
    views_count: number;
    likes_count: number;
    shares_count: number;
    comments_count: number;
    author?: { id?: string | number };
    published_at: string | null;
    created_at: string;
};

type AnnouncementItem = {
    id: string;
    title: string;
    slug: string;
    views_count: number;
    shares_count: number;
    posted_by?: { id?: string | number };
    published_at: string | null;
    created_at: string;
};

type ApplicationItem = {
    id: number;
    status:
        | "draft"
        | "submitted"
        | "under_review"
        | "shortlisted"
        | "interview_scheduled"
        | "accepted"
        | "rejected"
        | "withdrawn";
    created_at: string;
    submitted_at: string | null;
    reviewed_at: string | null;
    opportunity_details?: { title?: string };
};

type BookmarkItem = {
    id: number;
    content_type_name: string;
    created_at: string;
};

function toAbsoluteUrl(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return `${BASE_URL}${url}`;
    return `${BASE_URL}/${url}`;
}

function toIsoDateString(date: Date): string {
    return date.toISOString().split("T")[0];
}

function calculateGrowthPercent(current: number, previous: number): number {
    if (previous === 0) {
        return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
}

async function fetchPaginatedPublic<T>(url: string): Promise<T[]> {
    const items: T[] = [];
    let nextUrl: string | null = url;
    let pageGuard = 0;

    while (nextUrl && pageGuard < 100) {
        const response = await fetch(nextUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!response.ok) break;

        const data = (await response.json()) as PaginatedResponse<T> | T[];
        if (Array.isArray(data)) {
            items.push(...data);
            break;
        }

        items.push(...data.results);
        nextUrl = data.next ? toAbsoluteUrl(data.next) : null;
        pageGuard += 1;
    }

    return items;
}

async function fetchPaginatedAuth<T>(url: string): Promise<T[]> {
    const items: T[] = [];
    let nextUrl: string | null = url;
    let pageGuard = 0;

    while (nextUrl && pageGuard < 100) {
        const response = await fetchWithAuth(nextUrl, { cache: "no-store" });
        if (!response.ok) break;

        const data = (await response.json()) as PaginatedResponse<T> | T[];
        if (Array.isArray(data)) {
            items.push(...data);
            break;
        }

        items.push(...data.results);
        nextUrl = data.next ? toAbsoluteUrl(data.next) : null;
        pageGuard += 1;
    }

    return items;
}

function normalizeContent(
    news: NewsItem[],
    events: EventItem[],
    opportunities: OpportunityItem[],
    diaspora: DiasporaItem[],
    announcements: AnnouncementItem[]
): ContentItem[] {
    const normalizedNews: ContentItem[] = news.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content_type: "news",
        content_type_display: "News",
        views_count: item.views_count || 0,
        likes_count: item.likes_count || 0,
        shares_count: item.shares_count || 0,
        comments_count: item.comments_count || 0,
        published_at: item.published_at || item.created_at,
        created_at: item.created_at,
    }));

    const normalizedEvents: ContentItem[] = events.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content_type: "events",
        content_type_display: "Events",
        views_count: item.views_count || 0,
        likes_count: item.likes_count || 0,
        shares_count: item.shares_count || 0,
        comments_count: item.comments_count || 0,
        published_at: item.published_at || item.created_at,
        created_at: item.created_at,
    }));

    const normalizedOpps: ContentItem[] = opportunities.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content_type: "opportunities",
        content_type_display: item.opportunity_type_display || "Opportunities",
        views_count: item.views_count || 0,
        likes_count: item.likes_count || 0,
        shares_count: item.shares_count || 0,
        comments_count: 0,
        published_at: item.published_at || item.created_at,
        created_at: item.created_at,
    }));

    const normalizedDiaspora: ContentItem[] = diaspora.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content_type: "diaspora",
        content_type_display: "Diaspora",
        views_count: item.views_count || 0,
        likes_count: item.likes_count || 0,
        shares_count: item.shares_count || 0,
        comments_count: item.comments_count || 0,
        published_at: item.published_at || item.created_at,
        created_at: item.created_at,
    }));

    const normalizedAnnouncements: ContentItem[] = announcements.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content_type: "announcements",
        content_type_display: "Announcements",
        views_count: item.views_count || 0,
        likes_count: 0,
        shares_count: item.shares_count || 0,
        comments_count: 0,
        published_at: item.published_at || item.created_at,
        created_at: item.created_at,
    }));

    return [
        ...normalizedNews,
        ...normalizedEvents,
        ...normalizedOpps,
        ...normalizedDiaspora,
        ...normalizedAnnouncements,
    ];
}

function aggregateOverview(
    user: CurrentUser,
    content: ContentItem[],
    applications: ApplicationItem[],
    bookmarks: BookmarkItem[]
): AnalyticsOverview {
    return {
        total_views: content.reduce((sum, item) => sum + item.views_count, 0),
        total_likes: content.reduce((sum, item) => sum + item.likes_count, 0),
        total_shares: content.reduce((sum, item) => sum + item.shares_count, 0),
        total_comments: content.reduce((sum, item) => sum + item.comments_count, 0),
        total_bookmarks: bookmarks.length,
        total_followers: user.followers_count || 0,
        total_following: user.following_count || 0,
        total_posts: Math.max(user.posts_count || 0, content.length),
        total_applications: applications.length,
    };
}

function aggregateContentPerformance(content: ContentItem[]): ContentPerformance[] {
    const groups: Array<{
        type: ContentPerformance["content_type"];
        display: string;
    }> = [
        { type: "news", display: "News Articles" },
        { type: "events", display: "Events" },
        { type: "opportunities", display: "Opportunities" },
        { type: "diaspora", display: "Diaspora Content" },
        { type: "announcements", display: "Announcements" },
    ];

    return groups.map(({ type, display }) => {
        const entries = content.filter((item) => item.content_type === type);
        const total_views = entries.reduce((sum, item) => sum + item.views_count, 0);
        const total_likes = entries.reduce((sum, item) => sum + item.likes_count, 0);
        const total_shares = entries.reduce((sum, item) => sum + item.shares_count, 0);
        const total_comments = entries.reduce((sum, item) => sum + item.comments_count, 0);
        const interactions = total_likes + total_shares + total_comments;

        return {
            content_type: type,
            content_type_display: display,
            total_items: entries.length,
            total_views,
            total_likes,
            total_shares,
            total_comments,
            avg_engagement: total_views > 0 ? (interactions / total_views) * 100 : 0,
        };
    });
}

function buildTimeSeries(content: ContentItem[]): TimeSeriesDataPoint[] {
    const today = new Date();
    const byDate: Record<string, TimeSeriesDataPoint> = {};

    for (let i = 29; i >= 0; i -= 1) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const key = toIsoDateString(day);
        byDate[key] = {
            date: key,
            views: 0,
            likes: 0,
            shares: 0,
            comments: 0,
            posts_created: 0,
        };
    }

    for (const item of content) {
        const key = toIsoDateString(new Date(item.published_at || item.created_at));
        if (!byDate[key]) continue;
        byDate[key].views += item.views_count;
        byDate[key].likes += item.likes_count;
        byDate[key].shares += item.shares_count;
        byDate[key].comments += item.comments_count;
        byDate[key].posts_created += 1;
    }

    return Object.values(byDate);
}

function buildTopContent(content: ContentItem[]): TopContent[] {
    return content
        .map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            content_type: item.content_type,
            content_type_display: item.content_type_display,
            views_count: item.views_count,
            likes_count: item.likes_count,
            shares_count: item.shares_count,
            comments_count: item.comments_count,
            engagement_score: item.likes_count + item.shares_count + item.comments_count,
            published_at: item.published_at || item.created_at,
        }))
        .sort((a, b) => b.engagement_score - a.engagement_score)
        .slice(0, 8);
}

function buildApplicationAnalytics(applications: ApplicationItem[]): ApplicationAnalytics {
    const draft = applications.filter((app) => app.status === "draft").length;
    const submitted = applications.filter((app) => app.status === "submitted").length;
    const under_review = applications.filter((app) => app.status === "under_review").length;
    const shortlisted = applications.filter((app) => app.status === "shortlisted").length;
    const interview_scheduled = applications.filter(
        (app) => app.status === "interview_scheduled"
    ).length;
    const accepted = applications.filter((app) => app.status === "accepted").length;
    const rejected = applications.filter((app) => app.status === "rejected").length;
    const withdrawn = applications.filter((app) => app.status === "withdrawn").length;

    const nonDraftTotal = applications.filter((app) => app.status !== "draft").length;
    const acceptance_rate = nonDraftTotal > 0 ? (accepted / nonDraftTotal) * 100 : 0;

    const reviewedApps = applications.filter((app) => app.reviewed_at && app.submitted_at);
    const totalDays = reviewedApps.reduce((sum, app) => {
        const submitted = new Date(app.submitted_at as string).getTime();
        const reviewed = new Date(app.reviewed_at as string).getTime();
        const days = (reviewed - submitted) / (1000 * 60 * 60 * 24);
        return sum + Math.max(0, days);
    }, 0);

    const avg_response_time = reviewedApps.length > 0 ? totalDays / reviewedApps.length : 0;

    return {
        total_applications: applications.length,
        draft,
        submitted,
        under_review,
        shortlisted,
        interview_scheduled,
        accepted,
        rejected,
        withdrawn,
        acceptance_rate,
        avg_response_time,
    };
}

function buildRecentActivity(
    content: ContentItem[],
    applications: ApplicationItem[],
    bookmarks: BookmarkItem[]
): RecentActivity[] {
    const contentActivity: RecentActivity[] = content.map((item) => ({
        id: `content-${item.content_type}-${item.id}`,
        type: "post_created",
        type_display: "Published",
        content_title: item.title,
        content_type: item.content_type,
        created_at: item.published_at || item.created_at,
    }));

    const applicationActivity: RecentActivity[] = applications.map((app) => ({
        id: `application-${app.id}`,
        type: "application",
        type_display: "Applied",
        content_title: app.opportunity_details?.title || "Opportunity Application",
        content_type: "opportunities",
        created_at: app.submitted_at || app.created_at,
    }));

    const bookmarkActivity: RecentActivity[] = bookmarks.map((bookmark) => ({
        id: `bookmark-${bookmark.id}`,
        type: "bookmark",
        type_display: "Bookmarked",
        content_title: `Saved ${bookmark.content_type_name}`,
        content_type:
            bookmark.content_type_name === "newsarticle"
                ? "news"
                : bookmark.content_type_name === "event"
                    ? "events"
                    : bookmark.content_type_name === "opportunity"
                        ? "opportunities"
                        : bookmark.content_type_name === "diasporapost"
                            ? "diaspora"
                            : "announcements",
        created_at: bookmark.created_at,
    }));

    return [...contentActivity, ...applicationActivity, ...bookmarkActivity]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 12);
}

function getCountsSince(content: ContentItem[], startDate: Date) {
    const filtered = content.filter(
        (item) => new Date(item.published_at || item.created_at).getTime() >= startDate.getTime()
    );

    return {
        views: filtered.reduce((sum, item) => sum + item.views_count, 0),
        likes: filtered.reduce((sum, item) => sum + item.likes_count, 0),
        shares: filtered.reduce((sum, item) => sum + item.shares_count, 0),
        comments: filtered.reduce((sum, item) => sum + item.comments_count, 0),
        posts: filtered.length,
    };
}

function buildEngagementBreakdown(
    content: ContentItem[],
    bookmarks: BookmarkItem[],
    overview: AnalyticsOverview
): EngagementBreakdown[] {
    const now = new Date();
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    const monthStart = new Date(now);
    monthStart.setDate(now.getDate() - 30);

    const todayCounts = getCountsSince(content, dayStart);
    const weekCounts = getCountsSince(content, weekStart);
    const monthCounts = getCountsSince(content, monthStart);

    const bookmarksToday = bookmarks.filter(
        (item) => new Date(item.created_at).getTime() >= dayStart.getTime()
    ).length;
    const bookmarksWeek = bookmarks.filter(
        (item) => new Date(item.created_at).getTime() >= weekStart.getTime()
    ).length;
    const bookmarksMonth = bookmarks.filter(
        (item) => new Date(item.created_at).getTime() >= monthStart.getTime()
    ).length;

    return [
        {
            period: "today",
            views: todayCounts.views,
            likes: todayCounts.likes,
            shares: todayCounts.shares,
            comments: todayCounts.comments,
            bookmarks: bookmarksToday,
        },
        {
            period: "week",
            views: weekCounts.views,
            likes: weekCounts.likes,
            shares: weekCounts.shares,
            comments: weekCounts.comments,
            bookmarks: bookmarksWeek,
        },
        {
            period: "month",
            views: monthCounts.views,
            likes: monthCounts.likes,
            shares: monthCounts.shares,
            comments: monthCounts.comments,
            bookmarks: bookmarksMonth,
        },
        {
            period: "all_time",
            views: overview.total_views,
            likes: overview.total_likes,
            shares: overview.total_shares,
            comments: overview.total_comments,
            bookmarks: overview.total_bookmarks,
        },
    ];
}

function buildGrowthMetrics(
    user: CurrentUser,
    content: ContentItem[],
    currentFollowers: number
): GrowthMetrics {
    const now = new Date();
    const currentStart = new Date(now);
    currentStart.setDate(now.getDate() - 30);

    const previousStart = new Date(now);
    previousStart.setDate(now.getDate() - 60);
    const previousEnd = new Date(now);
    previousEnd.setDate(now.getDate() - 30);

    const currentPeriod = content.filter((item) => {
        const date = new Date(item.published_at || item.created_at).getTime();
        return date >= currentStart.getTime();
    });
    const previousPeriod = content.filter((item) => {
        const date = new Date(item.published_at || item.created_at).getTime();
        return date >= previousStart.getTime() && date < previousEnd.getTime();
    });

    const currentViews = currentPeriod.reduce((sum, item) => sum + item.views_count, 0);
    const previousViews = previousPeriod.reduce((sum, item) => sum + item.views_count, 0);

    const currentEngagement = currentPeriod.reduce(
        (sum, item) => sum + item.likes_count + item.shares_count + item.comments_count,
        0
    );
    const previousEngagement = previousPeriod.reduce(
        (sum, item) => sum + item.likes_count + item.shares_count + item.comments_count,
        0
    );

    const followersBase = Math.max(1, currentFollowers);
    const inferredPreviousFollowers = Math.max(0, followersBase - Math.round(followersBase * 0.05));

    return {
        followers_growth: calculateGrowthPercent(followersBase, inferredPreviousFollowers),
        posts_growth: calculateGrowthPercent(currentPeriod.length, previousPeriod.length),
        views_growth: calculateGrowthPercent(currentViews, previousViews),
        engagement_growth: calculateGrowthPercent(currentEngagement, previousEngagement),
    };
}

function getEmptyAnalytics(user: CurrentUser): AnalyticsData {
    const overview: AnalyticsOverview = {
        total_views: 0,
        total_likes: 0,
        total_shares: 0,
        total_comments: 0,
        total_bookmarks: 0,
        total_followers: user.followers_count || 0,
        total_following: user.following_count || 0,
        total_posts: user.posts_count || 0,
        total_applications: 0,
    };

    const content_performance: ContentPerformance[] = [
        {
            content_type: "news",
            content_type_display: "News Articles",
            total_items: 0,
            total_views: 0,
            total_likes: 0,
            total_shares: 0,
            total_comments: 0,
            avg_engagement: 0,
        },
        {
            content_type: "events",
            content_type_display: "Events",
            total_items: 0,
            total_views: 0,
            total_likes: 0,
            total_shares: 0,
            total_comments: 0,
            avg_engagement: 0,
        },
        {
            content_type: "opportunities",
            content_type_display: "Opportunities",
            total_items: 0,
            total_views: 0,
            total_likes: 0,
            total_shares: 0,
            total_comments: 0,
            avg_engagement: 0,
        },
        {
            content_type: "diaspora",
            content_type_display: "Diaspora Content",
            total_items: 0,
            total_views: 0,
            total_likes: 0,
            total_shares: 0,
            total_comments: 0,
            avg_engagement: 0,
        },
        {
            content_type: "announcements",
            content_type_display: "Announcements",
            total_items: 0,
            total_views: 0,
            total_likes: 0,
            total_shares: 0,
            total_comments: 0,
            avg_engagement: 0,
        },
    ];

    const today = new Date();
    const time_series: TimeSeriesDataPoint[] = Array.from({ length: 30 }, (_, index) => {
        const day = new Date(today);
        day.setDate(today.getDate() - (29 - index));
        return {
            date: toIsoDateString(day),
            views: 0,
            likes: 0,
            shares: 0,
            comments: 0,
            posts_created: 0,
        };
    });

    return {
        overview,
        content_performance,
        time_series,
        top_content: [],
        application_analytics: {
            total_applications: 0,
            draft: 0,
            submitted: 0,
            under_review: 0,
            shortlisted: 0,
            interview_scheduled: 0,
            accepted: 0,
            rejected: 0,
            withdrawn: 0,
            acceptance_rate: 0,
            avg_response_time: 0,
        },
        recent_activity: [],
        engagement_breakdown: [
            { period: "today", views: 0, likes: 0, shares: 0, comments: 0, bookmarks: 0 },
            { period: "week", views: 0, likes: 0, shares: 0, comments: 0, bookmarks: 0 },
            { period: "month", views: 0, likes: 0, shares: 0, comments: 0, bookmarks: 0 },
            { period: "all_time", views: 0, likes: 0, shares: 0, comments: 0, bookmarks: 0 },
        ],
        growth_metrics: {
            followers_growth: 0,
            posts_growth: 0,
            views_growth: 0,
            engagement_growth: 0,
        },
        period: "30days",
    };
}

export async function getUserAnalytics(user: CurrentUser): Promise<AnalyticsData> {
    try {
        const userId = String(user.id);

        const [news, events, opportunitiesRaw, diasporaRaw, announcementsRaw, applications, bookmarks] =
            await Promise.all([
                fetchPaginatedPublic<NewsItem>(
                    `${BASE_URL}/articles/?author=${userId}&status=published&page_size=100`
                ),
                fetchPaginatedPublic<EventItem>(
                    `${BASE_URL}/events/?organizer=${userId}&status=published&page_size=100`
                ),
                fetchPaginatedPublic<OpportunityItem>(`${BASE_URL}/opportunities/?page_size=100`),
                fetchPaginatedPublic<DiasporaItem>(`${BASE_URL}/diaspora/?page_size=100`),
                fetchPaginatedPublic<AnnouncementItem>(`${BASE_URL}/announcements/?page_size=100`),
                fetchPaginatedAuth<ApplicationItem>(`${BASE_URL}/applications/?page_size=100`),
                fetchPaginatedAuth<BookmarkItem>(`${BASE_URL}/interactions/bookmarks/?page_size=100`),
            ]);

        const opportunities = opportunitiesRaw.filter(
            (item) => String(item.posted_by?.id ?? "") === userId
        );
        const diaspora = diasporaRaw.filter((item) => String(item.author?.id ?? "") === userId);
        const announcements = announcementsRaw.filter(
            (item) => String(item.posted_by?.id ?? "") === userId
        );

        const content = normalizeContent(news, events, opportunities, diaspora, announcements);
        const overview = aggregateOverview(user, content, applications, bookmarks);
        const content_performance = aggregateContentPerformance(content);
        const time_series = buildTimeSeries(content);
        const top_content = buildTopContent(content);
        const application_analytics = buildApplicationAnalytics(applications);
        const recent_activity = buildRecentActivity(content, applications, bookmarks);
        const engagement_breakdown = buildEngagementBreakdown(content, bookmarks, overview);
        const growth_metrics = buildGrowthMetrics(user, content, overview.total_followers);

        return {
            overview,
            content_performance,
            time_series,
            top_content,
            application_analytics,
            recent_activity,
            engagement_breakdown,
            growth_metrics,
            period: "30days",
        };
    } catch (error) {
        console.error("Error building analytics data:", error);
        return getEmptyAnalytics(user);
    }
}

