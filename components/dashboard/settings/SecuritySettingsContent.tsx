"use client";

import {
    SecuritySettingsHeader,
    ChangePasswordForm,
    ChangeEmailForm,
    ChangeUsernameForm,
    SecurityInfo,
} from "@/components";
import { CurrentUser } from "@/types/general.types";

interface SecuritySettingsContentProps {
    currentUser: CurrentUser;
}

const SecuritySettingsContent = ({ currentUser }: SecuritySettingsContentProps) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <SecuritySettingsHeader />

            {/* Security Info */}
            <SecurityInfo />

            {/* Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Change Password */}
                <ChangePasswordForm />

                {/* Change Email */}
                <ChangeEmailForm currentEmail={currentUser.email} />
            </div>

            {/* Change Username */}
            <ChangeUsernameForm currentUser={currentUser} />
        </div>
    );
};

export default SecuritySettingsContent;