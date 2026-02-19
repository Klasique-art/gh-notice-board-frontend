"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Heart, Share2, Bookmark, CheckCircle, Loader2 } from "lucide-react";
import { addBookmark, removeBookmark } from "@/app/lib/bookmarkInteractions";
import { useToast } from "@/components/ui/ToastProvider";
import { Event } from "@/types/events.types";

interface EventDetailRegistrationProps {
    event: Event;
}

const EventDetailRegistration = ({ event }: EventDetailRegistrationProps) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(Boolean(event.user_bookmarked));
    const [isBookmarkPending, setIsBookmarkPending] = useState(false);
    const [likesCount, setLikesCount] = useState(event.likes_count);
    const { showToast } = useToast();

    const isFree = parseFloat(event.price) === 0;
    const spotsLeft = event.max_attendees
        ? event.max_attendees - event.registered_count
        : null;
    const isFull = spotsLeft !== null && spotsLeft <= 0;

    const handleRegister = () => {
        // In production, handle registration/payment
        setIsRegistered(!isRegistered);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleBookmark = async () => {
        if (isBookmarkPending) return;
        const nextBookmarked = !isBookmarked;
        setIsBookmarkPending(true);
        setIsBookmarked(nextBookmarked);

        try {
            const payload = { type: "event" as const, object_id: event.id };
            if (nextBookmarked) {
                await addBookmark(payload);
                showToast({
                    title: "Saved",
                    description: "This event has been added to your bookmarks.",
                    tone: "success",
                });
            } else {
                await removeBookmark(payload);
                showToast({
                    title: "Removed",
                    description: "This event has been removed from your bookmarks.",
                    tone: "info",
                });
            }
        } catch (error) {
            setIsBookmarked(!nextBookmarked);
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
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.summary,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-linear-to-r from-primary/5 to-secondary/5 rounded-xl border-2 border-primary/20 p-6"
        >
            <div className="space-y-4">
                {/* Registration Status */}
                {isRegistered && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/20 text-primary border border-secondary">
                        <CheckCircle className="w-5 h-5" />
                        <span className="normal-text font-semibold">
                            You&apos;re registered for this event!
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Left: Registration Button */}
                    <div className="flex-1 min-w-50">
                        {event.registration_required ? (
                            <button
                                onClick={handleRegister}
                                disabled={isFull && !isRegistered}
                                className={`w-full py-3 px-6 rounded-lg font-bold normal-text transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                                    isRegistered
                                        ? "bg-secondary text-primary border-2 border-secondary"
                                        : isFull
                                        ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                                        : "bg-primary hover:bg-primary-100 text-white shadow-lg shadow-primary/30"
                                }`}
                            >
                                {isRegistered ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Registered
                                    </>
                                ) : isFull ? (
                                    "Event Full"
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        {isFree ? "Register Free" : `Register - ${event.currency} ${parseFloat(event.price).toFixed(2)}`}
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="text-center py-3">
                                <p className="normal-text font-semibold text-slate-700">
                                    No registration required
                                </p>
                                <p className="small-text text-slate-600">Just show up!</p>
                            </div>
                        )}
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text transition-all duration-300 hover:scale-105 ${
                                isLiked
                                    ? "bg-accent/10 text-accent border-2 border-accent"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
                            }`}
                            aria-label="Like event"
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? "fill-accent" : ""}`} />
                            <span className="hidden sm:inline">{likesCount}</span>
                        </button>

                        {/* Bookmark Button */}
                        <button
                            onClick={handleBookmark}
                            disabled={isBookmarkPending}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text transition-all duration-300 hover:scale-105 ${
                                isBookmarked
                                    ? "bg-secondary/20 text-primary border-2 border-secondary"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
                            }`}
                            aria-label="Bookmark event"
                            aria-pressed={isBookmarked}
                        >
                            {isBookmarkPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-secondary" : ""}`} />
                            )}
                        </button>

                        {/* Share Button */}
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200 transition-all duration-300 hover:scale-105"
                            aria-label="Share event"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Event Status Info */}
                {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 50 && (
                    <div className="flex items-center justify-center gap-2 text-accent small-text font-semibold">
                        <span>⚡</span>
                        <span>Only {spotsLeft} spots remaining!</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default EventDetailRegistration;
