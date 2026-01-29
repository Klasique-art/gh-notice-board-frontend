// app/lib/events.ts
import { BASE_URL } from "@/data/constants";
import {
    PaginatedEventsResponse,
    EventFilters,
    EventDetail,
} from "@/types/events.types";

/**
 * Fetch paginated events from the backend
 */
export async function getEvents(filters: EventFilters = {}): Promise<PaginatedEventsResponse> {
    try {
        const params = new URLSearchParams();

        if (filters.search) params.set('search', filters.search);
        if (filters.category) params.set('category', filters.category);
        if (filters.category_slug) params.set('category_slug', filters.category_slug);
        if (filters.tag) params.set('tag', filters.tag);
        if (filters.organizer) params.set('organizer', filters.organizer);
        if (filters.status && filters.status !== 'all') params.set('status', filters.status);
        if (filters.event_type) params.set('event_type', filters.event_type);
        if (filters.is_featured !== undefined) params.set('is_featured', filters.is_featured.toString());
        if (filters.is_trending !== undefined) params.set('is_trending', filters.is_trending.toString());
        if (filters.is_upcoming !== undefined) params.set('is_upcoming', filters.is_upcoming.toString());
        if (filters.start_date_from) params.set('start_date_from', filters.start_date_from);
        if (filters.start_date_to) params.set('start_date_to', filters.start_date_to);
        if (filters.ordering) params.set('ordering', filters.ordering);
        if (filters.page) params.set('page', filters.page.toString());

        const queryString = params.toString();
        const url = `${BASE_URL}/events/${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data: PaginatedEventsResponse = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

/**
 * Fetch event details by slug
 */
export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
    try {
        const url = `${BASE_URL}/events/${slug}/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (response.status === 404) {
            console.log(`Event not found: ${slug}`);
            return null;
        }

        if (!response.ok) {
            console.error(`Failed to fetch event: ${response.status}`);
            throw new Error(`Failed to fetch event: ${response.status}`);
        }

        const data: EventDetail = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching event ${slug}:`, error);
        throw error;
    }
}

/**
 * Fetch upcoming events
 */
export async function getUpcomingEvents(limit: number = 10): Promise<PaginatedEventsResponse> {
    return getEvents({
        is_upcoming: true,
        ordering: 'start_date',
        page: 1,
    });
}

/**
 * Fetch featured events
 */
export async function getFeaturedEvents(limit: number = 6): Promise<PaginatedEventsResponse> {
    return getEvents({
        is_featured: true,
        ordering: 'start_date',
        page: 1,
    });
}

/**
 * Fetch trending events
 */
export async function getTrendingEvents(limit: number = 10): Promise<PaginatedEventsResponse> {
    return getEvents({
        is_trending: true,
        ordering: '-views_count',
        page: 1,
    });
}

/**
 * Fetch events by category
 */
export async function getEventsByCategory(
    categorySlug: string,
    page: number = 1
): Promise<PaginatedEventsResponse> {
    return getEvents({
        category_slug: categorySlug,
        ordering: 'start_date',
        page,
    });
}

/**
 * Search events
 */
export async function searchEvents(
    query: string,
    page: number = 1
): Promise<PaginatedEventsResponse> {
    return getEvents({
        search: query,
        ordering: 'start_date',
        page,
    });
}