// app/lib/serverAuth.ts
import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

export async function getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("access_token")?.value || null;
}

export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("refresh_token")?.value || null;
}

function buildHeaders(baseHeaders: HeadersInit | undefined, token: string): Headers {
    const headers = new Headers(baseHeaders);
    headers.set("Authorization", `Bearer ${token}`);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    return headers;
}

async function requestWithToken(
    url: string,
    options: RequestInit,
    token: string
): Promise<Response> {
    return fetch(url, {
        ...options,
        headers: buildHeaders(options.headers, token),
    });
}

async function refreshAccessTokenFromBackend(): Promise<string | null> {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;

    try {
        // Uses backend refresh endpoint directly for server-side resiliency.
        const response = await fetch(`${BASE_URL}/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
            cache: "no-store",
        });

        if (!response.ok) return null;

        const data = (await response.json()) as { access?: string };
        return data.access || null;
    } catch (error) {
        console.error("Server token refresh failed:", error);
        return null;
    }
}

/**
 * Make authenticated request to backend.
 * Falls back to refresh token when access token is missing/expired.
 */
export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const accessToken = await getAuthToken();

    // No access token: try refresh-token fallback for this request.
    if (!accessToken) {
        const refreshedAccess = await refreshAccessTokenFromBackend();
        if (!refreshedAccess) {
            return new Response(JSON.stringify({ error: "Authentication required" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
        return requestWithToken(url, options, refreshedAccess);
    }

    let response = await requestWithToken(url, options, accessToken);

    // Expired/invalid access token: refresh and retry once.
    if (response.status === 401) {
        const refreshedAccess = await refreshAccessTokenFromBackend();
        if (!refreshedAccess) return response;
        response = await requestWithToken(url, options, refreshedAccess);
    }

    return response;
}
