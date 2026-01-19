import { Metadata } from "next";
import { SecuritySettingsContent } from "@/components";
import { currentUser } from "@/data/dummy.general";

export const metadata: Metadata = {
    title: "Security Settings | Ghana Notice Board",
    description:
        "Manage your password, email address, and account security settings.",
    keywords: ["security", "password", "email", "account security", "Ghana"],
};

const SecuritySettingsPage = async () => {
    // In production: Fetch user
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");

    const user = currentUser;

    return (
        <main className="dash-page">
            <SecuritySettingsContent currentUser={user} />
        </main>
    );
};

export default SecuritySettingsPage;