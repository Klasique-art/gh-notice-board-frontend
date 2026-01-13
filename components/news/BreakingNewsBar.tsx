"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { NewsArticle } from "@/types/news.types";

interface BreakingNewsBarProps {
    articles: NewsArticle[];
}

const BreakingNewsBar = ({ articles }: BreakingNewsBarProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused && articles.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % articles.length);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [articles.length, isPaused]);

    if (!isVisible || articles.length === 0) return null;

    const currentArticle = articles[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="sticky top-16 z-40 bg-accent shadow-lg"
        >
            <div className="mx-auto w-full max-w-300 px-4">
                <div className="flex items-center gap-4 py-3">
                    {/* Breaking Badge */}
                    <div className="shrink-0">
                        <span className="px-4 py-1.5 rounded-full bg-white text-accent big-text-5 font-bold flex items-center gap-2 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            BREAKING NEWS
                        </span>
                    </div>

                    {/* News Content */}
                    <div
                        className="flex-1 min-w-0"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2"
                            >
                                <Link
                                    href={`/news/${currentArticle.slug}`}
                                    className="flex-1 min-w-0"
                                >
                                    <h3 className="big-text-5 font-bold text-white truncate hover:underline">
                                        {currentArticle.title}
                                    </h3>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    {articles.length > 1 && (
                        <div className="flex items-center gap-2 shrink-0">
                            {/* Counter */}
                            <span className="normal-text-2 text-white/90 font-medium px-2">
                                {currentIndex + 1} / {articles.length}
                            </span>

                            {/* Previous Button */}
                            <button
                                onClick={handlePrevious}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                aria-label="Previous breaking news"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                aria-label="Next breaking news"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Close Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Close breaking news bar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BreakingNewsBar;