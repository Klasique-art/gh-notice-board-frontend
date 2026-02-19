"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Send,
    Heart,
    Bookmark,
    Share2,
    CheckCircle,
    ExternalLink,
    AlertTriangle,
    Loader2,
    X,
} from "lucide-react";
import { OpportunityDetail } from "@/types/opportunities.types";
import { addBookmark, removeBookmark } from "@/app/lib/bookmarkInteractions";
import { useToast } from "@/components/ui/ToastProvider";

interface OpportunityDetailApplicationProps {
    opportunity: OpportunityDetail;
}

type ApplyFormState = {
    full_name: string;
    email: string;
    phone: string;
    location: string;
    cover_letter: string;
    portfolio_url: string;
    linkedin_url: string;
    years_of_experience: string;
    current_position: string;
    current_company: string;
    availability: string;
    references: string;
    cv_file: File | null;
};

function buildInitialFormState(): ApplyFormState {
    return {
        full_name: "",
        email: "",
        phone: "",
        location: "",
        cover_letter: "",
        portfolio_url: "",
        linkedin_url: "",
        years_of_experience: "",
        current_position: "",
        current_company: "",
        availability: "",
        references: "",
        cv_file: null,
    };
}

const OpportunityDetailApplication = ({
    opportunity,
}: OpportunityDetailApplicationProps) => {
    const [hasApplied, setHasApplied] = useState(opportunity.user_applied);
    const [isLiked, setIsLiked] = useState(opportunity.user_liked);
    const [isSaved, setIsSaved] = useState(opportunity.user_saved);
    const [isSavePending, setIsSavePending] = useState(false);
    const [likesCount, setLikesCount] = useState(opportunity.likes_count);
    const [applicationsCount, setApplicationsCount] = useState(
        opportunity.applications_count
    );

    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [formState, setFormState] = useState<ApplyFormState>(buildInitialFormState);
    const { showToast } = useToast();

    const daysUntilDeadline = opportunity.days_until_deadline;
    const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 7;
    const isClosed =
        !!opportunity.deadline &&
        daysUntilDeadline !== null &&
        daysUntilDeadline <= 0;
    const hasExternalUrl = Boolean(opportunity.application_url);
    const method = (opportunity.application_method || "").toLowerCase();
    const isExternalMethod = method.includes("external");
    const isEmailMethod = method.includes("email");
    const canUseInternalApply = !isExternalMethod && !isEmailMethod;

    const canSubmit = useMemo(() => {
        return (
            formState.full_name.trim().length > 0 &&
            formState.email.trim().length > 0 &&
            formState.phone.trim().length > 0 &&
            formState.location.trim().length > 0 &&
            formState.cover_letter.trim().length > 0
        );
    }, [formState]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleSave = async () => {
        if (isSavePending) return;
        const nextSaved = !isSaved;
        setIsSavePending(true);
        setIsSaved(nextSaved);

        try {
            const payload = { type: "opportunity" as const, object_id: opportunity.id };
            if (nextSaved) {
                await addBookmark(payload);
                showToast({
                    title: "Saved",
                    description: "This opportunity has been added to your bookmarks.",
                    tone: "success",
                });
            } else {
                await removeBookmark(payload);
                showToast({
                    title: "Removed",
                    description: "This opportunity has been removed from your bookmarks.",
                    tone: "info",
                });
            }
        } catch (error) {
            setIsSaved(!nextSaved);
            showToast({
                title: "Bookmark update failed",
                description: error instanceof Error ? error.message : "Please try again.",
                tone: "error",
            });
        } finally {
            setIsSavePending(false);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: opportunity.title,
                text: opportunity.summary,
                url: window.location.href,
            });
            return;
        }

        navigator.clipboard.writeText(window.location.href);
    };

    const onFieldChange = (
        key: keyof ApplyFormState,
        value: ApplyFormState[keyof ApplyFormState]
    ) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    const handleApplySubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);
        setFormSuccess(null);

        if (!canSubmit) {
            setFormError("Please complete all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = new FormData();
            payload.append("opportunity", opportunity.id);
            payload.append("full_name", formState.full_name.trim());
            payload.append("email", formState.email.trim());
            payload.append("phone", formState.phone.trim());
            payload.append("location", formState.location.trim());
            payload.append("cover_letter", formState.cover_letter.trim());
            if (formState.portfolio_url.trim()) {
                payload.append("portfolio_url", formState.portfolio_url.trim());
            }
            if (formState.linkedin_url.trim()) {
                payload.append("linkedin_url", formState.linkedin_url.trim());
            }
            if (formState.years_of_experience.trim()) {
                payload.append("years_of_experience", formState.years_of_experience.trim());
            }
            if (formState.current_position.trim()) {
                payload.append("current_position", formState.current_position.trim());
            }
            if (formState.current_company.trim()) {
                payload.append("current_company", formState.current_company.trim());
            }
            if (formState.availability.trim()) {
                payload.append("availability", formState.availability.trim());
            }
            if (formState.references.trim()) {
                payload.append("references", formState.references.trim());
            }
            if (formState.cv_file) {
                payload.append("cv_file", formState.cv_file);
            }

            const response = await fetch("/api/applications", {
                method: "POST",
                body: payload,
            });

            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                setFormError("Please sign in to submit your application.");
                return;
            }

            if (!response.ok) {
                const detail =
                    data?.detail ||
                    data?.error ||
                    "Application submission failed. Please check your details and try again.";
                setFormError(detail);
                return;
            }

            setHasApplied(true);
            setApplicationsCount((prev) => prev + 1);
            setFormSuccess("Application submitted successfully.");
            setShowForm(false);
        } catch {
            setFormError("A network error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-linear-to-r from-primary/5 to-secondary/5 rounded-xl border-2 border-primary/20 p-6"
        >
            <div className="space-y-4">
                {hasApplied && (
                    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-secondary/20 text-primary border border-secondary">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="normal-text font-semibold">
                                You have already applied for this opportunity.
                            </span>
                        </div>
                        <Link
                            href="/dashboard/applications"
                            className="small-text font-semibold underline"
                        >
                            View in dashboard
                        </Link>
                    </div>
                )}

                {formSuccess && (
                    <div className="px-4 py-3 rounded-lg bg-green-100 text-green-700 border border-green-200 normal-text font-semibold">
                        {formSuccess}
                    </div>
                )}

                {isUrgent && !hasApplied && daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent/10 text-accent border border-accent">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="normal-text font-semibold">
                            Only {daysUntilDeadline} {daysUntilDeadline === 1 ? "day" : "days"} left to apply.
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-50">
                        {isClosed ? (
                            <div className="w-full py-3 px-6 rounded-lg bg-slate-300 text-slate-600 text-center font-bold normal-text">
                                Application Closed
                            </div>
                        ) : hasApplied ? (
                            <div className="w-full py-3 px-6 rounded-lg bg-secondary text-primary text-center font-bold normal-text border-2 border-secondary">
                                Applied
                            </div>
                        ) : (
                            <>
                                {canUseInternalApply && (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="w-full py-3 px-6 rounded-lg font-bold normal-text transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg bg-primary hover:bg-primary-100 text-white shadow-primary/30"
                                    >
                                        <Send className="w-5 h-5" />
                                        Apply Now
                                    </button>
                                )}
                                {!canUseInternalApply && (
                                    <div className="w-full py-3 px-6 rounded-lg bg-slate-100 text-slate-700 text-center font-bold normal-text">
                                        Apply via{" "}
                                        {isEmailMethod ? "Email" : "External Website"}
                                    </div>
                                )}
                            </>
                        )}

                        {!hasApplied && hasExternalUrl && (
                            <div className="mt-2 text-center">
                                <a
                                    href={opportunity.application_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-primary hover:text-primary-100 small-text font-semibold transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Apply on organization website
                                </a>
                            </div>
                        )}
                        {!hasApplied && isEmailMethod && opportunity.application_email && (
                            <div className="mt-2 text-center">
                                <a
                                    href={`mailto:${opportunity.application_email}?subject=Application%20for%20${encodeURIComponent(opportunity.title)}`}
                                    className="inline-flex items-center gap-1 text-primary hover:text-primary-100 small-text font-semibold transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Apply via email
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text transition-all duration-300 hover:scale-105 ${
                                isLiked
                                    ? "bg-accent/10 text-accent border-2 border-accent"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
                            }`}
                            aria-label="Like opportunity"
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? "fill-accent" : ""}`} />
                            <span className="hidden sm:inline">{likesCount}</span>
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={isSavePending}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text transition-all duration-300 hover:scale-105 ${
                                isSaved
                                    ? "bg-secondary/20 text-primary border-2 border-secondary"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200"
                            }`}
                            aria-label="Save opportunity"
                            aria-pressed={isSaved}
                        >
                            {isSavePending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Bookmark className={`w-5 h-5 ${isSaved ? "fill-secondary" : ""}`} />
                            )}
                            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                        </button>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold small-text bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200 transition-all duration-300 hover:scale-105"
                            aria-label="Share opportunity"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {(opportunity.application_instructions || opportunity.required_documents) && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                        <h4 className="normal-text font-semibold text-slate-900">
                            Application Instructions
                        </h4>
                        {opportunity.application_instructions && (
                            <p className="small-text text-slate-700">
                                {opportunity.application_instructions}
                            </p>
                        )}
                        {opportunity.required_documents && (
                            <p className="small-text text-slate-700">
                                Required documents: {opportunity.required_documents}
                            </p>
                        )}
                    </div>
                )}

                {showForm && !hasApplied && !isClosed && canUseInternalApply && (
                    <div className="rounded-xl border-2 border-slate-200 bg-white p-4 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="big-text-4 font-bold text-slate-900">
                                Submit Application
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100"
                                aria-label="Close application form"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {formError && (
                            <div className="px-4 py-3 rounded-lg bg-red-100 text-red-700 border border-red-200 normal-text">
                                {formError}{" "}
                                {formError.includes("sign in") && (
                                    <Link href="/login" className="font-semibold underline">
                                        Go to login
                                    </Link>
                                )}
                            </div>
                        )}

                        <form onSubmit={handleApplySubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formState.full_name}
                                    onChange={(e) => onFieldChange("full_name", e.target.value)}
                                    placeholder="Full name *"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                    required
                                />
                                <input
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => onFieldChange("email", e.target.value)}
                                    placeholder="Email *"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                    required
                                />
                                <input
                                    type="text"
                                    value={formState.phone}
                                    onChange={(e) => onFieldChange("phone", e.target.value)}
                                    placeholder="Phone *"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                    required
                                />
                                <input
                                    type="text"
                                    value={formState.location}
                                    onChange={(e) => onFieldChange("location", e.target.value)}
                                    placeholder="Location *"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                    required
                                />
                                <input
                                    type="url"
                                    value={formState.portfolio_url}
                                    onChange={(e) => onFieldChange("portfolio_url", e.target.value)}
                                    placeholder="Portfolio URL"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                />
                                <input
                                    type="url"
                                    value={formState.linkedin_url}
                                    onChange={(e) => onFieldChange("linkedin_url", e.target.value)}
                                    placeholder="LinkedIn URL"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    value={formState.years_of_experience}
                                    onChange={(e) =>
                                        onFieldChange("years_of_experience", e.target.value)
                                    }
                                    placeholder="Years of experience"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                />
                                <input
                                    type="text"
                                    value={formState.availability}
                                    onChange={(e) => onFieldChange("availability", e.target.value)}
                                    placeholder="Availability"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                />
                                <input
                                    type="text"
                                    value={formState.current_position}
                                    onChange={(e) =>
                                        onFieldChange("current_position", e.target.value)
                                    }
                                    placeholder="Current position"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                />
                                <input
                                    type="text"
                                    value={formState.current_company}
                                    onChange={(e) =>
                                        onFieldChange("current_company", e.target.value)
                                    }
                                    placeholder="Current company"
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                />
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                        onFieldChange("cv_file", e.target.files?.[0] || null)
                                    }
                                    className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                />
                            </div>

                            <textarea
                                value={formState.cover_letter}
                                onChange={(e) => onFieldChange("cover_letter", e.target.value)}
                                placeholder="Cover letter *"
                                rows={5}
                                className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                                required
                            />

                            <textarea
                                value={formState.references}
                                onChange={(e) => onFieldChange("references", e.target.value)}
                                placeholder="References"
                                rows={3}
                                className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting || !canSubmit}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-primary-100 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-200 text-slate-600 small-text">
                    <span>
                        <strong className="text-slate-900">{applicationsCount}</strong> applications
                    </span>
                    <span>•</span>
                    <span>
                        <strong className="text-slate-900">{opportunity.views_count}</strong> views
                    </span>
                    {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                        <>
                            <span>•</span>
                            <span className={isUrgent ? "text-accent font-semibold" : ""}>
                                <strong className={isUrgent ? "text-accent" : "text-slate-900"}>
                                    {daysUntilDeadline}
                                </strong>{" "}
                                days left
                            </span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default OpportunityDetailApplication;
