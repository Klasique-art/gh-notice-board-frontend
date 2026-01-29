// app/api/events/route.ts
import { NextResponse } from "next/server";
import { getEvents } from "@/app/lib/events";
import { EventFilters } from "@/types/events.types";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Build filters from query params
        const filters: EventFilters = {
            search: searchParams.get('search') || undefined,
            category_slug: searchParams.get('category_slug') || undefined,
            tag: searchParams.get('tag') || undefined,
            event_type: (searchParams.get('event_type') as any) || undefined,
            is_featured: searchParams.get('is_featured') === 'true' ? true : undefined,
            is_trending: searchParams.get('is_trending') === 'true' ? true : undefined,
            is_upcoming: searchParams.get('is_upcoming') === 'true' ? true : undefined,
            start_date_from: searchParams.get('start_date_from') || undefined,
            start_date_to: searchParams.get('start_date_to') || undefined,
            ordering: searchParams.get('ordering') || 'start_date',
            page: parseInt(searchParams.get('page') || '1'),
        };

        // Fetch events from backend
        const data = await getEvents(filters);

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('API error fetching events:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch events',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}