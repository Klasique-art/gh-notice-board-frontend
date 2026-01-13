"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Eye, Heart, MessageCircle, Bookmark, TrendingUp } from "lucide-react";

import { NewsArticle } from "@/types/news.types";
import { placeholderImage } from "@/data/constants";

interface NewsCardProps {
    article: NewsArticle;
    index?: number;
}

const NewsCard = ({ article, index = 0 }: NewsCardProps) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1] as const, 
            },
        },
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(date);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };

    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="group relative bg-white rounded-xl border border-slate-200 hover:border-primary/30 overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                {article.is_trending && (
                    <span className="px-3 py-1 rounded-full bg-secondary text-primary small-text font-bold flex items-center gap-1 shadow-lg">
                        <TrendingUp className="w-3 h-3" />
                        TRENDING
                    </span>
                )}
            </div>

            {/* Featured Image */}
            <Link href={`/news/${article.slug}`} className="block relative aspect-16/10 overflow-hidden bg-slate-100">
                <Image
                    src={article.featured_image ?? placeholderImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Category & Date */}
                <div className="flex items-center justify-between gap-2">
                    <Link
                        href={`/news?category=${article.category.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white small-text-2 font-semibold transition-colors"
                        style={{ backgroundColor: article.category.color }}
                    >
                        {article.category.name}
                    </Link>
                    <div className="flex items-center gap-1 text-slate-500 small-text-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={article.published_at ?? undefined}>{formatDate(article.published_at!)}</time>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/news/${article.slug}`}>
                    <h3 className="big-text-4 font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                    </h3>
                </Link>

                {/* Summary */}
                <p className="normal-text-2 text-slate-600 line-clamp-2">
                    {article.summary}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                            <Link
                                key={tag.id}
                                href={`/news?tag=${tag.slug}`}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary small-text-2 transition-colors"
                            >
                                #{tag.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Author & Engagement */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    {/* Author */}
                    <Link
                        href={`/profile/${article.author.username}`}
                        className="flex items-center gap-2 min-w-0 flex-1"
                    >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
                            {article.author.avatar ? (
                                <Image
                                    src={article.author.avatar}
                                    alt={article.author.full_name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary text-white small-text font-bold">
                                    {article.author.first_name[0]}{article.author.last_name[0]}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="small-text font-semibold text-slate-900 truncate">
                                {article.author.display_name}
                            </p>
                        </div>
                    </Link>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-3 text-slate-500 small-text-2">
                        <span className="flex items-center gap-1" title="Views">
                            <Eye className="w-3.5 h-3.5" />
                            {formatNumber(article.views_count)}
                        </span>
                        <span className="flex items-center gap-1" title="Likes">
                            <Heart className="w-3.5 h-3.5" />
                            {formatNumber(article.likes_count)}
                        </span>
                        <span className="flex items-center gap-1" title="Comments">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {formatNumber(article.comments_count)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions (Hover) */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <button
                    className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-white hover:bg-primary transition-colors"
                    title="Bookmark"
                >
                    <Bookmark className="w-4 h-4" />
                </button>
            </div>
        </motion.article>
    );
};

export default NewsCard;