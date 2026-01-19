"use client";

import { currentUser } from "@/data/dummy.general";

const DashboardWelcome = () => {
    return (
        <div className="mb-6">
            <h1 className="big-text-2 font-bold text-slate-900 mb-2">
                Welcome back, {currentUser.first_name}! 👋
            </h1>
            <p className="normal-text text-slate-600">
                Here&apos;s what&apos;s happening with your account
            </p>
        </div>
    );
};

export default DashboardWelcome;