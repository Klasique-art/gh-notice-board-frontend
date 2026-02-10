import { BASE_URL } from "@/data/constants";
import { fetchWithAuth } from "@/app/lib/serverAuth";
import { Application, ApplicationsResponse } from "@/types/applications.types";

type ApplicationListFilters = {
    page?: number;
    status?: string;
    type?: string;
    search?: string;
};

const DASHBOARD_PAGE_SIZE = 12;

function applyClientFilters(
    applications: Application[],
    type?: string,
    search?: string
): Application[] {
    const normalizedSearch = (search || "").trim().toLowerCase();
    const normalizedType = (type || "").trim().toLowerCase();

    return applications.filter((application) => {
        const matchesType =
            !normalizedType ||
            normalizedType === "all" ||
            application.opportunity_details.opportunity_type === normalizedType;

        if (!matchesType) return false;

        if (!normalizedSearch) return true;

        const title = application.opportunity_details.title.toLowerCase();
        const org = application.opportunity_details.organization_name.toLowerCase();
        const status = application.status_display.toLowerCase();
        return (
            title.includes(normalizedSearch) ||
            org.includes(normalizedSearch) ||
            status.includes(normalizedSearch)
        );
    });
}

async function fetchApplicationsPage(url: string): Promise<ApplicationsResponse> {
    const response = await fetchWithAuth(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch applications: ${response.status}`);
    }

    return response.json();
}

async function fetchAllApplicationsByStatus(status?: string): Promise<Application[]> {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("page_size", "100");
    if (status && status !== "all") {
        params.set("status", status);
    }

    let nextUrl: string | null = `${BASE_URL}/applications/?${params.toString()}`;
    let pageGuard = 0;
    const all: Application[] = [];

    while (nextUrl && pageGuard < 50) {
        const pageData = await fetchApplicationsPage(nextUrl);
        all.push(...pageData.results);
        nextUrl = pageData.next;
        pageGuard += 1;
    }

    return all;
}

export async function getMyApplications(
    filters: ApplicationListFilters = {}
): Promise<ApplicationsResponse> {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const status = filters.status;
    const type = filters.type;
    const search = filters.search;
    const needsClientFiltering =
        (!!type && type !== "all") || (!!search && search.trim().length > 0);

    try {
        if (needsClientFiltering) {
            const all = await fetchAllApplicationsByStatus(status);
            const filtered = applyClientFilters(all, type, search);
            const start = (page - 1) * DASHBOARD_PAGE_SIZE;
            const end = start + DASHBOARD_PAGE_SIZE;
            const current = filtered.slice(start, end);
            const hasPrevious = page > 1;
            const hasNext = end < filtered.length;

            return {
                count: filtered.length,
                previous: hasPrevious
                    ? `${BASE_URL}/applications/?page=${page - 1}&page_size=${DASHBOARD_PAGE_SIZE}`
                    : null,
                next: hasNext
                    ? `${BASE_URL}/applications/?page=${page + 1}&page_size=${DASHBOARD_PAGE_SIZE}`
                    : null,
                results: current,
            };
        }

        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("page_size", String(DASHBOARD_PAGE_SIZE));
        if (status && status !== "all") {
            params.set("status", status);
        }

        return fetchApplicationsPage(`${BASE_URL}/applications/?${params.toString()}`);
    } catch (error) {
        console.error("Error fetching applications:", error);
        return {
            count: 0,
            next: null,
            previous: null,
            results: [],
        };
    }
}

export async function getMyApplicationById(id: number): Promise<Application | null> {
    try {
        const response = await fetchWithAuth(`${BASE_URL}/applications/${id}/`, {
            cache: "no-store",
        });

        if (response.status === 404 || response.status === 401 || response.status === 403) {
            return null;
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch application detail: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching application ${id}:`, error);
        return null;
    }
}
