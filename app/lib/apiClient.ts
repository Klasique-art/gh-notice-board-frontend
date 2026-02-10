type FetchOptions = RequestInit & {
    skipAuth?: boolean;
};

/**
 * Make an authenticated API request (Client-side)
 * Automatically refreshes token only after a 401 response.
 */
export async function fetchWithAuth(
    url: string,
    options: FetchOptions = {}
): Promise<Response> {
    const { skipAuth = false, ...fetchOptions } = options;

    // First attempt with current cookies
    let response = await makeRequest(url, fetchOptions);

    // On 401, attempt refresh once and retry
    if (response.status === 401 && !skipAuth) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            response = await makeRequest(url, fetchOptions);
        } else if (
            typeof window !== "undefined" &&
            window.location.pathname.startsWith("/dashboard")
        ) {
            window.location.href = "/login?session_expired=true";
        }
    }

    return response;
}

async function makeRequest(url: string, options: RequestInit): Promise<Response> {
    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    return fetch(url, {
        ...options,
        headers,
        credentials: "include",
    });
}

async function refreshAccessToken(): Promise<boolean> {
    try {
        const response = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
        return response.ok;
    } catch (error) {
        console.error("Token refresh error:", error);
        return false;
    }
}
