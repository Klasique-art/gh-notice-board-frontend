import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    NewsDetailHero,
    NewsDetailMeta,
    NewsDetailContent,
    NewsDetailAuthor,
    NewsDetailEngagement,
    NewsDetailShare,
    NewsDetailRelated,
    NewsDetailComments,
} from "@/components";
import { getNewsBySlug, getNews } from "@/app/lib/news";

// Generate static params for all news articles
export async function generateStaticParams() {
    try {
        // Fetch all published articles
        const newsData = await getNews({
            status: 'published',
            page: 1,
        });
        
        return newsData.results.map((article) => ({
            slug: article.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Type definition for params
type Props = {
    params: Promise<{ slug: string }>;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    
    try {
        const article = await getNewsBySlug(slug);

        if (!article) {
            return {
                title: "Article Not Found | Ghana Notice Board",
            };
        }

        // Extract tag names
        const tagNames = article.tags?.map(tag => tag.name) || [];
        
        return {
            title: `${article.title} | Ghana Notice Board`,
            description: article.summary,
            keywords: [
                article.category?.name || 'News',
                ...tagNames,
                "Ghana news",
                article.author.display_name,
            ],
            authors: [{ name: article.author.display_name }],
            openGraph: {
                title: article.title,
                description: article.summary,
                type: "article",
                publishedTime: article.published_at || undefined,
                modifiedTime: article.updated_at,
                authors: [article.author.display_name],
                images: article.featured_image
                    ? [
                          {
                              url: article.featured_image,
                              width: 1200,
                              height: 630,
                              alt: article.title,
                          },
                      ]
                    : [],
                locale: "en_GH",
            },
            twitter: {
                card: "summary_large_image",
                title: article.title,
                description: article.summary,
                images: article.featured_image ? [article.featured_image] : [],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: "Article Not Found | Ghana Notice Board",
        };
    }
}

// Server Component - Fetches data and assembles page
const NewsDetailPage = async ({ params }: Props) => {
    const { slug } = await params;
    
    try {
        // Fetch article from backend
        const article = await getNewsBySlug(slug);

        // Handle 404
        if (!article) {
            notFound();
        }

        // Related articles are already included in the detail response
        const relatedArticles = article.related_articles || [];

        return (
            <main className="min-h-screen bg-slate-50">
                {/* Hero Section with Featured Image */}
                <NewsDetailHero article={article} />

                <div className="inner-wrapper py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Article Metadata */}
                            <NewsDetailMeta article={article} />

                            {/* Article Content */}
                            <NewsDetailContent article={article} />

                            {/* Engagement Actions */}
                            <NewsDetailEngagement article={article} />

                            {/* Share Section */}
                            <NewsDetailShare article={article} />

                            {/* Comments Section */}
                            <NewsDetailComments articleId={article.id} />
                        </div>

                        {/* Sidebar Column */}
                        <aside className="lg:col-span-4 space-y-6">
                            {/* Author Card */}
                            <NewsDetailAuthor author={article.author} />

                            {/* Related Articles */}
                            {relatedArticles.length > 0 && (
                                <NewsDetailRelated articles={relatedArticles} />
                            )}
                        </aside>
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error loading article:', error);
        notFound();
    }
};

export default NewsDetailPage;