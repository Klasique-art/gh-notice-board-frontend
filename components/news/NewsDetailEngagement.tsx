"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark, Loader2, Share2, MessageCircle } from "lucide-react";
import { addBookmark, removeBookmark } from "@/app/lib/bookmarkInteractions";
import { useToast } from "@/components/ui/ToastProvider";
import { NewsArticle } from "@/types/news.types";

interface NewsDetailEngagementProps {
    article: NewsArticle;
}

const NewsDetailEngagement = ({ article }: NewsDetailEngagementProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(article.user_bookmarked);
    const [isBookmarkPending, setIsBookmarkPending] = useState(false);
    const [likesCount, setLikesCount] = useState(article.likes_count || 0);
    const [bookmarksCount, setBookmarksCount] = useState(article.bookmarks_count || 0);
    const { showToast } = useToast();

    const handleLike = () => {
        // In production, call API to like article
        setIsLiked(!isLiked);
        setLikesCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleBookmark = async () => {
        if (isBookmarkPending) return;
        const nextBookmarked = !isBookmarked;
        setIsBookmarkPending(true);
        setIsBookmarked(nextBookmarked);
        setBookmarksCount((prev: number) => (nextBookmarked ? prev + 1 : Math.max(0, prev - 1)));

        try {
            const payload = { type: "news" as const, object_id: article.id };
            if (nextBookmarked) {
                await addBookmark(payload);
                showToast({
                    title: "Saved",
                    description: "This item has been added to your bookmarks.",
                    tone: "success",
                });
            } else {
                await removeBookmark(payload);
                showToast({
                    title: "Removed",
                    description: "This item has been removed from your bookmarks.",
                    tone: "info",
                });
            }
        } catch (error) {
            setIsBookmarked(!nextBookmarked);
            setBookmarksCount((prev: number) => (nextBookmarked ? Math.max(0, prev - 1) : prev + 1));
            showToast({
                title: "Bookmark update failed",
                description: error instanceof Error ? error.message : "Please try again.",
                tone: "error",
            });
        } finally {
            setIsBookmarkPending(false);
        }
    };

    const handleShare = () => {
        // In production, open share modal or use Web Share API
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.summary,
                url: window.location.href,
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const scrollToComments = () => {
        document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
        >
            <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Left: Engagement Buttons */}
                <div className="flex items-center gap-3">
                    {/* Like Button */}
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text transition-all duration-300 hover:scale-105 ${isLiked
                            ? "bg-accent/10 text-accent border-2 border-accent"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-transparent"
                            }`}
                        aria-label="Like article"
                    >
                        <Heart
                            className={`w-5 h-5 ${isLiked ? "fill-accent" : ""}`}
                        />
                        <span>{(likesCount || 0).toLocaleString()}</span>
                    </button>

                    {/* Comment Button */}
                    <button
                        onClick={scrollToComments}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-transparent transition-all duration-300 hover:scale-105"
                        aria-label="View comments"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>{(article.comments_count || 0).toLocaleString()}</span>
                    </button>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-3">
                    {/* Bookmark Button */}
                    <button
                        onClick={handleBookmark}
                        disabled={isBookmarkPending}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text transition-all duration-300 hover:scale-105 ${isBookmarked
                            ? "bg-secondary/20 text-primary border-2 border-secondary"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-transparent"
                            }`}
                        aria-label="Bookmark article"
                        aria-pressed={isBookmarked}
                    >
                        {isBookmarkPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Bookmark
                                className={`w-5 h-5 ${isBookmarked ? "fill-secondary" : ""}`}
                            />
                        )}
                        <span className="hidden sm:inline">
                            {isBookmarked ? "Saved" : "Save"}
                        </span>
                    </button>

                    {/* Share Button */}
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text bg-primary text-white hover:bg-primary-100 border-2 border-transparent transition-all duration-300 hover:scale-105"
                        aria-label="Share article"
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                </div>
            </div>

            {/* Engagement Stats (Desktop) */}
            <div className="hidden sm:flex items-center gap-6 mt-4 pt-4 border-t border-slate-200 text-slate-600 small-text">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{(article.shares_count || 0).toLocaleString()}</span>
                    <span>shares</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{(bookmarksCount || 0).toLocaleString()}</span>
                    <span>bookmarks</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{(article.views_count || 0).toLocaleString()}</span>
                    <span>views</span>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetailEngagement;
