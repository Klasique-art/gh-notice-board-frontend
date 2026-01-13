"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Landing = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
            {/* Ghana Flag Inspired Background Design */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Flag Stripe Pattern - Subtle */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-accent" />
                    <div className="absolute top-1/3 left-0 right-0 h-1/3 bg-secondary" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-primary" />
                </div>

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, #006B3F 0%, transparent 70%)",
                    }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute top-1/4 -right-40 w-125 h-125 rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, #FCD116 0%, transparent 70%)",
                    }}
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute bottom-0 left-1/3 w-112.5 h-112.5 rounded-full opacity-15"
                    style={{
                        background: "radial-gradient(circle, #CE1126 0%, transparent 70%)",
                    }}
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Black Star Pattern - Geometric */}
                <div className="absolute top-20 right-1/4 w-32 h-32 opacity-[0.04]">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <motion.polygon
                            points="50,15 61,40 88,40 67,56 73,82 50,65 27,82 33,56 12,40 39,40"
                            fill="#000000"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>
                </div>

                <div className="absolute bottom-32 left-1/4 w-24 h-24 opacity-[0.04]">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <motion.polygon
                            points="50,15 61,40 88,40 67,56 73,82 50,65 27,82 33,56 12,40 39,40"
                            fill="#000000"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>
                </div>

                {/* Geometric Accent Lines */}
                <motion.div
                    className="absolute top-1/3 left-0 w-1 bg-accent/10"
                    style={{ height: "40%" }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                />
                <motion.div
                    className="absolute top-1/4 right-0 w-1 bg-primary/10"
                    style={{ height: "50%" }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.4, delay: 0.7 }}
                />

                {/* Floating Particles */}
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 4 + 1 + "px",
                            height: Math.random() * 4 + 1 + "px",
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor:
                                i % 3 === 0
                                    ? "#006B3F"
                                    : i % 3 === 1
                                        ? "#FCD116"
                                        : "#CE1126",
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center text-center space-y-10 md:space-y-12"
                >

                    {/* Main Heading with Flag-Inspired Accent */}
                    <motion.div variants={itemVariants} className="space-y-6 max-w-5xl">
                        <div className="relative">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                                Connect, Discover,
                                <br />
                                <span className="relative inline-block mt-2">
                                    <span className="relative z-10">Thrive in</span>
                                    <motion.div
                                        className="absolute -left-2 -right-2 top-1/2 -translate-y-1/2 h-5 z-0 -rotate-1"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 1 }}
                                    >
                                        <div className="w-full h-1/3 bg-accent opacity-30" />
                                        <div className="w-full h-1/3 bg-secondary opacity-30" />
                                        <div className="w-full h-1/3 bg-primary opacity-30" />
                                    </motion.div>
                                </span>{" "}
                                <span className="text-primary relative">
                                    Ghana
                                    <motion.div
                                        className="absolute -bottom-3 left-0 right-0 h-2 bg-secondary -z-10"
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.7, delay: 1.2 }}
                                    />
                                </span>
                            </h1>

                            {/* Black Star Accent */}
                            <motion.div
                                className="absolute -top-8 -right-8 w-12 h-12 opacity-20 hidden lg:block"
                                initial={{ rotate: -30, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.5 }}
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <polygon
                                        points="50,15 61,40 88,40 67,56 73,82 50,65 27,82 33,56 12,40 39,40"
                                        fill="#000000"
                                    />
                                </svg>
                            </motion.div>
                        </div>

                        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
                            Your gateway to{" "}
                            <span className="font-semibold text-primary">breaking news</span>,{" "}
                            <span className="font-semibold text-accent">
                                vibrant events
                            </span>
                            , and{" "}
                            <span className="font-semibold text-slate-700">
                                life-changing opportunities
                            </span>{" "}
                            across Ghana and the diaspora
                        </p>
                    </motion.div>

                    {/* CTA Buttons with Ghana Flag Accent */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg"
                    >
                        <Link
                            href="/explore"
                            className="group relative w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-100 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-primary-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10 text-lg font-bold">
                                Explore Platform
                            </span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/about"
                            className="group relative w-full sm:w-auto px-10 py-5 bg-white hover:bg-slate-50 text-primary border-2 border-primary rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <span className="text-lg font-bold">Learn More</span>
                        </Link>
                    </motion.div>

                    {/* Feature Tags with Flag Colors */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center gap-3 pt-6"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-accent/20 shadow-sm"
                        >
                            <span className="text-sm font-semibold text-accent">
                                🔴 Breaking News
                            </span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 shadow-sm"
                        >
                            <span className="text-sm font-semibold text-primary">
                                🌍 Community Events
                            </span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-300 shadow-sm"
                        >
                            <span className="text-sm font-semibold text-slate-700">
                                💼 Opportunities
                            </span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-300 shadow-sm"
                        >
                            <span className="text-sm font-semibold text-slate-700">
                                ⭐ Verified Content
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        variants={itemVariants}
                        className="pt-8 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="font-medium">125K+ Members</span>
                        </div>
                        <div className="w-px h-4 bg-slate-300" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            <span className="font-medium">Daily Updates</span>
                        </div>
                        <div className="w-px h-4 bg-slate-300" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="font-medium">Verified Sources</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Landing;