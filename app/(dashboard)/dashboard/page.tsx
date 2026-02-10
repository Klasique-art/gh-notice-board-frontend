import { redirect } from "next/navigation";

import {
    DashboardWelcome,
    DashboardStats,
    DashboardQuickActions,
    // DashboardRecentContent,
    // DashboardApplications,
    // DashboardActivitySummary,
} from "@/components";
import { getCurrentUser } from "@/app/lib/auth";
import { getDashboardStats } from "@/app/lib/dashboard";

const DashboardPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const stats = await getDashboardStats(user);

    return (
        <main className="dash-page">
            <DashboardWelcome user={user} />
            <DashboardStats stats={stats} />
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
