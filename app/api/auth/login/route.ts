import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const response = await fetch(`${BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', Object.fromEntries(response.headers));

        // Check content type before parsing
        const contentType = response.headers.get('content-type');
        console.log('📡 Content-Type:', contentType);

        // If not JSON, log the actual response
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ Backend returned non-JSON response:');
            console.error('Status:', response.status);
            console.error('Content-Type:', contentType);
            console.error('Response body:', text.substring(0, 500)); // First 500 chars
            
            return NextResponse.json(
                { 
                    error: 'Backend returned invalid response',
                    details: `Expected JSON but got ${contentType}`,
                    status: response.status,
                    preview: text.substring(0, 200)
                },
                { status: 502 }
            );
        }

        const data = await response.json();

        if (!response.ok) {
            console.log('❌ Login error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        // Success - Set HttpOnly cookies for token
        const nextResponse = NextResponse.json(
            {
                message: data.message || 'Login successful',
                user: data.user,
            },
            { status: 200 }
        );

        // Ghana Notice Board uses Token Authentication (not JWT by default)
        // Set token cookie (DRF Token doesn't expire)
        if (data.token) {
            nextResponse.cookies.set('auth_token', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days for DRF Token
                path: '/',
            });
        }

        // If using JWT (simplejwt), set access and refresh tokens
        if (data.access && data.refresh) {
            console.log('🔐 Setting JWT tokens');
            const accessTokenExpiry = getTokenExpiration(data.access);
            const refreshTokenExpiry = getTokenExpiration(data.refresh);

            // console.log('Access token expires in:', accessTokenExpiry, 'seconds');
            // console.log('Refresh token expires in:', refreshTokenExpiry, 'seconds');

            nextResponse.cookies.set('access_token', data.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: accessTokenExpiry || 60 * 5, // Default 5 minutes
                path: '/',
            });

            nextResponse.cookies.set('refresh_token', data.refresh, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: refreshTokenExpiry || 60 * 60 * 24, // Default 1 day
                path: '/',
            });
        }
        return nextResponse;

    } catch (error) {
        console.error('💥 Login API error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to process login request',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}