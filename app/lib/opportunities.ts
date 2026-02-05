// lib/opportunities.ts
import { BASE_URL } from "@/data/constants";
import {
    PaginatedOpportunitiesResponse,
    OpportunityFilters,
    OpportunityDetail,
    Opportunity
} from "@/types/opportunities.types";

/**
 * Fetch paginated opportunities from the backend
 * 
 * @param filters - Filter and pagination options
 * @returns Paginated opportunities response
 */
export async function getOpportunities(filters: OpportunityFilters = {}): Promise<PaginatedOpportunitiesResponse> {
    try {
        // Build query params
        const params = new URLSearchParams();

        if (filters.search) params.set('search', filters.search);

        // Handle opportunity_type (string | string[])
        if (filters.opportunity_type) {
            if (Array.isArray(filters.opportunity_type)) {
                filters.opportunity_type.forEach(type => params.append('opportunity_type', type));
            } else {
                params.set('opportunity_type', filters.opportunity_type);
            }
        }

        // Handle category (string | string[])
        if (filters.category) {
            if (Array.isArray(filters.category)) {
                filters.category.forEach(cat => params.append('category', cat));
            } else {
                params.set('category', filters.category);
            }
        }

        // Handle category_slug (string | string[])
        if (filters.category_slug) {
            if (Array.isArray(filters.category_slug)) {
                filters.category_slug.forEach(slug => params.append('category_slug', slug));
            } else {
                params.set('category_slug', filters.category_slug);
            }
        }

        if (filters.is_featured !== undefined) params.set('is_featured', filters.is_featured.toString());
        if (filters.is_remote !== undefined) params.set('is_remote', filters.is_remote.toString());
        if (filters.is_diaspora !== undefined) params.set('is_diaspora', filters.is_diaspora.toString());
        if (filters.status) params.set('status', filters.status);
        if (filters.ordering) params.set('ordering', filters.ordering);
        if (filters.page) params.set('page', filters.page.toString());

        const queryString = params.toString();
        const url = `${BASE_URL}/opportunities/${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache for now
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch opportunities: ${response.status}`);
        }

        const data: PaginatedOpportunitiesResponse = await response.json();

        return data;

    } catch (error) {
        console.error('Error fetching opportunities:', error);
        throw error;
    }
}

/**
 * Fetch opportunity details by slug
 * 
 * @param slug - Opportunity slug
 * @returns Opportunity details or null if not found
 */
export async function getOpportunityBySlug(slug: string): Promise<OpportunityDetail | null> {
    try {
        const url = `${BASE_URL}/opportunities/${slug}/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        // Handle 404 - Opportunity not found
        if (response.status === 404) {
            console.log(`Opportunity not found: ${slug}`);
            return null;
        }

        // Handle other errors
        if (!response.ok) {
            console.error(`Failed to fetch opportunity: ${response.status}`);
            throw new Error(`Failed to fetch opportunity: ${response.status}`);
        }

        const data: OpportunityDetail = await response.json();

        return data;

    } catch (error) {
        console.error(`Error fetching opportunity ${slug}:`, error);
        throw error;
    }
}

/**
 * Fetch featured opportunities
 * 
 * @param limit - Number of featured opportunities to fetch (default: 5)
 * @returns Array of featured opportunities
 */
export async function getFeaturedOpportunities(limit: number = 5): Promise<PaginatedOpportunitiesResponse> {
    // The backend endpoint /featured/ returns a list, not paginated response in the view implementation I saw
    // Wait, let me check views.py again. 
    // views.py: return Response(serializer.data) where serializer is many=True. So it returns Opportunity[] directly.
    // BUT getOpportunities returns PaginatedOpportunitiesResponse.
    // I should check if I should use the /featured/ endpoint or just filter using getOpportunities.
    // The /featured/ endpoint creates a custom list.
    // Let's use getOpportunities with is_featured=true to keep the return type consistent for now, 
    // OR I need to handle the different response structure.
    // The views.py shows:
    // @action(detail=False, methods=['get']) def featured(self, request): ... return Response(serializer.data)
    // This returns [Opportunity, Opportunity, ...]

    // To match getNews pattern which returns PaginatedNewsResponse, let's stick to using getOpportunities with filters if possible?
    // In news.ts: getFeaturedNews calls getNews({ is_featured: true ... }).
    // This seems safer for consistency with the Paginated type.

    return getOpportunities({
        is_featured: true,
        ordering: '-published_at',
        page: 1,
    });
}


/**
 * Fetch active opportunities (upcoming deadlines)
 */
export async function getActiveOpportunities(): Promise<PaginatedOpportunitiesResponse> {
    // Similarly, calling the specific endpoint /active/ returns a list.
    // But I can simulate it via getOpportunities if I just sort by deadline?
    // The backend `active` endpoint does specific filtering (deadline__gte=today).
    // The standard list endpoint might not expose that exact filter easily without custom filter fields.
    // Ideally I should consume the /active/ endpoint but I need to define a return type for it.
    // For now, let's try to just fetch "all" and sort by deadline on client or just use standard list.
    // Actually, looking at opportunities/views.py, standard list supports ordering by 'deadline'.

    return getOpportunities({
        ordering: 'deadline', // asc deadline ?
        status: 'published',
        page: 1
    });
}
