type FetchOptions = RequestInit & {
    skipAuth?: boolean; // Skip adding auth header
};

/**
 * Decode JWT token payload (client-side)
 */
function decodeToken(token: string): { exp?: number } | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = JSON.parse(atob(parts[1]));
        return payload;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

/**
 * Check if access token is expired or about to expire
 * Returns true if token expires in less than 1 minute
 */
async function shouldRefreshToken(): Promise<boolean> {
    try {
        // Get access token from cookies (client-side)
        const cookies = document.cookie.split(';');
        const accessTokenCookie = cookies.find(c => c.trim().startsWith('access_token='));

        if (!accessTokenCookie) {
            console.log('No access token found');
            return true; // No token, should refresh
        }

        const token = accessTokenCookie.split('=')[1];
        const payload = decodeToken(token);

        if (!payload || !payload.exp) {
            console.log('Invalid token payload');
            return true;
        }

        const now = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = payload.exp - now;

        // Refresh if token expires in less than 60 seconds
        if (timeUntilExpiry < 60) {
            console.log(`Token expires in ${timeUntilExpiry}s, refreshing proactively...`);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error checking token expiration:', error);
        return false;
    }
}

/**
 * Make an authenticated API request (Client-side)
 * Automatically handles token refresh if access token is expired or about to expire
 */
export async function fetchWithAuth(
    url: string,
    options: FetchOptions = {}
): Promise<Response> {
    const { skipAuth = false, ...fetchOptions } = options;

    // ✅ Proactively refresh token if it's about to expire
    if (!skipAuth && await shouldRefreshToken()) {
        console.log('Proactively refreshing token before request...');
        await refreshAccessToken();
    }

    // First attempt - use existing access token
    let response = await makeRequest(url, fetchOptions, skipAuth);

    // If 401 and not skipping auth, try to refresh token and retry
    if (response.status === 401 && !skipAuth) {
        console.log('Access token expired, attempting refresh...');

        const refreshed = await refreshAccessToken();

        if (refreshed) {
            console.log('Token refreshed, retrying request...');
            // Retry the original request with new token
            response = await makeRequest(url, fetchOptions, skipAuth);
        } else {
            console.error('Token refresh failed, redirecting to login...');
            // Refresh failed - redirect to login (client-side only)
            if (typeof window !== 'undefined') {
                window.location.href = '/login?session_expired=true';
            }
        }
    }

    return response;
}

/**
 * Internal function to make the actual request
 */
async function makeRequest(
    url: string,
    options: RequestInit,
    skipAuth: boolean
): Promise<Response> {
    const headers = new Headers(options.headers);

    // Add default headers
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    // Note: We don't manually add the access token here
    // The browser automatically sends the HttpOnly cookie with the request
    // This is more secure than storing tokens in localStorage

    return fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Important: Send cookies with request
    });
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<boolean> {
    try {
        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include', // Send cookies (including refresh_token)
        });

        if (response.ok) {
            console.log('Access token refreshed successfully');
            return true;
        } else {
            console.error('Failed to refresh token:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}