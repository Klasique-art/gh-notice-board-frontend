"use client";

import { useState } from "react";
import { Eye, Globe, Mail, MessageSquare, Save } from "lucide-react";
import { CurrentUser } from "@/types/general.types";
import { PrivacySettingsHeader } from "@/components";

interface PrivacySettingsContentProps {
    currentUser: CurrentUser;
}

const PrivacySettingsContent = ({ currentUser }: PrivacySettingsContentProps) => {
    const [showEmail, setShowEmail] = useState(currentUser.profile.show_email);
    const [showLocation, setShowLocation] = useState(currentUser.profile.show_location);
    const [allowMessages, setAllowMessages] = useState(currentUser.profile.allow_messages);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const saveSettings = async () => {
        setSaved(false);
        setIsSaving(true);
        try {
            // Placeholder for backend PATCH /users/update_profile/ when wired for privacy fields.
            await new Promise((resolve) => setTimeout(resolve, 700));
            setSaved(true);
        } finally {
            setIsSaving(false);
        }
    };

    const toggleItems = [
        {
            id: "show_email",
            title: "Show Email Address",
            description: "Allow other users to see your email on your public profile.",
            icon: Mail,
            value: showEmail,
            onChange: setShowEmail,
        },
        {
            id: "show_location",
            title: "Show Location",
            description: "Display your location publicly on your profile.",
            icon: Globe,
            value: showLocation,
            onChange: setShowLocation,
        },
        {
            id: "allow_messages",
            title: "Allow Direct Messages",
            description: "Let other users contact you through direct messages.",
            icon: MessageSquare,
            value: allowMessages,
            onChange: setAllowMessages,
        },
    ];

    return (
        <div className="space-y-6">
            <PrivacySettingsHeader />

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                        <p className="normal-text font-semibold text-emerald-900 mb-1">
                            Privacy Controls
                        </p>
                        <p className="small-text text-emerald-800">
                            These settings control what other users can see and how they can reach you.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-sm space-y-4">
                {toggleItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className="flex items-start justify-between gap-4 p-4 rounded-lg border border-slate-200"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-slate-700" />
                                </div>
                                <div>
                                    <h3 className="normal-text font-semibold text-slate-900">
                                        {item.title}
                                    </h3>
                                    <p className="small-text text-slate-600">{item.description}</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={item.value}
                                onClick={() => item.onChange(!item.value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    item.value ? "bg-primary" : "bg-slate-300"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        item.value ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                    );
                })}

                <div className="pt-2 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={saveSettings}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold disabled:opacity-60"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save Privacy Settings"}
                    </button>
                    {saved && (
                        <span className="small-text text-emerald-700 font-medium">
                            Saved successfully.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivacySettingsContent;
