import {
    ProfileHeader,
    ProfileNotificationSettings,
    ProfileAccountDetails,
    ProfileQuickActions,
} from "@/components";
import { currentUser } from "@/data/dummy.general";

const ProfilePage = async () => {
    // In production, get user from auth
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");

    const user = currentUser;

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