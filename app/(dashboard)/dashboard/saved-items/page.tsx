import { Metadata } from "next";
import { redirect } from "next/navigation";

import { SavedItemsContent } from "@/components";
import { getCurrentUser } from "@/app/lib/auth";
import { getUserBookmarksWithStats } from "@/app/lib/bookmarks";

export const metadata: Metadata = {
    title: "Saved Items | Ghana Notice Board",
    description:
        "Access all your saved items including events, news, job opportunities, diaspora content, and announcements in one place.",
    keywords: ["saved items", "bookmarks", "saved events", "saved jobs", "Ghana"],
};

type SearchParams = Promise<{
    type?: string;
    page?: string;
}>;

const SavedItemsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    await searchParams;

    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    const { bookmarks, stats } = await getUserBookmarksWithStats();

    return (
        <main className="dash-page">
            <SavedItemsContent bookmarks={bookmarks} stats={stats} />
        </main>
    );
};

export default SavedItemsPage;
