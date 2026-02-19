"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Eye, MessageCircle } from "lucide-react";
import { NewsArticleDetail } from "@/types/news.types";

interface NewsDetailMetaProps {
    article: NewsArticleDetail;
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
            <div>
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
                                {formatNumber(article.views_count || 0)}
                            </p>
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center gap-2 text-slate-600">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <div>
                            <p className="small-text-2 text-slate-500">Comments</p>
                            <p className="small-text font-semibold">
                                {formatNumber(article.comments_count || 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetailMeta;
