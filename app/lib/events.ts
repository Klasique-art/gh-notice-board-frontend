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

        // Search
        if (filters.search) params.set('search', filters.search);

        // Category (number ID)
        if (filters.category) params.set('category', filters.category.toString());

        // Status (no 'all' - handle in UI)
        if (filters.status) params.set('status', filters.status);

        // Event type
        if (filters.event_type) params.set('event_type', filters.event_type);

        // Boolean filters
        if (filters.is_featured !== undefined) params.set('is_featured', filters.is_featured.toString());
        if (filters.is_free !== undefined) params.set('is_free', filters.is_free.toString());

        // Date filters (using backend field names)
        if (filters.start_date__gte) params.set('start_date__gte', filters.start_date__gte);
        if (filters.start_date__lte) params.set('start_date__lte', filters.start_date__lte);

        // Location
        if (filters.location) params.set('location', filters.location);

        // Ordering
        if (filters.ordering) params.set('ordering', filters.ordering);

        // Pagination
        if (filters.page) params.set('page', filters.page.toString());
        if (filters.page_size) params.set('page_size', filters.page_size.toString());

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
 * Fetch event details by slug (backend uses slug for lookups)
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
    const now = new Date().toISOString();
    return getEvents({
        start_date__gte: now,
        status: 'published',
        ordering: 'start_date',
        page_size: limit,
        page: 1,
    });
}

/**
 * Fetch featured events
 */
export async function getFeaturedEvents(limit: number = 6): Promise<PaginatedEventsResponse> {
    return getEvents({
        is_featured: true,
        status: 'published',
        ordering: 'start_date',
        page_size: limit,
        page: 1,
    });
}

/**
 * Fetch trending events (based on views)
 */
export async function getTrendingEvents(limit: number = 10): Promise<PaginatedEventsResponse> {
    return getEvents({
        status: 'published',
        ordering: '-views_count',
        page_size: limit,
        page: 1,
    });
}

/**
 * Fetch events by category ID
 */
export async function getEventsByCategory(
    categoryId: number,
    page: number = 1,
    pageSize: number = 10
): Promise<PaginatedEventsResponse> {
    return getEvents({
        category: categoryId,
        status: 'published',
        ordering: 'start_date',
        page,
        page_size: pageSize,
    });
}

/**
 * Search events
 */
export async function searchEvents(
    query: string,
    page: number = 1,
    pageSize: number = 10
): Promise<PaginatedEventsResponse> {
    return getEvents({
        search: query,
        status: 'published',
        ordering: 'start_date',
        page,
        page_size: pageSize,
    });
}

/**
 * Fetch free events
 */
export async function getFreeEvents(
    page: number = 1,
    pageSize: number = 10
): Promise<PaginatedEventsResponse> {
    return getEvents({
        is_free: true,
        status: 'published',
        ordering: 'start_date',
        page,
        page_size: pageSize,
    });
}

/**
 * Fetch events created by a specific user (for My Events page)
 * Requires authentication - should be called from server components with access token
 */
export async function getMyEvents(
    userId: string,
    filters: Omit<EventFilters, 'organizer'> = {}
): Promise<PaginatedEventsResponse> {
    try {
        const params = new URLSearchParams();

        // Add organizer filter
        params.set('organizer', userId);

        // Add other filters
        if (filters.search) params.set('search', filters.search);
        if (filters.status) params.set('status', filters.status);
        if (filters.category) params.set('category', filters.category.toString());
        if (filters.event_type) params.set('event_type', filters.event_type);
        if (filters.is_featured !== undefined) params.set('is_featured', filters.is_featured.toString());
        if (filters.is_free !== undefined) params.set('is_free', filters.is_free.toString());
        if (filters.start_date__gte) params.set('start_date__gte', filters.start_date__gte);
        if (filters.start_date__lte) params.set('start_date__lte', filters.start_date__lte);
        if (filters.location) params.set('location', filters.location);
        if (filters.ordering) params.set('ordering', filters.ordering);
        if (filters.page) params.set('page', filters.page.toString());
        if (filters.page_size) params.set('page_size', filters.page_size.toString());

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
            throw new Error(`Failed to fetch my events: ${response.status}`);
        }

        const data: PaginatedEventsResponse = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching my events:', error);
        throw error;
    }
}
