// app/lib/auth.ts
import { BASE_URL } from "@/data/constants";
import { CurrentUser } from "@/types/general.types";
import { fetchWithAuth, getAuthToken } from "@/app/lib/serverAuth";

export async function isAuthenticated(): Promise<boolean> {
    const token = await getAuthToken();
    return !!token;
}

function normalizeCurrentUser(rawUser: unknown): CurrentUser {
    const user = (rawUser ?? {}) as Partial<CurrentUser> & {
        profile?: Partial<CurrentUser["profile"]> | null;
    };
    const profile: Partial<CurrentUser["profile"]> = user.profile ?? {};

    return {
        id: user.id ?? "",
        username: user.username ?? "",
        email: user.email ?? "",
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        full_name: user.full_name ?? "",
        display_name: user.display_name ?? user.full_name ?? user.username ?? "",
        bio: user.bio ?? "",
        location: user.location ?? "",
        website: user.website ?? "",
        twitter_username: user.twitter_username ?? "",
        linkedin_url: user.linkedin_url ?? "",
        github_username: user.github_username ?? "",
        avatar: user.avatar ?? null,
        cover_image: user.cover_image ?? null,
        is_public: user.is_public ?? true,
        email_notifications: user.email_notifications ?? true,
        push_notifications: user.push_notifications ?? true,
        followers_count: user.followers_count ?? 0,
        following_count: user.following_count ?? 0,
        posts_count: user.posts_count ?? 0,
        is_verified: user.is_verified ?? false,
        verification_badge: user.verification_badge ?? "",
        user_type: user.user_type ?? "regular",
        is_following: user.is_following ?? false,
        created_at: user.created_at ?? new Date().toISOString(),
        updated_at: user.updated_at ?? new Date().toISOString(),
        last_seen: user.last_seen ?? null,
        profile: {
            occupation: profile.occupation ?? "",
            company: profile.company ?? "",
            skills: Array.isArray(profile.skills) ? profile.skills : [],
            interests: Array.isArray(profile.interests) ? profile.interests : [],
            show_email: profile.show_email ?? false,
            show_location: profile.show_location ?? true,
            allow_messages: profile.allow_messages ?? true,
            theme: profile.theme ?? "auto",
            language: profile.language ?? "en",
            created_at: profile.created_at ?? user.created_at ?? new Date().toISOString(),
            updated_at: profile.updated_at ?? user.updated_at ?? new Date().toISOString(),
        },
    };
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
        return normalizeCurrentUser(user);

    } catch {
        // Silent fail for unauthenticated users
        return null;
    }
}
