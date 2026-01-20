import { Application } from "@/types/applications.types";
import { Calendar, MapPin, Clock, Video } from "lucide-react";

interface ApplicationInterviewInfoProps {
    application: Application;
}

const ApplicationInterviewInfo = ({
    application,
}: ApplicationInterviewInfoProps) => {
    if (!application.interview_date) return null;

    const interviewDate = new Date(application.interview_date);
    const formattedDate = interviewDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedTime = interviewDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const isVirtual =
        application.interview_location &&
        (application.interview_location.toLowerCase().includes("zoom") ||
            application.interview_location.toLowerCase().includes("virtual") ||
            application.interview_location.toLowerCase().includes("meet") ||
            application.interview_location.toLowerCase().includes("teams"));

    return (
        <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-300 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-purple-600" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-purple-900">
                    Interview Scheduled
                </h3>
            </div>

            <div className="space-y-4">
                {/* Date */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-purple-600" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="small-text font-semibold text-purple-700 mb-0.5">
                            Date
                        </p>
                        <p className="normal-text font-bold text-purple-900">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-purple-600" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="small-text font-semibold text-purple-700 mb-0.5">
                            Time
                        </p>
                        <p className="normal-text font-bold text-purple-900">
                            {formattedTime}
                        </p>
                    </div>
                </div>

                {/* Location */}
                {application.interview_location && (
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center shrink-0">
                            {isVirtual ? (
                                <Video className="w-5 h-5 text-purple-600" aria-hidden="true" />
                            ) : (
                                <MapPin className="w-5 h-5 text-purple-600" aria-hidden="true" />
                            )}
                        </div>
                        <div>
                            <p className="small-text font-semibold text-purple-700 mb-0.5">
                                {isVirtual ? "Virtual Meeting" : "Location"}
                            </p>
                            <p className="normal-text font-bold text-purple-900">
                                {application.interview_location}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Reminder */}
            <div className="mt-4 p-3 bg-secondary/20 rounded-lg border-2 border-secondary/30">
                <p className="small-text text-primary">
                    <strong>💡 Reminder:</strong> Please arrive 10 minutes early and
                    prepare your documents. Good luck!
                </p>
            </div>
        </div>
    );
};

export default ApplicationInterviewInfo;