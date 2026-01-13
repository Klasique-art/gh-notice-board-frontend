import Link from "next/link";
import { UserPlus, Sparkles } from "lucide-react";

const CTASection = () => {
    return (
        <section className="py-20 bg-linear-to-br from-primary via-primary-100 to-primary-200 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
            </div>

            <div className="inner-wrapper relative z-10">
                <div className="max-w-3xl mx-auto text-center text-white">

                    <h2 className="big-text-1 font-bold mb-6">
                        Be Part of Ghana&apos;s Growing Digital Community
                    </h2>

                    <p className="big-text-4 mb-10 text-white/90 leading-relaxed">
                        Get personalized news, save opportunities, engage with content, and connect with Ghanaians worldwide. Create your free account today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-primary hover:bg-secondary/90 transition-all group shadow-lg"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span className="big-text-5 font-bold">Create Free Account</span>
                        </Link>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border-2 border-white/30"
                        >
                            <span className="big-text-5 font-semibold">Learn More</span>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
                        <div className="text-center">
                            <div className="big-text-3 font-bold text-secondary mb-1">10K+</div>
                            <div className="small-text">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="big-text-3 font-bold text-secondary mb-1">500+</div>
                            <div className="small-text">Daily Updates</div>
                        </div>
                        <div className="text-center">
                            <div className="big-text-3 font-bold text-secondary mb-1">1K+</div>
                            <div className="small-text">Opportunities Posted</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;