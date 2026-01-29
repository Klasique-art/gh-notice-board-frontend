"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Organizer } from "@/types/events.types";

interface EventDetailOrganizerProps {
    organizer: Organizer;
}

const EventDetailOrganizer = ({ organizer }: EventDetailOrganizerProps) => {
    // Safe fallback for avatar initial
    const getInitial = () => {
        if (organizer.display_name && organizer.display_name.length > 0) {
            return organizer.display_name.charAt(0).toUpperCase();
        }
        if (organizer.username && organizer.username.length > 0) {
            return organizer.username.charAt(0).toUpperCase();
        }
        return 'O';
    };

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
                            alt={organizer.display_name || organizer.username}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-white big-text-4 font-bold">
                            {getInitial()}
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
                                {organizer.display_name || organizer.username}
                            </h4>
                            {organizer.is_verified && (
                                <span className="text-secondary" title="Verified">
                                    ✓
                                </span>
                            )}
                        </div>
                        <p className="small-text text-slate-600 mt-1">
                            Event Organizer
                        </p>
                    </Link>
                </div>

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