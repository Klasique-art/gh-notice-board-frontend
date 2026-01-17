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
import { mockNews } from "@/data/mockNews";

// Generate static params for all news articles
export async function generateStaticParams() {
    // In production, fetch all article slugs from API
    return mockNews.map((article) => ({
        slug: article.slug,
    }));
}

// Type definition for params
type Props = {
    params: Promise<{ slug: string }>;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    // Await params (Next.js 15+)
    const { slug } = await params;
    
    // In production, fetch article from API
    const article = mockNews.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: "Article Not Found | Ghana Notice Board",
        };
    }

    return {
        title: `${article.title} | Ghana Notice Board`,
        description: article.summary,
        keywords: [
            article.category.name,
            ...article.tags.map((tag) => tag.name),
            "Ghana news",
            article.author.full_name,
        ],
        authors: [{ name: article.author.full_name }],
        openGraph: {
            title: article.title,
            description: article.summary,
            type: "article",
            publishedTime: article.published_at || undefined,
            modifiedTime: article.updated_at,
            authors: [article.author.full_name],
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
            creator: article.author.twitter_username
                ? `@${article.author.twitter_username}`
                : undefined,
        },
    };
}

// Server Component - Fetches data and assembles page
const NewsDetailPage = async ({ params }: Props) => {
    // Await params (Next.js 15+)
    const { slug } = await params;
    
    // In production, this would be an API call:
    // const article = await getArticleBySlug(slug);
    const article = mockNews.find((a) => a.slug === slug);

    // Handle 404
    if (!article) {
        notFound();
    }

    // Get related articles (same category, exclude current)
    const relatedArticles = mockNews
        .filter(
            (a) =>
                a.category.slug === article.category.slug && a.id !== article.id
        )
        .slice(0, 3);

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
};

export default NewsDetailPage;