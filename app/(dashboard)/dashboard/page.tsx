import {
    DashboardWelcome,
    DashboardStats,
    DashboardQuickActions,
    DashboardRecentContent,
    DashboardApplications,
    DashboardActivitySummary,
} from "@/components";

const DashboardPage = () => {
    return (
        <main className="dash-page">
            <DashboardWelcome />
            <DashboardStats />
            <DashboardQuickActions />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DashboardRecentContent />
                <DashboardApplications />
            </div>
            
            <DashboardActivitySummary />
        </main>
    );
};
export default DashboardPage;