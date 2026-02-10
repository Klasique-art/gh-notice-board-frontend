"use client";

import { useState } from "react";
import { Bell, Mail, Smartphone, Globe, Eye, MessageSquare } from "lucide-react";
import { CurrentUser } from "@/types/general.types";

interface ProfileNotificationSettingsProps {
    settings?: CurrentUser["profile"];
}

const ProfileNotificationSettings = ({ settings }: ProfileNotificationSettingsProps) => {
    const safeSettings = {
        show_email: settings?.show_email ?? false,
        show_location: settings?.show_location ?? true,
        allow_messages: settings?.allow_messages ?? true,
        theme: settings?.theme ?? ("auto" as const),
    };

    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [showEmail, setShowEmail] = useState(safeSettings.show_email);
    const [showLocation, setShowLocation] = useState(safeSettings.show_location);
    const [allowMessages, setAllowMessages] = useState(safeSettings.allow_messages);
    const [theme] = useState(safeSettings.theme);

    const handleToggle = (type: string, value: boolean) => {
        console.log(`Toggling ${type}:`, value);
        // In production, call API to update settings
    };

    const notificationToggles = [
        {
            icon: Mail,
            label: "Email Notifications",
            description: "Receive email updates about your account activity",
            value: emailNotifications,
            setValue: setEmailNotifications,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            icon: Smartphone,
            label: "Push Notifications",
            description: "Get push notifications on your devices",
            value: pushNotifications,
            setValue: setPushNotifications,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
    ];

    const privacyToggles = [
        {
            icon: Mail,
            label: "Show Email",
            description: "Make your email address visible on your profile",
            value: showEmail,
            setValue: setShowEmail,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            icon: Globe,
            label: "Show Location",
            description: "Display your location on your profile",
            value: showLocation,
            setValue: setShowLocation,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            icon: MessageSquare,
            label: "Allow Messages",
            description: "Let other users send you direct messages",
            value: allowMessages,
            setValue: setAllowMessages,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
        },
    ];

    void theme;

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-md">
            <h2 className="big-text-4 font-bold text-slate-900 mb-4">Notifications & Privacy</h2>

            <div className="space-y-6">
                {/* Notifications Section */}
                <div>
                    <h3 className="big-text-5 font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        Notifications
                    </h3>
                    <div className="space-y-3">
                        {notificationToggles.map((toggle) => {
                            const Icon = toggle.icon;
                            return (
                                <div
                                    key={toggle.label}
                                    className="flex items-start justify-between gap-4 p-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors"
                                >
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className={`${toggle.bgColor} p-2 rounded-lg`}>
                                            <Icon className={`w-4 h-4 ${toggle.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor={toggle.label}
                                                className="normal-text font-semibold text-slate-900 cursor-pointer block"
                                            >
                                                {toggle.label}
                                            </label>
                                            <p className="small-text text-slate-600 mt-0.5">
                                                {toggle.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Toggle Switch */}
                                    <button
                                        id={toggle.label}
                                        role="switch"
                                        aria-checked={toggle.value}
                                        onClick={() => {
                                            toggle.setValue(!toggle.value);
                                            handleToggle(toggle.label, !toggle.value);
                                        }}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${toggle.value ? "bg-primary" : "bg-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggle.value ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Privacy Section */}
                <div className="border-t-2 border-slate-200 pt-6">
                    <h3 className="big-text-5 font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        Privacy Settings
                    </h3>
                    <div className="space-y-3">
                        {privacyToggles.map((toggle) => {
                            const Icon = toggle.icon;
                            return (
                                <div
                                    key={toggle.label}
                                    className="flex items-start justify-between gap-4 p-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors"
                                >
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className={`${toggle.bgColor} p-2 rounded-lg`}>
                                            <Icon className={`w-4 h-4 ${toggle.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor={toggle.label}
                                                className="normal-text font-semibold text-slate-900 cursor-pointer block"
                                            >
                                                {toggle.label}
                                            </label>
                                            <p className="small-text text-slate-600 mt-0.5">
                                                {toggle.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Toggle Switch */}
                                    <button
                                        id={toggle.label}
                                        role="switch"
                                        aria-checked={toggle.value}
                                        onClick={() => {
                                            toggle.setValue(!toggle.value);
                                            handleToggle(toggle.label, !toggle.value);
                                        }}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${toggle.value ? "bg-primary" : "bg-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggle.value ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileNotificationSettings;
