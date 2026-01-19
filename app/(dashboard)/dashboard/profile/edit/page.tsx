import { ChevronLeft } from "lucide-react";
import { EditProfileForm, AppButton } from "@/components";
import { currentUser } from "@/data/dummy.general";

const EditProfilePage = async () => {
    // In production, get user from auth
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");

    const user = currentUser;

    return (
        <main className="dash-page space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <AppButton
                    url="/dashboard/profile"
                    icon={<ChevronLeft className="w-5 h-5" />}
                    title=""
                    variant="ghost"
                    size="sm"
                    className="px-3!"
                />
                <div>
                    <h1 className="big-text-2 font-bold text-slate-900">
                        Edit Profile
                    </h1>
                    <p className="normal-text text-slate-600">
                        Update your personal information and preferences
                    </p>
                </div>
            </div>

            {/* Edit Form */}
            <EditProfileForm user={user} />
        </main>
    );
};

export default EditProfilePage;