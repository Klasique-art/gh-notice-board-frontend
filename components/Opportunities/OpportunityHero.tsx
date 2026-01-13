import { Briefcase, GraduationCap, DollarSign, Users } from "lucide-react";
import { Section } from "@/components";

const OpportunityHero = () => {
    return (
        <Section
            sectionStyles="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 overflow-hidden"
            containerStyles="opacity-100"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary animate-pulse" />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-secondary" />
            </div>

            {/* Content */}
            <div className="relative text-center space-y-4 pt-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-primary/10 to-secondary/10 mb-2">
                    <Briefcase className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h1 className="massive-text font-extrabold text-slate-900 leading-tight">
                    Discover{" "}
                    <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                        Opportunities
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="big-text-4 text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Find jobs, scholarships, grants, internships, and more opportunities
                    to grow your career and education in Ghana and worldwide
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
                    <div className="text-center p-4 rounded-xl bg-blue-50 border-2 border-blue-100">
                        <div className="big-text-2 font-bold text-blue-600">
                            <Briefcase className="w-6 h-6 inline mb-1" />
                        </div>
                        <div className="small-text text-slate-600">Jobs</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-green-50 border-2 border-green-100">
                        <div className="big-text-2 font-bold text-green-600">
                            <GraduationCap className="w-6 h-6 inline mb-1" />
                        </div>
                        <div className="small-text text-slate-600">Scholarships</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-purple-50 border-2 border-purple-100">
                        <div className="big-text-2 font-bold text-purple-600">
                            <DollarSign className="w-6 h-6 inline mb-1" />
                        </div>
                        <div className="small-text text-slate-600">Grants</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-amber-50 border-2 border-amber-100">
                        <div className="big-text-2 font-bold text-amber-600">
                            <Users className="w-6 h-6 inline mb-1" />
                        </div>
                        <div className="small-text text-slate-600">Internships</div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default OpportunityHero;