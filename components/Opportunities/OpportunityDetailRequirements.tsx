"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code, Languages, Award, CheckCircle } from "lucide-react";
import { OpportunityDetail } from "@/types/opportunities.types";

interface OpportunityDetailRequirementsProps {
    opportunity: OpportunityDetail;
}

function toList(value: string): string[] {
    return value
        .split(/\r?\n|,|;|•/)
        .map((item) => item.trim())
        .filter(Boolean);
}

const OpportunityDetailRequirements = ({
    opportunity,
}: OpportunityDetailRequirementsProps) => {
    const requirements = {
        education: opportunity.education_requirement || "",
        experience: opportunity.experience_requirement || "",
        skills: toList(opportunity.skills_required || ""),
        languages: toList(opportunity.languages_required || ""),
        certifications: toList(opportunity.certifications_required || ""),
        eligibility: opportunity.eligibility_criteria || "",
        selectionProcess: opportunity.selection_process || "",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8"
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="big-text-3 font-bold text-slate-900 mb-2">
                        Requirements & Qualifications
                    </h2>
                    <div className="w-16 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
                </div>

                <div className="space-y-6">
                    {requirements.education && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <GraduationCap className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="big-text-5 font-bold text-slate-900 mb-2">
                                    Education
                                </h3>
                                <p className="normal-text text-slate-700 leading-relaxed">
                                    {requirements.education}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Experience */}
                    {requirements.experience && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Briefcase className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="big-text-5 font-bold text-slate-900 mb-2">
                                    Experience
                                </h3>
                                <p className="normal-text text-slate-700 leading-relaxed">
                                    {requirements.experience}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {requirements.skills.length > 0 && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Code className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="big-text-5 font-bold text-slate-900 mb-3">
                                    Required Skills
                                </h3>
                                <ul className="space-y-2">
                                    {requirements.skills.map((skill, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 normal-text text-slate-700"
                                        >
                                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {requirements.languages.length > 0 && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Languages className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="big-text-5 font-bold text-slate-900 mb-3">
                                    Language Requirements
                                </h3>
                                <ul className="space-y-2">
                                    {requirements.languages.map((language, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 normal-text text-slate-700"
                                        >
                                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                            {language}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {requirements.certifications.length > 0 && (
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="big-text-5 font-bold text-slate-900 mb-3">
                                    Certifications
                                </h3>
                                <ul className="space-y-2">
                                    {requirements.certifications.map((cert, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 normal-text text-slate-700"
                                        >
                                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Scholarship / Grant Specific */}
                    {requirements.eligibility && (
                        <div className="pt-4 border-t border-slate-200">
                            <h3 className="big-text-5 font-bold text-slate-900 mb-2">
                                Eligibility Criteria
                            </h3>
                            <p className="normal-text text-slate-700 leading-relaxed">
                                {requirements.eligibility}
                            </p>
                        </div>
                    )}
                    {requirements.selectionProcess && (
                        <div>
                            <h3 className="big-text-5 font-bold text-slate-900 mb-2">
                                Selection Process
                            </h3>
                            <p className="normal-text text-slate-700 leading-relaxed">
                                {requirements.selectionProcess}
                            </p>
                        </div>
                    )}
                </div>

                {/* Additional Benefits */}
                {opportunity.is_remote && (
                    <div className="pt-6 border-t border-slate-200">
                        <h3 className="big-text-5 font-bold text-slate-900 mb-3">
                            Additional Information
                        </h3>
                        <ul className="space-y-2">
                            {opportunity.is_remote && (
                                <li className="flex items-center gap-2 normal-text text-slate-700">
                                    <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                                    Remote work flexibility available
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default OpportunityDetailRequirements;
