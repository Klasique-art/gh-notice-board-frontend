import { Globe, Users, Calendar, TrendingUp } from "lucide-react";
import { Section } from "@/components";

type DiasporaHeroStats = {
    activePosts: number;
    featuredPosts: number;
    urgentUpdates: number;
    eventPosts: number;
};

type DiasporaHeroProps = {
    stats: DiasporaHeroStats;
};

const DiasporaHero = ({ stats }: DiasporaHeroProps) => {
    const formatStat = (value: number): string => {
        return new Intl.NumberFormat("en-US").format(value);
    };

    const statItems = [
        {
            icon: <Globe className="w-6 h-6" />,
            label: "Active Posts",
            value: formatStat(stats.activePosts),
            color: "from-primary to-primary-100",
        },
        {
            icon: <Users className="w-6 h-6" />,
            label: "Featured Posts",
            value: formatStat(stats.featuredPosts),
            color: "from-secondary to-secondary/80",
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            label: "Urgent Updates",
            value: formatStat(stats.urgentUpdates),
            color: "from-accent to-accent-100",
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            label: "Event Posts",
            value: formatStat(stats.eventPosts),
            color: "from-primary-100 to-secondary",
        },
    ];

    return (
        <Section sectionStyles="bg-linear-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
            {/* Animated Background Circles */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="inner-wrapper relative z-10">
                <div className="text-center space-y-6 py-12">
                    {/* Title */}
                    <div className="space-y-4">
                        <h1 className="massive-text font-black text-slate-900">
                            Ghana Diaspora Hub
                        </h1>
                        <p className="big-text-4 text-slate-600 max-w-3xl mx-auto">
                            Connect with Ghanaians worldwide. Share stories,
                            opportunities, and build bridges between Ghana and
                            the diaspora.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                        {statItems.map((stat, index) => (
                            <div
                                key={index}
                                className={`bg-linear-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
                            >
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                        {stat.icon}
                                    </div>
                                    <div className="big-text-2 font-black">
                                        {stat.value}
                                    </div>
                                    <div className="normal-text font-semibold opacity-90">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default DiasporaHero;
