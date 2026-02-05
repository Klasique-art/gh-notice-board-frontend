// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

/**
 * Decode JWT token to get expiration time
 */
function getTokenExpiration(token: string): number | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = JSON.parse(
            Buffer.from(parts[1], 'base64').toString('utf-8')
        );

        if (payload.exp) {
            const now = Math.floor(Date.now() / 1000);
            return payload.exp - now;
        }

        return null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        if (!refreshToken) {
            console.log('❌ No refresh token found');
            return NextResponse.json(
                { error: 'No refresh token' },
                { status: 401 }
            );
        }

        console.log('🔄 Attempting to refresh access token...');

        const response = await fetch(`${BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            console.log('❌ Backend token refresh failed:', response.status);
            return NextResponse.json(
                { error: 'Token refresh failed', status: response.status },
                { status: 401 }
            );
        }

        const data = await response.json();
        console.log('✅ Token refresh successful');

        // Calculate token expiration
        const accessTokenExpiry = getTokenExpiration(data.access);
        console.log(`New access token expires in: ${accessTokenExpiry}s`);

        // Set new access token cookie
        const nextResponse = NextResponse.json(
            { success: true },
            { status: 200 }
        );

        nextResponse.cookies.set('access_token', data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: accessTokenExpiry || 60 * 5, // Use actual expiry or default 5 minutes
            path: '/',
        });

        // If backend provides a new refresh token, update it
        if (data.refresh) {
            const refreshTokenExpiry = getTokenExpiration(data.refresh);
            console.log(`New refresh token expires in: ${refreshTokenExpiry}s`);

            nextResponse.cookies.set('refresh_token', data.refresh, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: refreshTokenExpiry || 60 * 60 * 24, // Use actual expiry or default 1 day
                path: '/',
            });
        }

        return nextResponse;

    } catch (error) {
        console.error('💥 Token refresh error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}