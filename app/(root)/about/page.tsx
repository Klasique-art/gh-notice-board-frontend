import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Newspaper, Calendar, Briefcase, Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "About | Ghana Notice Board",
    description:
        "Learn about Ghana Notice Board: our mission, what we offer, and how we connect communities in Ghana and across the diaspora.",
};

const AboutPage = () => {
    const pillars = [
        {
            title: "Trusted News",
            description:
                "Follow updates from credible sources and stay informed about developments that matter.",
            icon: Newspaper,
        },
        {
            title: "Community Events",
            description:
                "Discover conferences, meetups, and cultural gatherings happening across Ghana and beyond.",
            icon: Calendar,
        },
        {
            title: "Real Opportunities",
            description:
                "Find jobs, scholarships, grants, and programs with practical pathways for growth.",
            icon: Briefcase,
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-white border-b border-slate-200">
                <div className="inner-wrapper py-16 md:py-20">
                    <div className="max-w-3xl space-y-5">
                        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold small-text">
                            <Globe className="w-4 h-4" />
                            About Ghana Notice Board
                        </p>
                        <h1 className="big-text-1 font-bold text-slate-900">
                            A digital hub for news, opportunities, and community connections.
                        </h1>
                        <p className="big-text-4 text-slate-600">
                            Ghana Notice Board helps people discover quality information, useful
                            opportunities, and meaningful community activity in one place.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link
                                href="/opportunities"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary-100 font-semibold"
                            >
                                Browse Opportunities
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/5 font-semibold"
                            >
                                Read Latest News
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="inner-wrapper py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillars.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-sm"
                            >
                                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h2 className="big-text-4 font-bold text-slate-900 mb-2">
                                    {item.title}
                                </h2>
                                <p className="normal-text text-slate-600">{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="inner-wrapper pb-16 md:pb-20">
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 md:p-10 space-y-6">
                    <h2 className="big-text-3 font-bold text-slate-900">Our Mission</h2>
                    <p className="normal-text text-slate-700 leading-relaxed">
                        We are building a practical platform that makes it easier for people in
                        Ghana and the diaspora to stay informed, access verified opportunities,
                        and engage with their communities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold">
                                <Users className="w-4 h-4 text-primary" />
                                Community First
                            </div>
                            <p className="small-text text-slate-600">
                                Content and features are designed to support people, organizations,
                                and communities with real-world value.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                Trust and Quality
                            </div>
                            <p className="small-text text-slate-600">
                                We prioritize reliable information and well-structured listings so
                                users can make better decisions faster.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="inner-wrapper pb-10 md:pb-12">
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 md:p-10 space-y-5">
                    <h2 className="big-text-3 font-bold text-slate-900">
                        What You Can Do Here
                    </h2>
                    <p className="normal-text text-slate-700 leading-relaxed">
                        Users come to Ghana Notice Board for different goals, but the platform is
                        intentionally simple: discover important updates, identify meaningful
                        opportunities, and take action quickly.
                    </p>
                    <p className="normal-text text-slate-700 leading-relaxed">
                        You can follow breaking developments, browse event listings by relevance,
                        open opportunity details with deadlines and requirements, and keep track of
                        your own applications from the dashboard.
                    </p>
                    <p className="normal-text text-slate-700 leading-relaxed">
                        The experience is built to reduce friction. Instead of scattered links and
                        incomplete context, users get structured information and clearer next steps.
                    </p>
                </div>
            </section>

            <section className="inner-wrapper pb-16 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <article className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8 space-y-4">
                        <h3 className="big-text-4 font-bold text-slate-900">
                            Who This Platform Serves
                        </h3>
                        <p className="normal-text text-slate-700 leading-relaxed">
                            Ghana Notice Board supports students, early-career talent,
                            professionals, founders, community organizers, and institutions that
                            want better reach and visibility.
                        </p>
                        <p className="normal-text text-slate-700 leading-relaxed">
                            It also serves people in the Ghanaian diaspora who want a direct line
                            to trustworthy news, opportunities, and community activity connected to
                            Ghana.
                        </p>
                    </article>

                    <article className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8 space-y-4">
                        <h3 className="big-text-4 font-bold text-slate-900">
                            Our Product Principles
                        </h3>
                        <p className="normal-text text-slate-700 leading-relaxed">
                            We prioritize clarity over clutter. Listings should be actionable,
                            details should be understandable, and the platform should make progress
                            easier for users.
                        </p>
                        <p className="normal-text text-slate-700 leading-relaxed">
                            We keep improving quality, reliability, and moderation so users can
                            trust what they read and invest their time where it truly matters.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
