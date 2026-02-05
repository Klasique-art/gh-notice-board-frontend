// app/lib/serverAuth.ts
import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    return token || null;
}

export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('refresh_token')?.value;
    return token || null;
}

/**
 * Decode JWT token to get expiration time (server-side)
 */
export function getTokenExpiration(token: string): number | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = JSON.parse(
            Buffer.from(parts[1], 'base64').toString('utf-8')
        );

        if (payload.exp) {
            const now = Math.floor(Date.now() / 1000);
            return payload.exp - now; // Returns seconds until expiration
        }

        return null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

/**
 * Make authenticated request to Django backend
 * Returns 401 response if no token instead of throwing error
 */
export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = await getAuthToken();

    if (!token) {
        // Return 401 instead of throwing - allows graceful handling
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');

    return fetch(url, {
        ...options,
        headers,
    });
}