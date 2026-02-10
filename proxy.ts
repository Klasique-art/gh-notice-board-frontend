import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("access_token");
    const refreshToken = request.cookies.get("refresh_token");
    const isPrefetchRequest =
        request.headers.get("purpose") === "prefetch" ||
        request.headers.get("next-router-prefetch") !== null;

    const isDashboardRoute = pathname.startsWith("/dashboard");
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

    // Redirect logged-in users away from auth pages (real navigations only).
    if (isAuthRoute && refreshToken) {
        if (isPrefetchRequest) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Require refresh token for dashboard access.
    if (isDashboardRoute && !refreshToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Refresh missing access token on non-auth routes only.
    if (!accessToken && refreshToken && !isAuthRoute) {
        try {
            const refreshResponse = await fetch(
                `${request.nextUrl.origin}/api/auth/refresh`,
                {
                    method: "POST",
                    headers: {
                        Cookie: `refresh_token=${refreshToken.value}`,
                    },
                }
            );

            if (refreshResponse.ok) {
                const setCookieHeader = refreshResponse.headers.get("set-cookie");
                if (setCookieHeader) {
                    const response = NextResponse.next();
                    response.headers.set("set-cookie", setCookieHeader);
                    return response;
                }
            } else if (isDashboardRoute) {
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("redirect", pathname);
                loginUrl.searchParams.set("session_expired", "true");
                return NextResponse.redirect(loginUrl);
            }
        } catch {
            if (isDashboardRoute) {
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("redirect", pathname);
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth/).*)",
    ],
};
