'use client';

import { useEffect, useCallback } from 'react';

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
 * Get access token from cookies
 */
function getAccessToken(): string | null {
    try {
        const cookies = document.cookie.split(';');
        const accessTokenCookie = cookies.find(c => c.trim().startsWith('access_token='));

        if (!accessTokenCookie) return null;

        return accessTokenCookie.split('=')[1];
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

/**
 * Check if refresh token exists
 */
function hasRefreshToken(): boolean {
    try {
        const cookies = document.cookie.split(';');
        return cookies.some(c => c.trim().startsWith('refresh_token='));
    } catch (error) {
        return false;
    }
}

/**
 * Custom hook for automatic token refresh
 * Monitors token expiration and refreshes automatically in the background
 */
export function useAuth() {
    const refreshToken = useCallback(async () => {
        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('✅ Background token refresh successful');
                return true;
            } else {
                console.error('❌ Background token refresh failed');
                return false;
            }
        } catch (error) {
            console.error('Background token refresh error:', error);
            return false;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            // Call logout endpoint to clear cookies
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Redirect to login regardless of API call result
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return;

        // Check if user has refresh token
        if (!hasRefreshToken()) {
            console.log('No refresh token found, skipping background refresh');
            return;
        }

        // Function to check and refresh token
        const checkAndRefresh = async () => {
            const token = getAccessToken();

            if (!token) {
                console.log('No access token, attempting refresh...');
                await refreshToken();
                return;
            }

            const payload = decodeToken(token);
            if (!payload || !payload.exp) {
                console.log('Invalid token, attempting refresh...');
                await refreshToken();
                return;
            }

            const now = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = payload.exp - now;

            // Refresh if token expires in less than 2 minutes
            if (timeUntilExpiry < 120) {
                console.log(`Token expires in ${timeUntilExpiry}s, refreshing in background...`);
                const success = await refreshToken();

                if (!success && timeUntilExpiry < 0) {
                    // Token expired and refresh failed, logout
                    console.log('Token expired and refresh failed, logging out...');
                    logout();
                }
            }
        };

        // Check immediately on mount
        checkAndRefresh();

        // Check every 60 seconds
        const interval = setInterval(checkAndRefresh, 60 * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, logout]);

    return {
        logout,
        refreshToken,
    };
}
