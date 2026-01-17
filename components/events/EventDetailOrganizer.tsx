"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Twitter, Linkedin, Users, Calendar } from "lucide-react";
import { Organizer } from "@/types/events.types";

interface EventDetailOrganizerProps {
    organizer: Organizer;
}

const EventDetailOrganizer = ({ organizer }: EventDetailOrganizerProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-4"
        >
            <div className="space-y-4">
                {/* Header */}
                <h3 className="big-text-5 font-bold text-slate-900">Event Organizer</h3>

                {/* Organizer Avatar */}
                <Link
                    href={`/profile/${organizer.username}`}
                    className="block relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-slate-200 ring-4 ring-primary/20 hover:ring-primary transition-all duration-300"
                >
                    {organizer.avatar ? (
                        <Image
                            src={organizer.avatar}
                            alt={organizer.full_name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-white big-text-4 font-bold">
                            {organizer.first_name[0]}
                            {organizer.last_name[0]}
                        </div>
                    )}
                </Link>

                {/* Organizer Name */}
                <div className="text-center">
                    <Link
                        href={`/profile/${organizer.username}`}
                        className="block group"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <h4 className="big-text-5 font-bold text-slate-900 group-hover:text-primary transition-colors">
                                {organizer.display_name}
                            </h4>
                            {organizer.is_verified && (
                                <span className="text-secondary" title="Verified">
                                    {organizer.verification_badge}
                                </span>
                            )}
                        </div>
                        <p className="small-text text-slate-600 mt-1">
                            {organizer.user_type === "organization" ? "Organization" : "Individual"}
                        </p>
                    </Link>
                </div>

                {/* Organizer Bio */}
                {organizer.bio && (
                    <p className="small-text text-slate-700 text-center leading-relaxed">
                        {organizer.bio}
                    </p>
                )}

                {/* Organizer Stats */}
                <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-200">
                    <div className="text-center">
                        <p className="normal-text font-bold text-primary">
                            {organizer.followers_count >= 1000
                                ? `${(organizer.followers_count / 1000).toFixed(1)}K`
                                : organizer.followers_count}
                        </p>
                        <p className="small-text-2 text-slate-600">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="normal-text font-bold text-primary">
                            {organizer.posts_count}
                        </p>
                        <p className="small-text-2 text-slate-600">Events</p>
                    </div>
                </div>

                {/* Organizer Info */}
                <div className="space-y-2">
                    {organizer.location && (
                        <div className="flex items-center gap-2 text-slate-600 small-text">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span>{organizer.location}</span>
                        </div>
                    )}
                    {organizer.website && (
                        <a
                            href={organizer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-600 hover:text-primary small-text transition-colors"
                        >
                            <LinkIcon className="w-4 h-4 shrink-0" />
                            <span className="truncate">
                                {organizer.website.replace(/^https?:\/\//, "")}
                            </span>
                        </a>
                    )}
                    <div className="flex items-center gap-2 text-slate-600 small-text">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span>
                            Member since{" "}
                            {new Date(organizer.created_at).toLocaleDateString("en-GB", {
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>

                {/* Social Links */}
                {(organizer.twitter_username || organizer.linkedin_url) && (
                    <div className="flex items-center justify-center gap-2">
                        {organizer.twitter_username && (
                            <a
                                href={`https://twitter.com/${organizer.twitter_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-600 hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                title="Twitter"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {organizer.linkedin_url && (
                            <a
                                href={organizer.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-600 hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                title="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                )}

                {/* Follow Button */}
                <button className="w-full py-2.5 px-4 bg-primary hover:bg-primary-100 text-white text-center rounded-lg font-semibold normal-text-2 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    Follow Organizer
                </button>

                {/* View Profile Button */}
                <Link
                    href={`/profile/${organizer.username}`}
                    className="block w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-center rounded-lg font-semibold normal-text-2 transition-all duration-300"
                >
                    View Full Profile
                </Link>
            </div>
        </motion.div>
    );
};

export default EventDetailOrganizer;