// lib/news.ts
import { BASE_URL } from "@/data/constants";
import { PaginatedNewsResponse, NewsFilters, NewsArticleDetail } from "@/types/news.types";

/**
 * Fetch paginated news articles from the backend
 * 
 * @param filters - Filter and pagination options
 * @returns Paginated news response
 */
export async function getNews(filters: NewsFilters = {}): Promise<PaginatedNewsResponse> {
    try {
        // Build query params
        const params = new URLSearchParams();

        if (filters.search) params.set('search', filters.search);
        if (filters.category) params.set('category', filters.category);
        if (filters.category_slug) params.set('category_slug', filters.category_slug);
        if (filters.tag) params.set('tag', filters.tag);
        if (filters.author) params.set('author', filters.author);
        if (filters.status && filters.status !== 'all') params.set('status', filters.status);
        if (filters.is_featured !== undefined) params.set('is_featured', filters.is_featured.toString());
        if (filters.is_breaking !== undefined) params.set('is_breaking', filters.is_breaking.toString());
        if (filters.is_trending !== undefined) params.set('is_trending', filters.is_trending.toString());
        if (filters.is_ai_generated !== undefined) params.set('is_ai_generated', filters.is_ai_generated.toString());
        if (filters.date_from) params.set('date_from', filters.date_from);
        if (filters.date_to) params.set('date_to', filters.date_to);
        if (filters.ordering) params.set('ordering', filters.ordering);
        if (filters.page) params.set('page', filters.page.toString());

        const queryString = params.toString();
        const url = `${BASE_URL}/articles/${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache news listings
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const data: PaginatedNewsResponse = await response.json();
        
        return data;

    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}

/**
 * Fetch news article details by slug
 * 
 * @param slug - Article slug
 * @returns News article details or null if not found
 */
export async function getNewsBySlug(slug: string): Promise<NewsArticleDetail | null> {
    try {
        const url = `${BASE_URL}/articles/${slug}/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Don't cache article details
        });

        // Handle 404 - Article not found
        if (response.status === 404) {
            console.log(`News article not found: ${slug}`);
            return null;
        }

        // Handle other errors
        if (!response.ok) {
            console.error(`Failed to fetch news article: ${response.status}`);
            throw new Error(`Failed to fetch news article: ${response.status}`);
        }

        const data: NewsArticleDetail = await response.json();
        
        return data;

    } catch (error) {
        console.error(`Error fetching news article ${slug}:`, error);
        throw error;
    }
}

/**
 * Fetch breaking news articles
 * 
 * @param limit - Number of breaking news to fetch (default: 5)
 * @returns Array of breaking news articles
 */
export async function getBreakingNews(limit: number = 5): Promise<PaginatedNewsResponse> {
    return getNews({
        is_breaking: true,
        ordering: '-published_at',
        page: 1,
    });
}

/**
 * Fetch featured news articles
 * 
 * @param limit - Number of featured news to fetch (default: 6)
 * @returns Array of featured news articles
 */
export async function getFeaturedNews(limit: number = 6): Promise<PaginatedNewsResponse> {
    return getNews({
        is_featured: true,
        ordering: '-published_at',
        page: 1,
    });
}

/**
 * Fetch trending news articles
 * 
 * @param limit - Number of trending news to fetch (default: 10)
 * @returns Array of trending news articles
 */
export async function getTrendingNews(limit: number = 10): Promise<PaginatedNewsResponse> {
    return getNews({
        is_trending: true,
        ordering: '-views_count',
        page: 1,
    });
}

/**
 * Fetch news by category
 * 
 * @param categorySlug - Category slug
 * @param page - Page number
 * @returns Paginated news for the category
 */
export async function getNewsByCategory(categorySlug: string, page: number = 1): Promise<PaginatedNewsResponse> {
    return getNews({
        category_slug: categorySlug,
        ordering: '-published_at',
        page,
    });
}

/**
 * Search news articles
 * 
 * @param query - Search query
 * @param page - Page number
 * @returns Paginated search results
 */
export async function searchNews(query: string, page: number = 1): Promise<PaginatedNewsResponse> {
    return getNews({
        search: query,
        ordering: '-published_at',
        page,
    });
}