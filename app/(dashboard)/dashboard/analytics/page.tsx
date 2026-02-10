import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AnalyticsContent } from "@/components";
import { getCurrentUser } from "@/app/lib/auth";
import { getUserAnalytics } from "@/app/lib/analytics";

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
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    const analytics = await getUserAnalytics(user);

    return (
        <main className="dash-page">
            <AnalyticsContent analytics={analytics} />
        </main>
    );
};

export default AnalyticsPage;
