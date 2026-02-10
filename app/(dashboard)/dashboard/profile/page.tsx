import {
    ProfileHeader,
    ProfileNotificationSettings,
    ProfileAccountDetails,
    ProfileQuickActions,
} from "@/components";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";

const ProfilePage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="dash-page space-y-8">
            {/* Profile Header */}
            <ProfileHeader user={user} />

            {/* Two Column Layout - Quick Actions & Account Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileQuickActions />
                <ProfileAccountDetails user={user} />
            </div>

            {/* Notification Settings */}
            <ProfileNotificationSettings settings={user.profile} />
        </main>
    );
};

export default ProfilePage;
