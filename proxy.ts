import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('access_token');
    const refreshToken = request.cookies.get('refresh_token');

    // Define route types
    const isDashboardRoute = pathname.startsWith('/dashboard');
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

    // ✅ Redirect logged-in users away from auth pages
    if (isAuthRoute && refreshToken) {
        console.log('🔄 Logged-in user accessing auth page - redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // ✅ If accessing dashboard without any tokens, redirect to login
    if (isDashboardRoute && !refreshToken) {
        console.log('🚫 Unauthorized dashboard access - redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname); // Save where they wanted to go
        return NextResponse.redirect(loginUrl);
    }

    // ✅ If user has refresh token but no access token, try to refresh
    if (!accessToken && refreshToken) {
        console.log('🔄 Access token missing, attempting refresh...');

        try {
            // Call refresh endpoint (FIXED: was /api/auth/refresh-token, now /api/auth/refresh)
            const refreshResponse = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
                method: 'POST',
                headers: {
                    Cookie: `refresh_token=${refreshToken.value}`,
                },
            });

            if (refreshResponse.ok) {
                console.log('✅ Token refreshed in proxy');

                // Get the new access token from response
                const setCookieHeader = refreshResponse.headers.get('set-cookie');

                if (setCookieHeader) {
                    // Create response and set new cookie
                    const response = NextResponse.next();

                    // Forward the Set-Cookie header
                    response.headers.set('set-cookie', setCookieHeader);

                    return response;
                }
            } else {
                console.log('❌ Token refresh failed in proxy');

                // ✅ If refresh failed on dashboard route, redirect to login
                if (isDashboardRoute) {
                    console.log('🚫 Refresh failed on dashboard - redirecting to login');
                    const loginUrl = new URL('/login', request.url);
                    loginUrl.searchParams.set('redirect', pathname);
                    loginUrl.searchParams.set('session_expired', 'true');
                    return NextResponse.redirect(loginUrl);
                }
            }
        } catch (error) {
            console.error('Proxy refresh error:', error);

            // ✅ If refresh errored on dashboard route, redirect to login
            if (isDashboardRoute) {
                console.log('🚫 Refresh error on dashboard - redirecting to login');
                const loginUrl = new URL('/login', request.url);
                loginUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    return NextResponse.next();
}

// Apply proxy to all routes except static files and API routes
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth/).*)',
    ],
};