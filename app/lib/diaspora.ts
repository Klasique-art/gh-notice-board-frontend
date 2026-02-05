import {
    DiasporaPost,
    DiasporaPostDetail,
    PaginatedDiasporaResponse,
    DiasporaFilters,
} from "@/types/diaspora.types";
import { BASE_URL } from "@/data/constants";

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Not Found");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API Error: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Fetch paginated diaspora posts with filters
 */
export async function getDiasporaPosts(
    filters: DiasporaFilters = {}
): Promise<PaginatedDiasporaResponse> {
    try {
        const params = new URLSearchParams();

        if (filters.search) params.set("search", filters.search);

        // Handle content_type (string | string[])
        if (filters.content_type) {
            if (Array.isArray(filters.content_type)) {
                filters.content_type.forEach((type) =>
                    params.append("content_type", type)
                );
            } else {
                params.set("content_type", filters.content_type);
            }
        }

        if (filters.category__slug)
            params.set("category__slug", filters.category__slug);
        if (filters.country) params.set("country", filters.country);
        if (filters.region) params.set("region", filters.region);
        if (filters.is_featured !== undefined)
            params.set("is_featured", filters.is_featured.toString());
        if (filters.is_urgent !== undefined)
            params.set("is_urgent", filters.is_urgent.toString());

        if (filters.page) params.set("page", filters.page.toString());
        if (filters.ordering) params.set("ordering", filters.ordering);

        // Default to published status
        params.set("status", "published");

        // Fetch from API
        const response = await fetch(
            `${BASE_URL}/diaspora/posts/?${params.toString()}`,
            {
                next: { revalidate: 60 }, // Revalidate every 60 seconds
            }
        );

        return await handleResponse<PaginatedDiasporaResponse>(response);
    } catch (error) {
        console.error("Error fetching diaspora posts:", error);
        // Return empty structure on error to prevent page crash
        return {
            count: 0,
            next: null,
            previous: null,
            results: [],
        };
    }
}

/**
 * Fetch single diaspora post by slug
 */
export async function getDiasporaPostBySlug(
    slug: string
): Promise<DiasporaPostDetail | null> {
    try {
        const response = await fetch(`${BASE_URL}/diaspora/posts/${slug}/`, {
            next: { revalidate: 300 }, // Cache detail pages longer
        });

        return await handleResponse<DiasporaPostDetail>(response);
    } catch (error) {
        console.error(`Error fetching diaspora post ${slug}:`, error);
        return null; // Return null for 404/error (handled by page)
    }
}

/**
 * Fetch featured diaspora posts
 */
export async function getFeaturedDiasporaPosts(
    limit: number = 3
): Promise<PaginatedDiasporaResponse> {
    try {
        const response = await fetch(
            `${BASE_URL}/diaspora/posts/featured/?limit=${limit}`,
            {
                next: { revalidate: 3600 },
            }
        );
        return await handleResponse<PaginatedDiasporaResponse>(response);
    } catch (error) {
        console.error("Error fetching featured diaspora posts:", error);
        return { count: 0, next: null, previous: null, results: [] };
    }
}
