import Link from "next/link";
import { Shield, Lock, ChevronRight } from "lucide-react";

const SettingsNavigationCards = () => {
    const settingsSections = [
        {
            title: "Security",
            description: "Manage your password, email, and username",
            icon: Shield,
            href: "/dashboard/settings/security",
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-600",
        },
        {
            title: "Privacy & Data",
            description: "Manage your data and account visibility",
            icon: Lock,
            href: "/dashboard/settings/privacy",
            iconBg: "bg-emerald-500/10",
            iconColor: "text-emerald-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settingsSections.map((section, index) => {
                const Icon = section.icon;

                return (
                    <Link
                        key={index}
                        href={section.href}
                        className="group bg-white rounded-xl border-2 border-slate-200 hover:border-primary transition-all duration-300 p-6 hover:shadow-lg"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={`w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                                <Icon
                                    className={`w-6 h-6 ${section.iconColor}`}
                                    aria-hidden="true"
                                />
                            </div>
                            <ChevronRight
                                className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="big-text-4 font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                            {section.title}
                        </h3>
                        <p className="normal-text-2 text-slate-600">
                            {section.description}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default SettingsNavigationCards;
