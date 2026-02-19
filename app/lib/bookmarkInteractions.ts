"use client";

import { fetchWithAuth } from "@/app/lib/apiClient";

export type BookmarkInteractionType = "news" | "event" | "opportunity" | "diaspora";

export type BookmarkInteractionPayload = {
    type: BookmarkInteractionType;
    object_id: string | number;
};

type ApiErrorShape = {
    detail?: string;
    error?: string;
    message?: string;
};

function normalizeApiError(data: ApiErrorShape, fallback: string): string {
    return data.detail || data.error || data.message || fallback;
}

async function sendBookmarkRequest(
    method: "POST" | "DELETE",
    payload: BookmarkInteractionPayload
): Promise<void> {
    const response = await fetchWithAuth("/api/interactions/bookmarks/", {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) return;

    const data = (await response.json().catch(() => ({}))) as ApiErrorShape;
    if (response.status === 401) {
        throw new Error("Please sign in to manage bookmarks.");
    }

    const fallback =
        method === "POST"
            ? "Unable to save this item right now."
            : "Unable to remove this item right now.";
    throw new Error(normalizeApiError(data, fallback));
}

export async function addBookmark(
    payload: BookmarkInteractionPayload
): Promise<void> {
    await sendBookmarkRequest("POST", payload);
}

export async function removeBookmark(
    payload: BookmarkInteractionPayload
): Promise<void> {
    await sendBookmarkRequest("DELETE", payload);
}
