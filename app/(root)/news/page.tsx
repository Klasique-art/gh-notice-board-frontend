import { Metadata } from "next";
import Link from "next/link";

import { NewsHero, NewsPageContent } from "@/components";
import { getNews } from "@/app/lib/news";
import { NewsCategory, NewsTag } from "@/types/news.types";

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

// Server Component - Fetches real data from backend
const NewsPage = async () => {
    try {
        // Fetch initial news articles from backend
        const newsData = await getNews({
            ordering: '-published_at',
            page: 1,
        });

        const articles = newsData.results;

        // Extract unique categories
        const categories = articles
            .filter(article => article.category !== null)
            .map(article => article.category!);
        
        const uniqueCategories: NewsCategory[] = Array.from(
            new Map(categories.map(cat => [cat.slug, cat])).values()
        );

        // Extract unique tags
        const allTags = articles.flatMap(article => article.tags || []);
        const uniqueTags: NewsTag[] = Array.from(
            new Map(allTags.map(tag => [tag.slug, tag])).values()
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
                    totalCount={newsData.count}
                />
            </main>
        );
    } catch (error) {
        console.error('Error loading news page:', error);
        
        // Fallback UI for errors
        return (
            <main className="min-h-screen bg-slate-50">
                <div className="inner-wrapper py-20 text-center">
                    <h1 className="big-text-1 font-bold text-slate-900 mb-4">
                        Unable to Load News
                    </h1>
                    <p className="normal-text text-slate-600 mb-8">
                        We're having trouble loading news articles. Please try again later.
                    </p>
                    
                    <Link href="/"
                        className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </main>
        );
    }
};

export default NewsPage;