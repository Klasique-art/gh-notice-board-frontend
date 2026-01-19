import { AlertTriangle } from "lucide-react";

const SecurityInfo = () => {
    return (
        <div className="p-4 bg-secondary/20 rounded-xl border-2 border-secondary/30">
            <div className="flex items-start gap-3">
                <AlertTriangle
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                />
                <div>
                    <p className="normal-text font-semibold text-primary mb-2">
                        Security Best Practices
                    </p>
                    <ul className="small-text text-slate-700 space-y-1">
                        <li>
                            • Use a strong, unique password (at least 8 characters with
                            uppercase, lowercase, and numbers)
                        </li>
                        <li>• Don&apos;t share your password with anyone</li>
                        <li>• Changing your email or username requires verification</li>
                        <li>• Username can only be changed once every 30 days</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SecurityInfo;