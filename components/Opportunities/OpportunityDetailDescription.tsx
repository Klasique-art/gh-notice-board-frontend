"use client";

import { motion } from "framer-motion";
import { OpportunityDetail } from "@/types/opportunities.types";

interface OpportunityDetailDescriptionProps {
    opportunity: OpportunityDetail;
}

const OpportunityDetailDescription = ({
    opportunity,
}: OpportunityDetailDescriptionProps) => {
    const description = opportunity.description || opportunity.summary;
    const organizationDescription = opportunity.organization_description;
    const benefits = opportunity.benefits;

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
                    <p className="normal-text text-slate-700 leading-relaxed">
                        {description}
                    </p>

                    {(organizationDescription || benefits || opportunity.is_remote || opportunity.is_diaspora) && (
                        <div className="mt-6 space-y-4">
                            {organizationDescription && (
                                <div>
                                    <h3 className="big-text-5 font-bold text-slate-900 mb-2">
                                        About the Organization
                                    </h3>
                                    <p className="normal-text text-slate-700 leading-relaxed">
                                        {organizationDescription}
                                    </p>
                                </div>
                            )}

                            {benefits && (
                                <div>
                                    <h3 className="big-text-5 font-bold text-slate-900 mb-2">
                                        Benefits
                                    </h3>
                                    <p className="normal-text text-slate-700 leading-relaxed">
                                        {benefits}
                                    </p>
                                </div>
                            )}

                            {opportunity.is_remote && (
                                <p className="normal-text text-slate-700 leading-relaxed">
                                    Remote work flexibility is available for this opportunity.
                                </p>
                            )}

                            {opportunity.is_diaspora && (
                                <p className="normal-text text-slate-700 leading-relaxed">
                                    This opportunity is designed for members of the Ghanaian diaspora.
                                </p>
                            )}
                        </div>
                    )}

                    {!organizationDescription && !benefits && !opportunity.is_remote && !opportunity.is_diaspora && (
                        <div className="mt-6">
                            <p className="normal-text text-slate-700 leading-relaxed">
                                This opportunity is hosted by {opportunity.organization_name} in{" "}
                                {opportunity.city}, {opportunity.region}.
                            </p>
                        </div>
                    )}
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
