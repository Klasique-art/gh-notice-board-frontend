import { Metadata } from "next";
import { AnalyticsContent } from "@/components";
import { mockAnalyticsData } from "@/data/mockAnalytics";

export const metadata: Metadata = {
    title: "Analytics | Ghana Notice Board",
    description:
        "Track your engagement, content performance, and growth metrics on Ghana Notice Board.",
    keywords: [
        "analytics",
        "insights",
        "performance",
        "engagement metrics",
        "statistics",
    ],
};

const AnalyticsPage = async () => {
    // In production: Fetch analytics from API
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");
    // const analytics = await fetchMyAnalytics();

    const analytics = mockAnalyticsData;

    return (
        <main className="dash-page">
            <AnalyticsContent analytics={analytics} />
        </main>
    );
};

export default AnalyticsPage;