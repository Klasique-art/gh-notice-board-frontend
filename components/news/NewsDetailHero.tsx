"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Star } from "lucide-react";
import { NewsArticle } from "@/types/news.types";
import { placeholderImage } from "@/data/constants";

interface NewsDetailHeroProps {
    article: NewsArticle;
}

const NewsDetailHero = ({ article }: NewsDetailHeroProps) => {
    return (
        <section className="relative w-full bg-primary">
            {/* Featured Image with Overlay */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                    src={article.featured_image ?? placeholderImage}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover rounded-2xl"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="inner-wrapper pb-8 md:pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl space-y-4"
                        >
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Category Badge */}
                                <Link
                                    href={`/news?category=${article.category.slug}`}
                                    className="px-3 py-1.5 rounded-lg text-white font-bold small-text transition-all duration-300 hover:scale-105"
                                    style={{ backgroundColor: article.category.color }}
                                >
                                    {article.category.name}
                                </Link>

                                {/* Breaking News Badge */}
                                {article.is_breaking && (
                                    <span className="px-3 py-1.5 rounded-lg bg-accent text-white font-bold small-text flex items-center gap-1.5 animate-pulse">
                                        <Zap className="w-3.5 h-3.5" />
                                        BREAKING
                                    </span>
                                )}

                                {/* Featured Badge */}
                                {article.is_featured && (
                                    <span className="px-3 py-1.5 rounded-lg bg-secondary text-primary font-bold small-text flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5" />
                                        FEATURED
                                    </span>
                                )}

                                {/* Trending Badge */}
                                {article.is_trending && (
                                    <span className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold small-text flex items-center gap-1.5">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        TRENDING
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="massive-text text-white leading-tight">
                                {article.title}
                            </h1>

                            {/* Summary */}
                            <p className="big-text-4 text-slate-200 leading-relaxed">
                                {article.summary}
                            </p>

                            {/* Image Caption */}
                            {article.image_caption && (
                                <p className="small-text text-slate-400 italic">
                                    {article.image_caption}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsDetailHero;