"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart, Bookmark, Share2, CheckCircle, ExternalLink, AlertTriangle } from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";

interface OpportunityDetailApplicationProps {
    opportunity: Opportunity;
}

const OpportunityDetailApplication = ({
    opportunity,
}: OpportunityDetailApplicationProps) => {
    const [hasApplied, setHasApplied] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(opportunity.likes_count);

    const daysUntilDeadline = opportunity.days_until_deadline;
    const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 7;
    const isExpiringSoon = daysUntilDeadline !== null && daysUntilDeadline <= 14;

    const handleApply = () => {
        // In production, handle application submission or external redirect
        setHasApplied(!hasApplied);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: opportunity.title,
                text: opportunity.summary,
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
                {/* Application Status */}
                {hasApplied && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/20 text-primary border border-secondary">
                        <CheckCircle className="w-5 h-5" />
                        <span className="normal-text font-semibold">
                            Application submitted successfully!
                        </span>
                    </div>
                )}

                {/* Deadline Warning */}
                {isUrgent && !hasApplied && daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent/10 text-accent border border-accent">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="normal-text font-semibold">
                            Only {daysUntilDeadline} {daysUntilDeadline === 1 ? "day" : "days"} left to apply!
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Left: Apply Button */}
                    <div className="flex-1 min-w-50">
                        {opportunity.deadline && daysUntilDeadline !== null && daysUntilDeadline <= 0 ? (
                            <div className="w-full py-3 px-6 rounded-lg bg-slate-300 text-slate-600 text-center font-bold normal-text">
                                Application Closed
                            </div>
                        ) : (
                            <button
                                onClick={handleApply}
                                className={`w-full py-3 px-6 rounded-lg font-bold normal-text transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg ${
                                    hasApplied
                                        ? "bg-secondary text-primary border-2 border-secondary"
                                        : "bg-primary hover:bg-primary-100 text-white shadow-primary/30"
                                }`}
                            >
                                {hasApplied ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Applied
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Apply Now
                                    </>
                                )}
                            </button>
                        )}

                        {/* External Application Link */}
                        {!hasApplied && (
                            <div className="mt-2 text-center">
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-1 text-primary hover:text-primary-100 small-text font-semibold transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Apply on company website
                                </a>
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
                            aria-label="Like opportunity"
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? "fill-accent" : ""}`} />
                            <span className="hidden sm:inline">{likesCount}</span>
                        </button>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text transition-all duration-300 hover:scale-105 ${
                                isSaved
                                    ? "bg-secondary/20 text-primary border-2 border-secondary"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
                            }`}
                            aria-label="Save opportunity"
                        >
                            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-secondary" : ""}`} />
                            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                        </button>

                        {/* Share Button */}
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200 transition-all duration-300 hover:scale-105"
                            aria-label="Share opportunity"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Application Stats */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-200 text-slate-600 small-text">
                    <span>
                        <strong className="text-slate-900">{opportunity.applications_count}</strong> applications
                    </span>
                    <span>•</span>
                    <span>
                        <strong className="text-slate-900">{opportunity.views_count}</strong> views
                    </span>
                    {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                        <>
                            <span>•</span>
                            <span className={isUrgent ? "text-accent font-semibold" : ""}>
                                <strong className={isUrgent ? "text-accent" : "text-slate-900"}>
                                    {daysUntilDeadline}
                                </strong>{" "}
                                days left
                            </span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default OpportunityDetailApplication;