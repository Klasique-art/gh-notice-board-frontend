"use client";

import { DiasporaPostDetail } from "@/types/diaspora.types";
import { Section } from "@/components";
import Link from "next/link";
import {
    Share2,
    Calendar,
    Globe,
    Phone,
    Mail,
    ChevronRight,
    User,
    Building,
    ExternalLink
} from "lucide-react";
import Image from "next/image";
import { placeholderImage } from "@/data/constants";

interface DiasporaPostContentProps {
    post: DiasporaPostDetail;
}

const DiasporaPostContent = ({ post }: DiasporaPostContentProps) => {

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.summary,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <Section sectionStyles="bg-slate-50">
            <div className="inner-wrapper">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Summary Block */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-slate-100">
                            <h2 className="big-text-3 font-bold text-slate-900 mb-4">Overview</h2>
                            <p className="big-text-4 text-slate-600 leading-relaxed">
                                {post.summary}
                            </p>
                        </div>

                        {/* Main Body */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-slate-100">
                            <h2 className="big-text-3 font-bold text-slate-900 mb-6">Details</h2>
                            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                                {post.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                ) : (
                                    <p className="text-slate-500 italic">No additional content provided.</p>
                                )}
                            </div>
                        </div>

                        {/* Event Details (Conditional) */}
                        {post.is_upcoming_event && post.event_date && (
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-slate-100">
                                <h2 className="big-text-3 font-bold text-slate-900 mb-6">Event Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-1">Date & Time</h3>
                                            <p className="text-slate-600">
                                                {new Date(post.event_date).toLocaleString('en-GB', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {post.event_location && (
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-secondary/20 rounded-xl text-secondary-700">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-1">Location</h3>
                                                <p className="text-slate-600">{post.event_location}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {post.event_registration_url && (
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <a
                                            href={post.event_registration_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors"
                                        >
                                            Register Now
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Author/Org Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 sticky top-24">
                            <h3 className="small-text font-bold text-slate-400 uppercase tracking-wider mb-6">
                                Posted By
                            </h3>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100">
                                    <Image
                                        src={post.organization_logo || post.author.avatar || placeholderImage}
                                        alt={post.organization_name || post.author.full_name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">
                                        {post.organization_name || post.author.full_name}
                                    </h4>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                        {post.organization_verified || post.author.is_verified ? (
                                            <span className="flex items-center gap-1 text-primary font-medium">
                                                <div className="w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
                                                Verified
                                            </span>
                                        ) : (
                                            <span>Member</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                {post.website_url && (
                                    <a href={post.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors">
                                        <Globe className="w-5 h-5 text-slate-400" />
                                        <span className="text-sm font-medium truncate">Visit Website</span>
                                    </a>
                                )}
                                {post.contact_email && (
                                    <a href={`mailto:${post.contact_email}`} className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors">
                                        <Mail className="w-5 h-5 text-slate-400" />
                                        <span className="text-sm font-medium truncate">{post.contact_email}</span>
                                    </a>
                                )}
                                {post.contact_phone && (
                                    <a href={`tel:${post.contact_phone}`} className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors">
                                        <Phone className="w-5 h-5 text-slate-400" />
                                        <span className="text-sm font-medium truncate">{post.contact_phone}</span>
                                    </a>
                                )}
                            </div>

                            <button
                                onClick={handleShare}
                                className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Share Opportunity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default DiasporaPostContent;
