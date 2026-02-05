"use client";

import { Application } from "@/types/applications.types";
import { useState } from "react";
import { Edit, Trash2, Send, Download, ExternalLink, XCircle } from "lucide-react";
import Link from "next/link";

interface ApplicationActionsProps {
    application: Application;
}

const ApplicationActions = ({ application }: ApplicationActionsProps) => {
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const handleWithdraw = async () => {
        if (!confirm("Are you sure you want to withdraw this application? This action cannot be undone.")) {
            return;
        }

        setIsWithdrawing(true);

        try {
            // In production: Call API to withdraw application
            // await withdrawApplication(application.id);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("Application withdrawn:", application.id);
            // Show success message
            alert("Application withdrawn successfully");
            // Refresh page or redirect
            window.location.reload();
        } catch (error) {
            console.error("Error withdrawing application:", error);
            alert("Failed to withdraw application. Please try again.");
        } finally {
            setIsWithdrawing(false);
        }
    };

    const handleDownload = () => {
        // In production: Generate and download application PDF
        console.log("Downloading application PDF:", application.id);
        alert("PDF download feature coming soon!");
    };

    const canEdit = application.status === "draft";
    const canWithdraw = ["submitted", "under_review"].includes(application.status);
    const canSubmit = application.status === "draft";

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <h3 className="big-text-4 font-bold text-slate-900 mb-4">Actions</h3>

            <div className="space-y-3">
                {/* View Opportunity */}
                <Link
                    href={`/opportunities/${application.opportunity_details.slug}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary hover:bg-primary-100 text-white rounded-lg font-medium normal-text transition-colors"
                >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    View Opportunity
                </Link>

                {/* Edit (Draft only) */}
                {canEdit && (
                    <Link
                        href={`/dashboard/applications/${application.id}/edit`}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary hover:bg-secondary/80 text-primary rounded-lg font-medium normal-text transition-colors"
                    >
                        <Edit className="w-4 h-4" aria-hidden="true" />
                        Edit Application
                    </Link>
                )}

                {/* Submit (Draft only) */}
                {canSubmit && (
                    <button
                        onClick={() => alert("Submit application feature coming soon!")}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium normal-text transition-colors"
                    >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Submit Application
                    </button>
                )}

                {/* Download PDF */}
                <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium normal-text transition-colors"
                >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download PDF
                </button>

                {/* Withdraw */}
                {canWithdraw && (
                    <button
                        onClick={handleWithdraw}
                        disabled={isWithdrawing}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent hover:bg-accent-100 text-white rounded-lg font-medium normal-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isWithdrawing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Withdrawing...
                            </>
                        ) : (
                            <>
                                <XCircle className="w-4 h-4" aria-hidden="true" />
                                Withdraw Application
                            </>
                        )}
                    </button>
                )}

                {/* Delete (Draft only) */}
                {canEdit && (
                    <button
                        onClick={() => {
                            if (confirm("Delete this draft application?")) {
                                alert("Delete feature coming soon!");
                            }
                        }}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-red-300 hover:bg-red-50 text-red-600 rounded-lg font-medium normal-text transition-colors"
                    >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        Delete Draft
                    </button>
                )}
            </div>

            {/* Help Text */}
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="small-text text-slate-600 leading-relaxed">
                    {canEdit && "Complete and submit your draft to send it to the employer."}
                    {canWithdraw && "You can withdraw your application at any time before it's reviewed."}
                    {application.status === "accepted" && "Congratulations! You've been accepted. Contact the employer for next steps."}
                    {application.status === "rejected" && "Use the feedback to improve future applications."}
                </p>
            </div>
        </div>
    );
};

export default ApplicationActions;