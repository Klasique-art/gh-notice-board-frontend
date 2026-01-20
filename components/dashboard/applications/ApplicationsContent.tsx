"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ApplicationsResponse } from "@/types/applications.types";
import {
    ApplicationsHeader,
    ApplicationsFilters,
    ApplicationsGrid,
    ApplicationsEmptyState,
    ApplicationsPagination,
    ApplicationsStats,
} from "@/components";

interface ApplicationsContentProps {
    applications: ApplicationsResponse;
    searchParams: {
        status?: string;
        type?: string;
        search?: string;
        page?: string;
    };
}

const ApplicationsContent = ({
    applications,
    searchParams,
}: ApplicationsContentProps) => {
    const status = searchParams.status || "all";
    const type = searchParams.type || "all";
    const search = searchParams.search || "";
    const page = parseInt(searchParams.page || "1");

    const hasApplications = applications.results.length > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <ApplicationsHeader totalCount={applications.count} />

            {/* Stats Overview */}
            <ApplicationsStats applications={applications.results} />

            {/* Filters */}
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                }
            >
                <ApplicationsFilters
                    currentStatus={status}
                    currentType={type}
                    currentSearch={search}
                />
            </Suspense>

            {/* Applications Grid or Empty State */}
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                }
            >
                {hasApplications ? (
                    <>
                        <ApplicationsGrid applications={applications.results} />

                        {/* Pagination */}
                        {applications.count > 12 && (
                            <ApplicationsPagination
                                currentPage={page}
                                totalCount={applications.count}
                                hasNext={!!applications.next}
                                hasPrevious={!!applications.previous}
                            />
                        )}
                    </>
                ) : (
                    <ApplicationsEmptyState
                        hasFilters={!!(status !== "all" || type !== "all" || search)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default ApplicationsContent;