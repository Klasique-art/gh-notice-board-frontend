import { Metadata } from "next";
import { SettingsContent } from "@/components";

export const metadata: Metadata = {
    title: "Settings | Ghana Notice Board",
    description:
        "Manage your account settings, security, and privacy preferences.",
    keywords: [
        "account settings",
        "security",
        "privacy",
        "Ghana",
    ],
};

const SettingsPage = async () => {
    // In production: Fetch user settings
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");

    return (
        <main className="dash-page">
            <SettingsContent />
        </main>
    );
};

export default SettingsPage;
