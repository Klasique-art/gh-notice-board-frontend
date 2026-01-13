"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const NewsHero = () => {
    return (
        <section className="relative py-20 px-4 bg-linear-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary" />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-secondary" />
            </div>

            <div className="relative mx-auto w-full max-w-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2"
                    >
                        <Newspaper className="w-8 h-8 text-primary" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="massive-text font-extrabold text-slate-900 leading-tight">
                        Latest{" "}
                        <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                            News
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="big-text-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Stay informed with breaking news, featured stories, and trending topics from Ghana and the diaspora
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsHero;