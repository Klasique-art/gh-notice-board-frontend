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
        const { username, email, password, password2, first_name, last_name } = body;

        // Step 1: Register the user
        const signupResponse = await fetch(`${BASE_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ 
                username, 
                email, 
                password, 
                password2, 
                first_name, 
                last_name 
            }),
        });

        // Check content type before parsing
        const contentType = signupResponse.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
            const text = await signupResponse.text();
            console.error('❌ Backend returned non-JSON response:');
            console.error('Response body:', text.substring(0, 500));
            
            return NextResponse.json(
                { 
                    error: 'Backend returned invalid response',
                    details: `Expected JSON but got ${contentType}`,
                    preview: text.substring(0, 200)
                },
                { status: 502 }
            );
        }

        const signupData = await signupResponse.json();

        if (!signupResponse.ok) {
            console.log('❌ Signup error:', signupData);
            return NextResponse.json(signupData, { status: signupResponse.status });
        }
        
        const loginResponse = await fetch(`${BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ 
                username, 
                password
            }),
        });

        console.log('📡 Login response status:', loginResponse.status);

        const loginContentType = loginResponse.headers.get('content-type');
        
        if (!loginContentType || !loginContentType.includes('application/json')) {
            console.warn('⚠️ Auto-login returned non-JSON response');
            // Registration succeeded but auto-login failed
            return NextResponse.json(
                {
                    message: 'Account created successfully. Please login.',
                    user: signupData,
                },
                { status: 201 }
            );
        }

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            console.warn('⚠️ Auto-login failed:', loginData);
            // Registration succeeded but login failed - still return success
            return NextResponse.json(
                {
                    message: 'Account created successfully. Please login.',
                    user: signupData,
                },
                { status: 201 }
            );
        }

        console.log('✅ Auto-login successful');

        // Success - Set auth token in HttpOnly cookie
        const nextResponse = NextResponse.json(
            {
                message: 'Account created and logged in successfully',
                user: loginData.user || signupData,
            },
            { status: 201 }
        );

        // Handle Token Authentication (DRF Token)
        if (loginData.token) {
            console.log('🔐 Setting DRF token cookie');
            nextResponse.cookies.set('auth_token', loginData.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
        }

        // Handle JWT Authentication (if backend uses JWT)
        if (loginData.access && loginData.refresh) {
            console.log('🔐 Setting JWT tokens');
            const accessTokenExpiry = getTokenExpiration(loginData.access);
            const refreshTokenExpiry = getTokenExpiration(loginData.refresh);

            nextResponse.cookies.set('access_token', loginData.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: accessTokenExpiry || 60 * 5,
                path: '/',
            });

            nextResponse.cookies.set('refresh_token', loginData.refresh, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: refreshTokenExpiry || 60 * 60 * 24,
                path: '/',
            });
        }

        console.log('✅ Signup and auto-login complete');

        return nextResponse;

    } catch (error) {
        console.error('💥 Signup error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to process signup request',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}