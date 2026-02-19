import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/data/constants";

const BOOKMARKS_URL = `${BASE_URL}/interactions/bookmarks/`;

type BookmarkType = "news" | "event" | "opportunity" | "diaspora";

type BookmarkPayload = {
    type: BookmarkType;
    object_id: string | number;
};

function isBookmarkType(value: unknown): value is BookmarkType {
    return (
        value === "news" ||
        value === "event" ||
        value === "opportunity" ||
        value === "diaspora"
    );
}

async function getTokenOrResponse(): Promise<string | NextResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    return token;
}

async function proxyJsonResponse(response: Response): Promise<NextResponse> {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    }

    const text = await response.text();
    return NextResponse.json(
        {
            error: "Unexpected backend response",
            details: text.slice(0, 500),
        },
        { status: response.status || 502 }
    );
}

function validatePayload(payload: unknown): payload is BookmarkPayload {
    if (!payload || typeof payload !== "object") return false;
    const candidate = payload as Partial<BookmarkPayload>;
    return (
        isBookmarkType(candidate.type) &&
        (typeof candidate.object_id === "string" || typeof candidate.object_id === "number")
    );
}

export async function GET(request: Request) {
    try {
        const tokenOrResponse = await getTokenOrResponse();
        if (tokenOrResponse instanceof NextResponse) {
            return tokenOrResponse;
        }

        const { search } = new URL(request.url);
        const backendUrl = `${BOOKMARKS_URL}${search}`;
        const response = await fetch(backendUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tokenOrResponse}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        return proxyJsonResponse(response);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to fetch bookmarks",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const tokenOrResponse = await getTokenOrResponse();
        if (tokenOrResponse instanceof NextResponse) {
            return tokenOrResponse;
        }

        const payload = (await request.json()) as unknown;
        if (!validatePayload(payload)) {
            return NextResponse.json(
                {
                    error: "Invalid payload",
                    details: 'Expected { "type": "news|event|opportunity|diaspora", "object_id": "UUID_OR_ID" }',
                },
                { status: 400 }
            );
        }

        const response = await fetch(BOOKMARKS_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${tokenOrResponse}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        return proxyJsonResponse(response);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to create bookmark",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const tokenOrResponse = await getTokenOrResponse();
        if (tokenOrResponse instanceof NextResponse) {
            return tokenOrResponse;
        }

        const payload = (await request.json()) as unknown;
        if (!validatePayload(payload)) {
            return NextResponse.json(
                {
                    error: "Invalid payload",
                    details: 'Expected { "type": "news|event|opportunity|diaspora", "object_id": "UUID_OR_ID" }',
                },
                { status: 400 }
            );
        }

        const response = await fetch(BOOKMARKS_URL, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${tokenOrResponse}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        return proxyJsonResponse(response);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to remove bookmark",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
