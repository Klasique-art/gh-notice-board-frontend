import { Application } from "@/types/applications.types";
import { MessageSquare, Info } from "lucide-react";

interface ApplicationFeedbackProps {
    application: Application;
}

const ApplicationFeedback = ({ application }: ApplicationFeedbackProps) => {
    if (!application.reviewer_notes) return null;

    return (
        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-blue-900">
                    Reviewer Feedback
                </h3>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
                <p className="normal-text text-blue-900 leading-relaxed">
                    {application.reviewer_notes}
                </p>
            </div>

            {application.status === "rejected" && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-blue-200/50 rounded-lg">
                    <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="small-text text-blue-800">
                        Use this feedback to improve future applications. Every rejection is
                        a learning opportunity!
                    </p>
                </div>
            )}

            {application.status === "shortlisted" && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-blue-200/50 rounded-lg">
                    <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="small-text text-blue-800">
                        Congratulations! You've been shortlisted. Prepare thoroughly for the
                        next stages.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ApplicationFeedback;