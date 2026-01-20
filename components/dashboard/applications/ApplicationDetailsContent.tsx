"use client";

import { Application } from "@/types/applications.types";
import {
    ApplicationDetailsHeader,
    ApplicationOpportunityCard,
    ApplicationPersonalInfo,
    ApplicationDocuments,
    ApplicationStatusTracker,
    ApplicationInterviewInfo,
    ApplicationFeedback,
    ApplicationAIMatch,
    ApplicationActions,
} from "@/components";

interface ApplicationDetailsContentProps {
    application: Application;
}

const ApplicationDetailsContent = ({
    application,
}: ApplicationDetailsContentProps) => {
    return (
        <div className="space-y-6">
            {/* Header with Status */}
            <ApplicationDetailsHeader application={application} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Status & AI Match */}
                <div className="lg:col-span-1 space-y-6">
                    <ApplicationStatusTracker application={application} />
                    {application.ai_match_score && (
                        <ApplicationAIMatch application={application} />
                    )}
                    <ApplicationActions application={application} />
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    <ApplicationOpportunityCard opportunity={application.opportunity_details} />

                    {application.interview_date && (
                        <ApplicationInterviewInfo application={application} />
                    )}

                    {application.reviewer_notes && (
                        <ApplicationFeedback application={application} />
                    )}

                    <ApplicationPersonalInfo application={application} />
                    <ApplicationDocuments application={application} />
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsContent;