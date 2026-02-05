// app/api/news/route.ts
import { NextResponse } from "next/server";
import { getNews } from "@/app/lib/news";
import { NewsFilters } from "@/types/news.types";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Build filters from query params
        const filters: NewsFilters = {
            search: searchParams.get('search') || undefined,
            category_slug: searchParams.get('category_slug') || undefined,
            tag: searchParams.get('tag') || undefined,
            is_featured: searchParams.get('is_featured') === 'true' ? true : undefined,
            is_breaking: searchParams.get('is_breaking') === 'true' ? true : undefined,
            is_trending: searchParams.get('is_trending') === 'true' ? true : undefined,
            date_from: searchParams.get('date_from') || undefined,
            date_to: searchParams.get('date_to') || undefined,
            ordering: searchParams.get('ordering') || '-published_at',
            page: parseInt(searchParams.get('page') || '1'),
        };

        // Fetch news from backend
        const data = await getNews(filters);

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('API error fetching news:', error);
        return NextResponse.json(
            { 
                error: 'Failed to fetch news',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}