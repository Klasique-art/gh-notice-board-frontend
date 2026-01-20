import { Metadata } from "next";
import { ApplicationsContent } from "@/components";
import { mockApplicationsResponse } from "@/data/mockApplications";

export const metadata: Metadata = {
    title: "My Applications | Ghana Notice Board",
    description:
        "View and manage all your job applications, scholarship submissions, and opportunity inquiries.",
    keywords: [
        "my applications",
        "job applications",
        "scholarships",
        "career opportunities Ghana",
    ],
};

type Props = {
    searchParams: Promise<{
        status?: string;
        type?: string;
        search?: string;
        page?: string;
    }>;
};

const ApplicationsPage = async ({ searchParams }: Props) => {
    const params = await searchParams;

    // In production: Fetch user applications from API
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");
    // const applications = await fetchMyApplications(params);

    const applications = mockApplicationsResponse;

    return (
        <main className="dash-page">
            <ApplicationsContent applications={applications} searchParams={params} />
        </main>
    );
};

export default ApplicationsPage;