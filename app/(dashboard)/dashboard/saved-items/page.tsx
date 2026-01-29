import { Metadata } from "next";
import { SavedItemsContent } from "@/components";
import { mockSavedItemsResponse, mockBookmarkStats } from "@/data/mockBookmarks";

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
    // In production: Fetch user's bookmarks from API
    // const user = await getCurrentUser();
    // if (!user) redirect("/login");

    // const params = await searchParams;
    // const bookmarks = await fetchMyBookmarks(params);

    const bookmarks = mockSavedItemsResponse;
    const stats = mockBookmarkStats;

    console.log("SavedItemsPage bookmarks:", bookmarks);

    return (
        <main className="dash-page">
            <SavedItemsContent bookmarks={bookmarks} stats={stats} />
        </main>
    );
};

export default SavedItemsPage;