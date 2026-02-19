"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2,
    MapPin,
    Users,
    CheckCircle,
} from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";

interface OpportunityDetailOrganizationProps {
    opportunity: Opportunity;
}

const OpportunityDetailOrganization = ({
    opportunity,
}: OpportunityDetailOrganizationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-4"
        >
            <div className="space-y-4">
                {/* Header */}
                <h3 className="big-text-5 font-bold text-slate-900">Organization</h3>

                {/* Organization Logo */}
                <div className="relative w-24 h-24 mx-auto rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200">
                    {opportunity.organization_logo ? (
                        <Image
                            src={opportunity.organization_logo}
                            alt={opportunity.organization_name}
                            fill
                            className="object-contain p-2"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-12 h-12 text-slate-400" />
                        </div>
                    )}
                </div>

                {/* Organization Name */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <h4 className="big-text-5 font-bold text-slate-900">
                            {opportunity.organization_name}
                        </h4>
                        {opportunity.organization_verified && (
                            <span className="text-secondary" title="Verified Organization">
                                ✓
                            </span>
                        )}
                    </div>
                    <p className="small-text text-slate-600">
                        {opportunity.category?.name || "Organization"}
                    </p>
                </div>

                {/* Organization Info */}
                <div className="space-y-3 py-4 border-y border-slate-200">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-slate-600 small-text">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span>{opportunity.location}</span>
                    </div>
                </div>

                {/* Organization Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-lg bg-slate-50">
                        <p className="normal-text font-bold text-primary">
                            {Math.floor(Math.random() * 50) + 10}
                        </p>
                        <p className="small-text-2 text-slate-600">Active Posts</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-50">
                        <p className="normal-text font-bold text-primary">
                            {Math.floor(Math.random() * 1000) + 500}
                        </p>
                        <p className="small-text-2 text-slate-600">Followers</p>
                    </div>
                </div>

                {/* What They Offer */}
                <div className="space-y-2">
                    <h4 className="small-text font-bold text-slate-900">What they offer:</h4>
                    <ul className="space-y-1.5">
                        {opportunity.opportunity_type === "job" && (
                            <>
                                <li className="flex items-center gap-2 small-text text-slate-700">
                                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                    Competitive compensation
                                </li>
                                <li className="flex items-center gap-2 small-text text-slate-700">
                                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                    Professional development
                                </li>
                                <li className="flex items-center gap-2 small-text text-slate-700">
                                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                    Health benefits
                                </li>
                            </>
                        )}
                        {opportunity.opportunity_type === "scholarship" && (
                            <>
                                <li className="flex items-center gap-2 small-text text-slate-700">
                                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                    Full tuition coverage
                                </li>
                                <li className="flex items-center gap-2 small-text text-slate-700">
                                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                    Living stipend
                                </li>
                                <li className="flex items-center gap-2 small-text text-slate-700">
                                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                    Mentorship program
                                </li>
                            </>
                        )}
                        {opportunity.is_remote && (
                            <li className="flex items-center gap-2 small-text text-slate-700">
                                <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                                Remote work flexibility
                            </li>
                        )}
                    </ul>
                </div>

                {/* Follow Button */}
                <button className="w-full py-2.5 px-4 bg-primary hover:bg-primary-100 text-white text-center rounded-lg font-semibold normal-text-2 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    Follow Organization
                </button>

                {/* View All Opportunities */}
                <Link
                    href={`/opportunities?org=${opportunity.organization_name}`}
                    className="block w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-center rounded-lg font-semibold normal-text-2 transition-all duration-300"
                >
                    View All Opportunities
                </Link>
            </div>
        </motion.div>
    );
};

export default OpportunityDetailOrganization;
