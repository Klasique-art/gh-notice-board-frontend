import { BASE_URL } from "@/data/constants";
import { fetchWithAuth } from "@/app/lib/serverAuth";
import { CurrentUser } from "@/types/general.types";

export type DashboardStatsData = {
    published_content: number;
    pending_submissions: number;
    active_applications: number;
    saved_items: number;
    total_views: number;
};

type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

type ContentWithViews = {
    views_count?: number;
};

async function fetchCount(url: string): Promise<number> {
    try {
        const response = await fetchWithAuth(url, { cache: "no-store" });
        if (!response.ok) return 0;

        const data = await response.json();
        if (Array.isArray(data)) return data.length;
        if (typeof data?.count === "number") return data.count;
        return 0;
    } catch (error) {
        console.error(`Error fetching count from ${url}:`, error);
        return 0;
    }
}

async function fetchTotalViews(url: string): Promise<number> {
    try {
        let nextUrl: string | null = url;
        let totalViews = 0;
        let pageGuard = 0;

        while (nextUrl && pageGuard < 50) {
            const response = await fetchWithAuth(nextUrl, { cache: "no-store" });
            if (!response.ok) break;

            const data = (await response.json()) as PaginatedResponse<ContentWithViews> | ContentWithViews[];
            if (Array.isArray(data)) {
                return data.reduce((sum, item) => sum + (item.views_count || 0), 0);
            }

            totalViews += data.results.reduce((sum, item) => sum + (item.views_count || 0), 0);
            nextUrl = data.next;
            pageGuard += 1;
        }

        return totalViews;
    } catch (error) {
        console.error(`Error fetching views from ${url}:`, error);
        return 0;
    }
}

export async function getDashboardStats(user: CurrentUser): Promise<DashboardStatsData> {
    const baseApplicationsUrl = `${BASE_URL}/applications/`;

    const [
        pendingSubmissions,
        submittedApplications,
        underReviewApplications,
        shortlistedApplications,
        interviewScheduledApplications,
        savedItems,
        eventsViews,
        newsViews,
    ] = await Promise.all([
        fetchCount(`${baseApplicationsUrl}?status=under_review&page_size=1`),
        fetchCount(`${baseApplicationsUrl}?status=submitted&page_size=1`),
        fetchCount(`${baseApplicationsUrl}?status=under_review&page_size=1`),
        fetchCount(`${baseApplicationsUrl}?status=shortlisted&page_size=1`),
        fetchCount(`${baseApplicationsUrl}?status=interview_scheduled&page_size=1`),
        fetchCount(`${BASE_URL}/interactions/bookmarks/?page_size=1`),
        fetchTotalViews(
            `${BASE_URL}/events/?organizer=${user.id}&status=published&page_size=100`
        ),
        fetchTotalViews(
            `${BASE_URL}/articles/?author=${user.id}&status=published&page_size=100`
        ),
    ]);

    return {
        published_content: user.posts_count || 0,
        pending_submissions: pendingSubmissions,
        active_applications:
            submittedApplications +
            underReviewApplications +
            shortlistedApplications +
            interviewScheduledApplications,
        saved_items: savedItems,
        total_views: eventsViews + newsViews,
    };
}

