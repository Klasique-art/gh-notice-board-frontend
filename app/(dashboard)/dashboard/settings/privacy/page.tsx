import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PrivacySettingsContent } from "@/components";
import { getCurrentUser } from "@/app/lib/auth";

export const metadata: Metadata = {
    title: "Privacy Settings | Ghana Notice Board",
    description:
        "Manage your privacy preferences, profile visibility, and communication permissions.",
    keywords: ["privacy", "profile visibility", "data settings", "Ghana"],
};

const PrivacySettingsPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="dash-page">
            <PrivacySettingsContent currentUser={user} />
        </main>
    );
};

export default PrivacySettingsPage;
