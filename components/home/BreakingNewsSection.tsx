import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

import {Section} from "@/components";
import { NewsArticle } from "@/types/news.types";

interface BreakingNewsSectionProps {
    articles: NewsArticle[];
}

const BreakingNewsSection = ({ articles }: BreakingNewsSectionProps) => {
    const breakingNews = articles.filter((article) => article.is_breaking).slice(0, 3);
    const featuredArticle = breakingNews[0];
    const sideArticles = breakingNews.slice(1, 3);

    return (
        <Section
            title="Breaking News"
            subtitle="Stay updated with the latest developments across Ghana"
            titleStyles="text-primary"
            subtitleStyles="text-slate-600"
            titleId="breaking-news"
            ariaLabelledby="breaking-news"
        >
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Featured Article */}
                {featuredArticle && (
                    <Link
                        href={`/news/${featuredArticle.slug}`}
                        className="group relative h-125 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    >
                        <Image
                            src={featuredArticle.featured_image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <span className="px-3 py-1 rounded-full bg-secondary text-primary small-text font-semibold">
                                    {featuredArticle.category?.name || "General"}
                                </span>
                                <span className="flex items-center gap-1 text-white/80 small-text">
                                    <Clock className="w-3 h-3" />
                                    {new Date(featuredArticle.published_at || "").toLocaleDateString("en-GB")}
                                </span>
                            </div>
                            <h3 className="big-text-3 font-bold text-white mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                                {featuredArticle.title}
                            </h3>
                            <p className="normal-text text-white/80 line-clamp-2">{featuredArticle.summary}</p>
                        </div>
                    </Link>
                )}

                {/* Side Articles */}
                <div className="space-y-6">
                    {sideArticles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/news/${article.slug}`}
                            className="group flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all"
                        >
                            <div className="relative w-40 h-32 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={article.featured_image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400"}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 rounded-full bg-accent/10 text-accent small-text-2 font-semibold">
                                        BREAKING
                                    </span>
                                    <span className="text-slate-500 small-text">
                                        {new Date(article.published_at || "").toLocaleDateString("en-GB")}
                                    </span>
                                </div>
                                <h4 className="big-text-5 font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h4>
                                <p className="normal-text-2 text-slate-600 line-clamp-2">{article.summary}</p>
                            </div>
                        </Link>
                    ))}

                    {/* View All Link */}
                    <Link
                        href="/news?filter=breaking"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all group"
                    >
                        <span className="normal-text font-semibold">View All Breaking News</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default BreakingNewsSection;
