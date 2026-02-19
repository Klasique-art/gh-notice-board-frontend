import { BASE_URL } from "@/data/constants";
import { fetchWithAuth } from "@/app/lib/serverAuth";
import {
    Bookmark,
    BookmarksResponse,
    BookmarkContentType,
    BookmarkInteractionType,
    BookmarkStats,
} from "@/types/bookmarks.types";

type BackendBookmark = {
    id: number;
    user: string | number;
    user_username: string;
    content_type: number;
    content_type_name: BookmarkContentType;
    type?: BookmarkInteractionType;
    object_id: string | number;
    created_at: string;
};

type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

type ContentRecord = {
    id: string | number;
    slug?: string;
};

type HydrationMap = Record<string, unknown>;

function toAbsoluteUrl(nextUrl: string): string {
    if (nextUrl.startsWith("http://") || nextUrl.startsWith("https://")) {
        return nextUrl;
    }
    if (nextUrl.startsWith("/")) {
        return `${BASE_URL}${nextUrl}`;
    }
    return `${BASE_URL}/${nextUrl}`;
}

async function fetchAllRawBookmarks(): Promise<BackendBookmark[]> {
    const items: BackendBookmark[] = [];
    let nextUrl: string | null = `${BASE_URL}/interactions/bookmarks/`;
    let pageGuard = 0;

    while (nextUrl && pageGuard < 50) {
        const response = await fetchWithAuth(nextUrl, { cache: "no-store" });
        if (!response.ok) {
            return [];
        }

        const data = (await response.json()) as PaginatedResponse<BackendBookmark> | BackendBookmark[];
        if (Array.isArray(data)) {
            return data;
        }

        items.push(...data.results);
        nextUrl = data.next ? toAbsoluteUrl(data.next) : null;
        pageGuard += 1;
    }

    return items;
}

async function fetchContentMap(
    endpoint: string,
    ids: Set<string>
): Promise<HydrationMap> {
    const result: HydrationMap = {};
    if (ids.size === 0) return result;

    let nextUrl: string | null = `${BASE_URL}${endpoint}`;
    const remaining = new Set(ids);
    let pageGuard = 0;

    while (nextUrl && remaining.size > 0 && pageGuard < 100) {
        const response = await fetch(nextUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            break;
        }

        const data = (await response.json()) as PaginatedResponse<ContentRecord> | ContentRecord[];
        const items = Array.isArray(data) ? data : data.results;

        for (const item of items) {
            const key = String(item.id);
            if (remaining.has(key)) {
                result[key] = item;
                remaining.delete(key);
            }
        }

        nextUrl = Array.isArray(data) || !data.next ? null : toAbsoluteUrl(data.next);
        pageGuard += 1;
    }

    return result;
}

function buildStats(bookmarks: Bookmark[]): BookmarkStats {
    return {
        total: bookmarks.length,
        events: bookmarks.filter((item) => item.content_type_name === "event").length,
        news: bookmarks.filter((item) => item.content_type_name === "newsarticle").length,
        opportunities: bookmarks.filter((item) => item.content_type_name === "opportunity").length,
        diaspora: bookmarks.filter((item) => item.content_type_name === "diasporapost").length,
        announcements: bookmarks.filter((item) => item.content_type_name === "announcement").length,
    };
}

export async function getUserBookmarksWithStats(): Promise<{
    bookmarks: BookmarksResponse;
    stats: BookmarkStats;
}> {
    try {
        const rawBookmarks = await fetchAllRawBookmarks();
        if (rawBookmarks.length === 0) {
            const empty: BookmarksResponse = {
                count: 0,
                next: null,
                previous: null,
                results: [],
            };
            return { bookmarks: empty, stats: buildStats([]) };
        }

        const idsByType: Record<BookmarkContentType, Set<string>> = {
            event: new Set<string>(),
            newsarticle: new Set<string>(),
            opportunity: new Set<string>(),
            diasporapost: new Set<string>(),
            announcement: new Set<string>(),
        };

        for (const item of rawBookmarks) {
            idsByType[item.content_type_name].add(String(item.object_id));
        }

        const [eventMap, newsMap, opportunityMap, diasporaMap, announcementMap] = await Promise.all([
            fetchContentMap("/events/?page_size=100", idsByType.event),
            fetchContentMap("/articles/?page_size=100", idsByType.newsarticle),
            fetchContentMap("/opportunities/?page_size=100", idsByType.opportunity),
            fetchContentMap("/diaspora/?page_size=100", idsByType.diasporapost),
            fetchContentMap("/announcements/?page_size=100", idsByType.announcement),
        ]);

        const mapByType: Record<BookmarkContentType, HydrationMap> = {
            event: eventMap,
            newsarticle: newsMap,
            opportunity: opportunityMap,
            diasporapost: diasporaMap,
            announcement: announcementMap,
        };

        const hydrated = rawBookmarks
            .map((item) => {
                const content = mapByType[item.content_type_name][String(item.object_id)];
                if (!content) return null;
                return {
                    ...item,
                    object_id: Number.isNaN(Number(item.object_id))
                        ? item.object_id
                        : Number(item.object_id),
                    content_object: content,
                } as Bookmark;
            })
            .filter((item): item is Bookmark => item !== null);

        const bookmarks: BookmarksResponse = {
            count: hydrated.length,
            next: null,
            previous: null,
            results: hydrated,
        };

        return {
            bookmarks,
            stats: buildStats(hydrated),
        };
    } catch (error) {
        console.error("Error fetching user bookmarks:", error);
        const empty: BookmarksResponse = {
            count: 0,
            next: null,
            previous: null,
            results: [],
        };
        return { bookmarks: empty, stats: buildStats([]) };
    }
}
