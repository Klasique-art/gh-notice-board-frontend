"use client";

import { SettingsHeader, SettingsNavigationCards } from "@/components";

const SettingsContent = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <SettingsHeader />

            {/* Navigation Cards */}
            <SettingsNavigationCards />
        </div>
    );
};

export default SettingsContent;