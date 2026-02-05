"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { NewsArticle } from "@/types/news.types";
import { useState } from "react";

interface NewsDetailShareProps {
    article: NewsArticle;
}

const NewsDetailShare = ({ article }: NewsDetailShareProps) => {
    const [copied, setCopied] = useState(false);

    // Get current URL
    const articleUrl = typeof window !== "undefined" ? window.location.href : "";

    // Share handlers
    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
            "_blank",
            "width=600,height=400"
        );
    };

    const shareOnTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`,
            "_blank",
            "width=600,height=400"
        );
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
            "_blank",
            "width=600,height=400"
        );
    };

    const shareViaEmail = () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`Check out this article: ${article.title}\n\n${articleUrl}`)}`;
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(articleUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
        >
            <div className="space-y-4">
                <h3 className="big-text-5 font-bold text-slate-900">Share this article</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {/* Facebook */}
                    <button
                        onClick={shareOnFacebook}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 group"
                        aria-label="Share on Facebook"
                    >
                        <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="small-text-2 font-medium">Facebook</span>
                    </button>

                    {/* Twitter */}
                    <button
                        onClick={shareOnTwitter}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-600 transition-all duration-300 hover:scale-105 group"
                        aria-label="Share on Twitter"
                    >
                        <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="small-text-2 font-medium">Twitter</span>
                    </button>

                    {/* LinkedIn */}
                    <button
                        onClick={shareOnLinkedIn}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all duration-300 hover:scale-105 group"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="small-text-2 font-medium">LinkedIn</span>
                    </button>

                    {/* Email */}
                    <button
                        onClick={shareViaEmail}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all duration-300 hover:scale-105 group"
                        aria-label="Share via Email"
                    >
                        <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="small-text-2 font-medium">Email</span>
                    </button>

                    {/* Copy Link */}
                    <button
                        onClick={copyLink}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 hover:bg-primary/10 text-slate-700 hover:text-primary transition-all duration-300 hover:scale-105 group"
                        aria-label="Copy link"
                    >
                        <LinkIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="small-text-2 font-medium">
                            {copied ? "Copied!" : "Copy Link"}
                        </span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetailShare;