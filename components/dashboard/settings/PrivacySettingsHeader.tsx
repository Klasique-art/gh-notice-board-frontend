import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

const PrivacySettingsHeader = () => {
    return (
        <div className="space-y-4">
            <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-100 transition-colors normal-text font-medium"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Settings
            </Link>

            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-2 font-bold text-slate-900">
                        Privacy & Data
                    </h1>
                    <p className="normal-text text-slate-600">
                        Control profile visibility and communication preferences
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacySettingsHeader;
