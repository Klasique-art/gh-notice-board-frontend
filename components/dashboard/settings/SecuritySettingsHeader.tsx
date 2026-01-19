import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

const SecuritySettingsHeader = () => {
    return (
        <div className="space-y-4">
            {/* Back Link */}
            <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-100 transition-colors normal-text font-medium"
            >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Settings
            </Link>

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-2 font-bold text-slate-900">
                        Security Settings
                    </h1>
                    <p className="normal-text text-slate-600">
                        Manage your password, email, and account security
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettingsHeader;