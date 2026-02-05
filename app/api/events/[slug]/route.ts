import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/data/constants';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access_token')?.value;

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const url = `${BASE_URL}/events/${slug}/`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // ✅ Get the raw response text first
        const responseText = await response.text();
        console.log('Raw Response (first 500 chars):', responseText.substring(0, 500));

        // ✅ Try to parse as JSON
        let data;
        try {
            data = JSON.parse(responseText);
            console.log('Parsed JSON:', data);
        } catch (parseError) {
            console.error('Failed to parse JSON. Response was:', responseText.slice(0, 500));
            return NextResponse.json(
                { 
                    error: 'Backend returned invalid JSON',
                    status: response.status,
                    contentType: response.headers.get('content-type'),
                    preview: responseText.substring(0, 200)
                },
                { status: 500 }
            );
        }

        if (!response.ok) {
            console.error('Backend error:', data);
            return NextResponse.json(
                { error: data.detail || data.error || 'Failed to fetch event' },
                { status: response.status }
            );
        }

        console.log('✅ Event fetched successfully');
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('❌ Unexpected error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}