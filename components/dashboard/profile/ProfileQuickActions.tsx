"use client";

import { FileText, Calendar, Briefcase, MessageCircle, Shield, UserX } from "lucide-react";

const ProfileQuickActions = () => {
    const quickActions = [
        {
            icon: FileText,
            label: "My Content",
            description: "View and manage your posts",
            href: "/dashboard/my-content",
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            icon: Calendar,
            label: "My Events",
            description: "Events you've created",
            href: "/dashboard/my-events",
            color: "text-secondary",
            bgColor: "bg-secondary/10",
        },
        {
            icon: Briefcase,
            label: "Saved Opportunities",
            description: "Bookmarked jobs & scholarships",
            href: "/dashboard/saved",
            color: "text-accent",
            bgColor: "bg-accent/10",
        },
        {
            icon: MessageCircle,
            label: "Messages",
            description: "View your conversations",
            href: "/dashboard/messages",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            icon: Shield,
            label: "Privacy Settings",
            description: "Control who sees your content",
            href: "/dashboard/settings/privacy",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            icon: UserX,
            label: "Deactivate Account",
            description: "Temporarily disable your account",
            href: "/dashboard/settings/deactivate",
            color: "text-slate-600",
            bgColor: "bg-slate-50",
        },
    ];

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-md">
            <h2 className="big-text-4 font-bold text-slate-900 mb-4">Quick Actions</h2>

            <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.label}
                            onClick={() => {
                                // In production, use router.push(action.href)
                                console.log(`Navigate to ${action.href}`);
                            }}
                            className="flex items-start gap-3 p-3 rounded-lg border-2 border-slate-200 hover:border-primary transition-all group text-left"
                        >
                            <div className={`${action.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-5 h-5 ${action.color}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="normal-text font-semibold text-slate-900 group-hover:text-primary transition-colors">
                                    {action.label}
                                </h3>
                                <p className="small-text text-slate-600 truncate">
                                    {action.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileQuickActions;