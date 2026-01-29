"use client";

import { motion } from "framer-motion";
import { Event, EventDetail } from "@/types/events.types";

interface EventDetailDescriptionProps {
    event: EventDetail;
}

const EventDetailDescription = ({ event }: EventDetailDescriptionProps) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8 lg:p-10"
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="big-text-3 font-bold text-slate-900 mb-2">About This Event</h2>
                    <div className="w-16 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
                </div>

                {/* Description Content */}
                <div className="prose prose-slate max-w-none">
                    {/* 
                        In production, this would be rendered as rich HTML from the backend
                        For now, we'll split the content into paragraphs
                    */}
                    {event.description.split("\n\n").map((paragraph, index) => (
                        <p
                            key={index}
                            className="normal-text text-slate-700 leading-relaxed mb-6 first:mt-0 last:mb-0"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Category Badge */}
                {event.category && (
                    <div className="pt-6 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                            <span className="small-text text-slate-600">Category:</span>
                            <span
                                className="px-3 py-1 rounded-lg text-white small-text font-semibold"
                                style={{ backgroundColor: event.category.color }}
                            >
                                {event.category.name}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </motion.article>
    );
};

export default EventDetailDescription;