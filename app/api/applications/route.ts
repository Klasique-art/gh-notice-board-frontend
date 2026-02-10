import { NextResponse } from "next/server";
import { BASE_URL } from "@/data/constants";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const incomingContentType = request.headers.get("content-type") || "";
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${token}`);

        let body: BodyInit;
        if (incomingContentType.includes("multipart/form-data")) {
            body = await request.formData();
        } else {
            headers.set("Content-Type", "application/json");
            body = JSON.stringify(await request.json());
        }

        const response = await fetch(`${BASE_URL}/applications/`, {
            method: "POST",
            headers,
            body,
            cache: "no-store",
        });

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
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to submit application",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
