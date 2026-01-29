import { redirect } from "next/navigation";

import {
    DashboardWelcome,
    DashboardStats,
    DashboardQuickActions,
    DashboardRecentContent,
    DashboardApplications,
    DashboardActivitySummary,
} from "@/components";
import { getCurrentUser } from "@/app/lib/auth";

const DashboardPage = async () => {
    const [user] = await Promise.all([
        getCurrentUser()
    ])

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="dash-page">
            <DashboardWelcome user={user} />
            <DashboardStats />
            <DashboardQuickActions />
            
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DashboardRecentContent />
                <DashboardApplications />
            </div> */}
            
            {/* <DashboardActivitySummary /> */}
        </main>
    );
};
export default DashboardPage;