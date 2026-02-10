import { Metadata } from "next";
import { ApplicationsContent } from "@/components";
import { getMyApplications } from "@/app/lib/applications";

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
    const applications = await getMyApplications({
        page: Number.parseInt(params.page || "1", 10),
        status: params.status,
        type: params.type,
        search: params.search,
    });

    return (
        <main className="dash-page">
            <ApplicationsContent applications={applications} searchParams={params} />
        </main>
    );
};

export default ApplicationsPage;
