import { Metadata } from "next";

import { NewsHero, NewsPageContent } from "@/components";
import { mockNews } from "@/data/mockNews";

// SEO Metadata
export const metadata: Metadata = {
    title: "Latest News | Ghana Notice Board",
    description: "Stay informed with breaking news, featured stories, and trending topics from Ghana and the diaspora. Real-time updates on politics, business, technology, culture, and more.",
    keywords: [
        "Ghana news",
        "breaking news Ghana",
        "Accra news",
        "Ghana today",
        "West Africa news",
        "Ghana diaspora",
        "Ghana politics",
        "Ghana business",
        "Ghana technology",
    ],
    openGraph: {
        title: "Latest News | Ghana Notice Board",
        description: "Breaking news and featured stories from Ghana",
        type: "website",
        locale: "en_GH",
    },
    twitter: {
        card: "summary_large_image",
        title: "Latest News | Ghana Notice Board",
        description: "Breaking news and featured stories from Ghana",
    },
};

// Server Component - Fetches data and prepares props
const NewsPage = async () => {
    // In production, this would be an API call:
    // const articles = await getNews();
    const articles = mockNews;

    // Extract unique categories
    const categories = articles.map((article) => article.category);
    const uniqueCategories = Array.from(
        new Map(categories.map((cat) => [cat.slug, cat])).values()
    );

    // Extract unique tags
    const allTags = articles.flatMap((article) => article.tags || []);
    const uniqueTags = Array.from(
        new Map(allTags.map((tag) => [tag.slug, tag])).values()
    );

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section - Server Component */}
            <NewsHero />

            {/* Interactive Content - Client Component */}
            <NewsPageContent
                initialArticles={articles}
                availableCategories={uniqueCategories}
                availableTags={uniqueTags}
            />
        </main>
    );
};

export default NewsPage;