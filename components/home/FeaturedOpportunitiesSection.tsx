import { Section } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight, Globe } from "lucide-react";
import { Opportunity } from "@/types/opportunities.types";

interface FeaturedOpportunitiesSectionProps {
    opportunities: Opportunity[];
}

const FeaturedOpportunitiesSection = ({ opportunities }: FeaturedOpportunitiesSectionProps) => {
    return (
        <Section
            title="Featured Opportunities"
            subtitle="Discover jobs, scholarships, and grants for Ghanaians"
            titleStyles="text-primary"
            subtitleStyles="text-slate-600"
            sectionStyles="bg-slate-50"
            titleId="featured-opportunities"
            ariaLabelledby="featured-opportunities"
        >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {opportunities.slice(0, 6).map((opportunity) => (
                    <Link
                        key={opportunity.id}
                        href={`/opportunities/${opportunity.slug}`}
                        className="group bg-white rounded-xl border-2 border-slate-200 hover:border-primary transition-all overflow-hidden"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-slate-100">
                            <Image
                                src={opportunity.organization_logo || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"}
                                alt={opportunity.organization_name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {opportunity.is_diaspora && (
                                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-secondary/90 backdrop-blur-sm flex items-center gap-1">
                                    <Globe className="w-3 h-3 text-primary" />
                                    <span className="small-text-2 text-primary font-semibold">Diaspora</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-2 md:p-4">
                            {/* Type Badge */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary small-text font-semibold capitalize">
                                    {opportunity.opportunity_type.replace("-", " ")}
                                </span>
                                {opportunity.employment_type && (
                                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 small-text capitalize">
                                        {opportunity.employment_type}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="big-text-5 font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                {opportunity.title}
                            </h3>

                            {/* Organization */}
                            <p className="normal-text text-slate-600 mb-3">{opportunity.organization_name}</p>

                            {/* Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-slate-500 small-text">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    <span className="line-clamp-1">{opportunity.location}</span>
                                </div>
                                {opportunity.deadline && (
                                    <div className="flex items-center gap-2 text-slate-500 small-text">
                                        <Clock className="w-4 h-4 shrink-0" />
                                        <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString("en-GB")}</span>
                                    </div>
                                )}
                            </div>

                            {/* Salary/Funding */}
                            {opportunity.salary_range && opportunity.show_salary && (
                                <div className="pt-2 border-t border-slate-200">
                                    <span className="normal-text-2 font-bold text-primary">
                                        {opportunity.salary_range}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
                <Link
                    href="/opportunities"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary-100 transition-all group"
                >
                    <Briefcase className="w-5 h-5" />
                    <span className="big-text-5 font-semibold">Explore All Opportunities</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </Section>
    );
};

export default FeaturedOpportunitiesSection;