"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Twitter, Linkedin, Github } from "lucide-react";
import { AuthorFull } from "@/types/news.types";

interface NewsDetailAuthorProps {
    author: AuthorFull;
}

const NewsDetailAuthor = ({ author }: NewsDetailAuthorProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-4"
        >
            <div className="space-y-4">
                {/* Header */}
                <h3 className="big-text-5 font-bold text-slate-900">About the Author</h3>

                {/* Author Avatar */}
                <Link
                    href={`/profile/${author.username}`}
                    className="block relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-slate-200 ring-4 ring-primary/20 hover:ring-primary transition-all duration-300"
                >
                    {author.avatar ? (
                        <Image
                            src={author.avatar}
                            alt={author.full_name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-white big-text-4 font-bold">
                            {author.display_name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                        </div>
                    )}
                </Link>

                {/* Author Name */}
                <div className="text-center">
                    <Link
                        href={`/profile/${author.username}`}
                        className="block group"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <h4 className="big-text-5 font-bold text-slate-900 group-hover:text-primary transition-colors">
                                {author.display_name}
                            </h4>
                            {author.is_verified && (
                                <span className="text-secondary" title="Verified">
                                    {author.verification_badge}
                                </span>
                            )}
                        </div>
                        <p className="small-text text-slate-600 mt-1">
                            @{author.username}
                        </p>
                    </Link>
                </div>

                {/* Author Bio */}
                {author.bio && (
                    <p className="small-text text-slate-700 text-center leading-relaxed">
                        {author.bio}
                    </p>
                )}

                {/* Author Stats */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-200">
                    <div className="text-center">
                        <p className="normal-text font-bold text-primary">
                            {author.posts_count}
                        </p>
                        <p className="small-text-2 text-slate-600">Articles</p>
                    </div>
                    <div className="text-center">
                        <p className="normal-text font-bold text-primary">
                            {author.followers_count >= 1000
                                ? `${(author.followers_count / 1000).toFixed(1)}K`
                                : author.followers_count}
                        </p>
                        <p className="small-text-2 text-slate-600">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="normal-text font-bold text-primary">
                            {author.following_count >= 1000
                                ? `${(author.following_count / 1000).toFixed(1)}K`
                                : author.following_count}
                        </p>
                        <p className="small-text-2 text-slate-600">Following</p>
                    </div>
                </div>

                {/* Author Info */}
                <div className="space-y-2">
                    {author.location && (
                        <div className="flex items-center gap-2 text-slate-600 small-text">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span>{author.location}</span>
                        </div>
                    )}
                    {author.website && (
                        <a
                            href={author.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-600 hover:text-primary small-text transition-colors"
                        >
                            <LinkIcon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{author.website.replace(/^https?:\/\//, "")}</span>
                        </a>
                    )}
                </div>

                {/* Social Links */}
                {(author.twitter_username || author.linkedin_url || author.github_username) && (
                    <div className="flex items-center justify-center gap-2">
                        {author.twitter_username && (
                            <a
                                href={`https://twitter.com/${author.twitter_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-600 hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                title="Twitter"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {author.linkedin_url && (
                            <a
                                href={author.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-600 hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                title="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                        {author.github_username && (
                            <a
                                href={`https://github.com/${author.github_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-600 hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                title="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                )}

                {/* View Profile Button */}
                <Link
                    href={`/profile/${author.username}`}
                    className="block w-full py-2.5 px-4 bg-primary hover:bg-primary-100 text-white text-center rounded-lg font-semibold normal-text-2 transition-all duration-300 hover:scale-105"
                >
                    View Full Profile
                </Link>
            </div>
        </motion.div>
    );
};

export default NewsDetailAuthor;