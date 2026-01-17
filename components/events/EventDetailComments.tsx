"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Send, ThumbsUp, Reply } from "lucide-react";

interface Comment {
    id: string;
    user: {
        username: string;
        display_name: string;
        avatar: string | null;
        is_verified: boolean;
    };
    content: string;
    likes: number;
    created_at: string;
}

interface EventDetailCommentsProps {
    eventId: string;
}

const EventDetailComments = ({ eventId }: EventDetailCommentsProps) => {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock comments data (in production, fetch from API)
    const [comments, setComments] = useState<Comment[]>([
        {
            id: "1",
            user: {
                username: "kofi_tech",
                display_name: "Kofi Ansah",
                avatar: "https://i.pravatar.cc/100?img=13",
                is_verified: false,
            },
            content: "Looking forward to this event! Will there be networking sessions?",
            likes: 8,
            created_at: "2025-01-14T09:30:00Z",
        },
        {
            id: "2",
            user: {
                username: "efua_events",
                display_name: "Efua Mensah ✓",
                avatar: "https://i.pravatar.cc/100?img=5",
                is_verified: true,
            },
            content: "Great lineup of speakers! Can't wait to attend.",
            likes: 15,
            created_at: "2025-01-14T11:20:00Z",
        },
    ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);

        // In production, call API to post comment
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Add comment to list (mock)
        const newComment: Comment = {
            id: Date.now().toString(),
            user: {
                username: "current_user",
                display_name: "You",
                avatar: null,
                is_verified: false,
            },
            content: comment,
            likes: 0,
            created_at: new Date().toISOString(),
        };

        setComments([newComment, ...comments]);
        setComment("");
        setIsSubmitting(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
        }).format(date);
    };

    return (
        <motion.div
            id="comments-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <h3 className="big-text-4 font-bold text-slate-900">
                        Comments ({comments.length})
                    </h3>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this event..."
                            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 normal-text-2 resize-none"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!comment.trim() || isSubmitting}
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-100 disabled:bg-slate-300 text-white rounded-lg font-semibold normal-text-2 transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                        >
                            <Send className="w-4 h-4" />
                            {isSubmitting ? "Posting..." : "Post Comment"}
                        </button>
                    </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                    {comments.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="normal-text text-slate-500">
                                No comments yet. Be the first to share your thoughts!
                            </p>
                        </div>
                    ) : (
                        comments.map((commentItem, index) => (
                            <motion.div
                                key={commentItem.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-3"
                            >
                                {/* Comment */}
                                <div className="flex gap-3">
                                    {/* Avatar */}
                                    <Link
                                        href={`/profile/${commentItem.user.username}`}
                                        className="shrink-0"
                                    >
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                                            {commentItem.user.avatar ? (
                                                <Image
                                                    src={commentItem.user.avatar}
                                                    alt={commentItem.user.display_name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primary text-white small-text font-bold">
                                                    {commentItem.user.display_name[0]}
                                                </div>
                                            )}
                                        </div>
                                    </Link>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* User Info */}
                                        <div className="flex items-center gap-2 mb-1">
                                            <Link
                                                href={`/profile/${commentItem.user.username}`}
                                                className="small-text font-bold text-slate-900 hover:text-primary transition-colors"
                                            >
                                                {commentItem.user.display_name}
                                            </Link>
                                            <span className="small-text-2 text-slate-500">
                                                {formatDate(commentItem.created_at)}
                                            </span>
                                        </div>

                                        {/* Comment Text */}
                                        <p className="normal-text-2 text-slate-700 leading-relaxed">
                                            {commentItem.content}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <button className="flex items-center gap-1 text-slate-500 hover:text-primary small-text-2 transition-colors">
                                                <ThumbsUp className="w-3.5 h-3.5" />
                                                <span>{commentItem.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-1 text-slate-500 hover:text-primary small-text-2 transition-colors">
                                                <Reply className="w-3.5 h-3.5" />
                                                <span>Reply</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                {index < comments.length - 1 && (
                                    <div className="ml-13 border-b border-slate-100" />
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EventDetailComments;