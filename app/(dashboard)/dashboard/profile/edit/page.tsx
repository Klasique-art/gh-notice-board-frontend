import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { EditProfileForm, AppButton } from "@/components";
import { getCurrentUser } from "@/app/lib/auth";

const EditProfilePage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

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
