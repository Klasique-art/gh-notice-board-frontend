"use client";

import { motion } from "framer-motion";
import { Opportunity } from "@/types/opportunities.types";

interface OpportunityDetailDescriptionProps {
    opportunity: Opportunity;
}

const OpportunityDetailDescription = ({
    opportunity,
}: OpportunityDetailDescriptionProps) => {
    // In production, OpportunityDetail would have a 'description' field
    // For now, we'll use the summary as a placeholder
    const description = opportunity.summary;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 md:p-8 lg:p-10"
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="big-text-3 font-bold text-slate-900 mb-2">
                        About This {opportunity.opportunity_type_display}
                    </h2>
                    <div className="w-16 h-1 bg-linear-to-r from-primary to-secondary rounded-full" />
                </div>

                {/* Description Content */}
                <div className="prose prose-slate max-w-none">
                    {/* 
                        In production, this would be rendered as rich HTML from the backend
                        OpportunityDetail.description field
                    */}
                    <p className="normal-text text-slate-700 leading-relaxed">
                        {description}
                    </p>

                    {/* Mock additional content */}
                    <div className="mt-6 space-y-4">
                        <p className="normal-text text-slate-700 leading-relaxed">
                            This is an exciting opportunity to join {opportunity.organization_name}{" "}
                            and contribute to meaningful work in {opportunity.city}, {opportunity.region}.
                        </p>

                        <p className="normal-text text-slate-700 leading-relaxed">
                            We are looking for talented individuals who are passionate about making
                            a difference and ready to take on new challenges in a dynamic environment.
                        </p>

                        {opportunity.is_remote && (
                            <p className="normal-text text-slate-700 leading-relaxed">
                                This position offers remote work flexibility, allowing you to work from
                                anywhere while collaborating with our team.
                            </p>
                        )}

                        {opportunity.is_diaspora && (
                            <p className="normal-text text-slate-700 leading-relaxed">
                                This opportunity is specifically designed for members of the Ghanaian
                                diaspora who want to contribute their skills and experience to Ghana's
                                development.
                            </p>
                        )}
                    </div>
                </div>

                {/* Category & Type */}
                <div className="pt-6 border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="small-text text-slate-600">Type:</span>
                        <span className="px-3 py-1 rounded-lg bg-primary text-white small-text font-semibold">
                            {opportunity.opportunity_type_display}
                        </span>
                        {opportunity.category && (
                            <>
                                <span className="small-text text-slate-600">Category:</span>
                                <span
                                    className="px-3 py-1 rounded-lg text-white small-text font-semibold"
                                    style={{ backgroundColor: opportunity.category.color }}
                                >
                                    {opportunity.category.name}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default OpportunityDetailDescription;