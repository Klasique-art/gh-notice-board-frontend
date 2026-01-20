import { Application } from "@/types/applications.types";
import { Check, Circle, X } from "lucide-react";

interface ApplicationStatusTrackerProps {
    application: Application;
}

const ApplicationStatusTracker = ({
    application,
}: ApplicationStatusTrackerProps) => {
    const statusSteps = [
        { key: "draft", label: "Draft" },
        { key: "submitted", label: "Submitted" },
        { key: "under_review", label: "Under Review" },
        { key: "shortlisted", label: "Shortlisted" },
        { key: "interview_scheduled", label: "Interview" },
        { key: "accepted", label: "Accepted" },
    ];

    const currentStatusIndex = statusSteps.findIndex(
        (step) => step.key === application.status
    );

    const isRejected = application.status === "rejected";
    const isWithdrawn = application.status === "withdrawn";

    const getStepStatus = (index: number) => {
        if (isRejected || isWithdrawn) {
            if (index <= currentStatusIndex) return "completed";
            return "pending";
        }

        if (index < currentStatusIndex) return "completed";
        if (index === currentStatusIndex) return "current";
        return "pending";
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <h3 className="big-text-4 font-bold text-slate-900 mb-6">
                Application Status
            </h3>

            <div className="space-y-4">
                {statusSteps.map((step, index) => {
                    const stepStatus = getStepStatus(index);

                    return (
                        <div key={step.key} className="flex items-start gap-3">
                            {/* Status Icon */}
                            <div className="relative">
                                {stepStatus === "completed" ? (
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                        <Check
                                            className="w-5 h-5 text-white"
                                            aria-hidden="true"
                                        />
                                    </div>
                                ) : stepStatus === "current" ? (
                                    <div className="w-8 h-8 rounded-full border-4 border-primary bg-white flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center">
                                        <Circle
                                            className="w-4 h-4 text-slate-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                )}

                                {/* Connecting Line */}
                                {index < statusSteps.length - 1 && (
                                    <div
                                        className={`absolute left-1/2 top-8 w-0.5 h-4 -translate-x-1/2 ${stepStatus === "completed"
                                                ? "bg-primary"
                                                : "bg-slate-300"
                                            }`}
                                    />
                                )}
                            </div>

                            {/* Status Label */}
                            <div className="flex-1 pt-1">
                                <p
                                    className={`normal-text font-medium ${stepStatus === "current"
                                            ? "text-primary"
                                            : stepStatus === "completed"
                                                ? "text-slate-900"
                                                : "text-slate-500"
                                        }`}
                                >
                                    {step.label}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {/* Rejected/Withdrawn Status */}
                {(isRejected || isWithdrawn) && (
                    <div className="flex items-start gap-3 pt-2 border-t-2 border-slate-200 mt-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <X className="w-5 h-5 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="normal-text font-medium text-red-700">
                                {isRejected ? "Rejected" : "Withdrawn"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationStatusTracker;