"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code, Languages, Award, CheckCircle } from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";

interface OpportunityDetailRequirementsProps {
    opportunity: Opportunity;
}

const OpportunityDetailRequirements = ({
    opportunity,
}: OpportunityDetailRequirementsProps) => {
    // Mock requirements based on opportunity type
    const requirements = {
        education: opportunity.opportunity_type === "scholarship" 
            ? "Currently enrolled in or accepted to an accredited university"
            : opportunity.experience_level === "entry"
            ? "Bachelor's degree or equivalent"
            : "Bachelor's degree in relevant field; Master's preferred",
        experience: opportunity.experience_level_display 
            ? `${opportunity.experience_level_display} experience in relevant field`
            : "2-5 years of relevant experience",
        skills: opportunity.tags.slice(0, 6).map(tag => tag.name),
        languages: ["English (Required)", "Additional local language preferred"],
        certifications: opportunity.opportunity_type === "job" 
            ? ["Professional certification in relevant field (preferred)"]
            : [],
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
                    {/* Education */}
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

                    {/* Experience */}
                    {opportunity.experience_level && (
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
                </div>

                {/* Additional Benefits */}
                {(opportunity.is_remote || opportunity.opportunity_type === "scholarship") && (
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
                            {opportunity.opportunity_type === "scholarship" && (
                                <>
                                    <li className="flex items-center gap-2 normal-text text-slate-700">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                                        Full tuition coverage
                                    </li>
                                    <li className="flex items-center gap-2 normal-text text-slate-700">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                                        Living stipend included
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default OpportunityDetailRequirements;