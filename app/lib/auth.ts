// app/lib/auth.ts
import { BASE_URL } from "@/data/constants";
import { CurrentUser } from "@/types/general.types";
import { fetchWithAuth, getAuthToken } from "@/app/lib/serverAuth";

export async function isAuthenticated(): Promise<boolean> {
    const token = await getAuthToken();
    return !!token;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
    try {
        const token = await getAuthToken();
        
        // If no token, return null immediately (user not logged in)
        if (!token) {
            return null;
        }

        const response = await fetchWithAuth(`${BASE_URL}/users/me/`, {
            method: 'GET',
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const user = await response.json();
        return user as CurrentUser;

    } catch (error) {
        // Silent fail for unauthenticated users
        return null;
    }
}