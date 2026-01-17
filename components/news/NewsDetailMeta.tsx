"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, MessageCircle } from "lucide-react";
import { NewsArticle } from "@/types/news.types";

interface NewsDetailMetaProps {
    article: NewsArticle;
}

const NewsDetailMeta = ({ article }: NewsDetailMetaProps) => {
    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    // Calculate reading time (assuming 200 words per minute)
    const calculateReadingTime = (content: string) => {
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return minutes;
    };

    const readingTime = calculateReadingTime(article.content);

    // Format numbers
    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
        >
            <div className="space-y-6">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                    {/* Author Avatar */}
                    <Link
                        href={`/profile/${article.author.username}`}
                        className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 ring-2 ring-primary/20 hover:ring-primary transition-all duration-300"
                    >
                        {article.author.avatar ? (
                            <Image
                                src={article.author.avatar}
                                alt={article.author.full_name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary text-white normal-text font-bold">
                                {article.author.first_name[0]}
                                {article.author.last_name[0]}
                            </div>
                        )}
                    </Link>

                    {/* Author Details */}
                    <div className="flex-1 min-w-0">
                        <Link
                            href={`/profile/${article.author.username}`}
                            className="block group"
                        >
                            <div className="flex items-center gap-2">
                                <h3 className="normal-text font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {article.author.display_name}
                                </h3>
                                {article.author.is_verified && (
                                    <span
                                        className="text-secondary"
                                        title="Verified"
                                    >
                                        {article.author.verification_badge}
                                    </span>
                                )}
                            </div>
                            <p className="small-text text-slate-600">
                                {article.author.profile.occupation || "Writer"} at {article.author.profile.company || "Ghana Notice Board"}
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200" />

                {/* Article Metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Published Date */}
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                            <p className="small-text-2 text-slate-500">Published</p>
                            <p className="small-text font-semibold">
                                {formatDate(article.published_at!)}
                            </p>
                        </div>
                    </div>

                    {/* Reading Time */}
                    <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                            <p className="small-text-2 text-slate-500">Read time</p>
                            <p className="small-text font-semibold">
                                {readingTime} min read
                            </p>
                        </div>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-2 text-slate-600">
                        <Eye className="w-4 h-4 text-primary" />
                        <div>
                            <p className="small-text-2 text-slate-500">Views</p>
                            <p className="small-text font-semibold">
                                {formatNumber(article.views_count)}
                            </p>
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center gap-2 text-slate-600">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <div>
                            <p className="small-text-2 text-slate-500">Comments</p>
                            <p className="small-text font-semibold">
                                {formatNumber(article.comments_count)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetailMeta;