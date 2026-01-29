// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { error: 'No refresh token' },
                { status: 401 }
            );
        }

        const response = await fetch(`${BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Token refresh failed' },
                { status: 401 }
            );
        }

        const data = await response.json();

        // Set new access token cookie
        const nextResponse = NextResponse.json(
            { success: true },
            { status: 200 }
        );

        nextResponse.cookies.set('access_token', data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 5, // 5 minutes
            path: '/',
        });

        return nextResponse;

    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}