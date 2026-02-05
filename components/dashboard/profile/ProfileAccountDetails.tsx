"use client";

import { useState } from "react";
import { Mail, User, Globe, Check, X, Edit2 } from "lucide-react";
import { CurrentUser } from "@/types/general.types";

interface ProfileAccountDetailsProps {
    user: CurrentUser;
}

const ProfileAccountDetails = ({ user }: ProfileAccountDetailsProps) => {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);

    const accountDetails = [
        {
            icon: Mail,
            label: "Email Address",
            value: user.email,
            visible: user.profile.show_email,
            editable: true,
            isEditing: isEditingEmail,
            setIsEditing: setIsEditingEmail,
            type: "email",
        },
        {
            icon: User,
            label: "Username",
            value: user.username,
            visible: true,
            editable: true,
            isEditing: isEditingUsername,
            setIsEditing: setIsEditingUsername,
            type: "username",
        },
        {
            icon: Globe,
            label: "Language",
            value: user.profile.language === "en" ? "English" :
                user.profile.language === "tw" ? "Twi" :
                    user.profile.language === "ga" ? "Ga" : "Ewe",
            visible: true,
            editable: true,
            isEditing: false,
            setIsEditing: () => { },
            type: "language",
        },
    ];

    const handleSave = (type: string, value: string) => {
        console.log(`Saving ${type}:`, value);
        // In production, call API to update
        if (type === "email") setIsEditingEmail(false);
        if (type === "username") setIsEditingUsername(false);
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="big-text-4 font-bold text-slate-900">Account Details</h2>
            </div>

            <div className="space-y-4">
                {accountDetails.map((detail) => {
                    const Icon = detail.icon;
                    return (
                        <div key={detail.label} className="pb-4 border-b border-slate-200 last:border-b-0 last:pb-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="bg-slate-100 p-2 rounded-lg mt-0.5">
                                        <Icon className="w-4 h-4 text-slate-700" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <label className="small-text font-semibold text-slate-700 block mb-1">
                                            {detail.label}
                                        </label>

                                        {detail.isEditing ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    defaultValue={detail.value}
                                                    className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg normal-text focus:border-primary focus:outline-none"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleSave(detail.type, detail.value)}
                                                    className="p-2 bg-primary hover:bg-primary-100 text-white rounded-lg transition-colors"
                                                    aria-label="Save"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => detail.setIsEditing(false)}
                                                    className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                                                    aria-label="Cancel"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <p className="normal-text text-slate-900 truncate">
                                                    {detail.value}
                                                </p>
                                                {!detail.visible && (
                                                    <span className="small-text-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                                                        Hidden
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {detail.editable && !detail.isEditing && (
                                    <button
                                        onClick={() => detail.setIsEditing(true)}
                                        className="text-primary hover:text-primary-100 p-2 hover:bg-primary/5 rounded-lg transition-all"
                                        aria-label={`Edit ${detail.label}`}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Skills & Interests */}
                <div className="pt-4 space-y-4">
                    {/* Skills */}
                    <div>
                        <label className="small-text font-semibold text-slate-700 block mb-2">
                            Skills
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {user.profile.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full small-text font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                            <button className="px-3 py-1 border-2 border-dashed border-slate-300 hover:border-primary text-slate-600 hover:text-primary rounded-full small-text font-medium transition-colors">
                                + Add Skill
                            </button>
                        </div>
                    </div>

                    {/* Interests */}
                    <div>
                        <label className="small-text font-semibold text-slate-700 block mb-2">
                            Interests
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {user.profile.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="px-3 py-1 bg-secondary/20 text-primary rounded-full small-text font-medium"
                                >
                                    {interest}
                                </span>
                            ))}
                            <button className="px-3 py-1 border-2 border-dashed border-slate-300 hover:border-secondary text-slate-600 hover:text-primary rounded-full small-text font-medium transition-colors">
                                + Add Interest
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAccountDetails;