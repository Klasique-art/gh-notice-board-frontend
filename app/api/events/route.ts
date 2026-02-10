// app/api/events/route.ts
import { NextResponse } from "next/server";
import { getEvents } from "@/app/lib/events";
import { EventFilters } from "@/types/events.types";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number.parseInt(searchParams.get('page') || '1', 10);
        const pageSize = Number.parseInt(searchParams.get('page_size') || '20', 10);

        // Build filters from query params
        const filters: EventFilters = {
            search: searchParams.get('search') || undefined,
            category: searchParams.get('category') || undefined,
            category_slug: searchParams.get('category_slug') || undefined,
            tag: searchParams.get('tag') || undefined,
            organizer: searchParams.get('organizer') || undefined,
            event_type: (searchParams.get('event_type') as EventFilters['event_type']) || undefined,
            is_featured: searchParams.get('is_featured') === 'true' ? true : undefined,
            is_free: searchParams.get('is_free') === 'true' ? true : undefined,
            is_virtual: searchParams.get('is_virtual') === 'true' ? true : undefined,
            date_from: searchParams.get('date_from') || undefined,
            date_to: searchParams.get('date_to') || undefined,
            location: searchParams.get('location') || undefined,
            city: searchParams.get('city') || undefined,
            region: searchParams.get('region') || undefined,
            status: (searchParams.get('status') as EventFilters['status']) || undefined,
            ordering: searchParams.get('ordering') || 'start_date',
            page: Number.isNaN(page) ? 1 : page,
            page_size: Number.isNaN(pageSize) ? 20 : pageSize,
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
