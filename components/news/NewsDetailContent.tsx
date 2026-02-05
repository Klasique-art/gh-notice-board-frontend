"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NewsArticleDetail } from "@/types/news.types";

interface NewsDetailContentProps {
    article: NewsArticleDetail;
}

const NewsDetailContent = ({ article }: NewsDetailContentProps) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8 lg:p-10"
        >
            {/* Article Content */}
            <div className="prose prose-slate max-w-none">
                {/* 
                    In production, this would be rendered as rich HTML from the backend
                    For now, we'll split the content into paragraphs
                */}
                {article.content.split("\n\n").map((paragraph, index) => (
                    <p
                        key={index}
                        className="normal-text text-slate-700 leading-relaxed mb-6 first:mt-0 last:mb-0"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="small-text font-semibold text-slate-700">
                            Related Tags:
                        </span>
                        {article.tags.map((tag) => (
                            <Link
                                key={tag.id}
                                href={`/news?tag=${tag.slug}`}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary small-text font-medium transition-all duration-300 hover:scale-105"
                            >
                                #{tag.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Article Footer */}
            <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-slate-500 small-text">
                        <span>Last updated:</span>
                        <time dateTime={article.updated_at}>
                            {new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }).format(new Date(article.updated_at))}
                        </time>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="small-text text-slate-500">Article ID:</span>
                        <code className="px-2 py-1 rounded bg-slate-100 small-text font-mono text-slate-700">
                            {article.id}
                        </code>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default NewsDetailContent;