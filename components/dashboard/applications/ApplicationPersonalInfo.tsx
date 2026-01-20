import { Application } from "@/types/applications.types";
import { User, Mail, Phone, MapPin, Briefcase, Building, DollarSign, Clock } from "lucide-react";

interface ApplicationPersonalInfoProps {
    application: Application;
}

const ApplicationPersonalInfo = ({
    application,
}: ApplicationPersonalInfoProps) => {
    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-slate-900">
                    Personal Information
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                    <label className="block small-text font-semibold text-slate-600 mb-1">
                        Full Name
                    </label>
                    <p className="normal-text text-slate-900">{application.full_name}</p>
                </div>

                {/* Email */}
                <div>
                    <label className="block small-text font-semibold text-slate-600 mb-1">
                        Email Address
                    </label>
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-500" aria-hidden="true" />
                        <a
                            href={`mailto:${application.email}`}
                            className="normal-text text-primary hover:text-primary-100"
                        >
                            {application.email}
                        </a>
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block small-text font-semibold text-slate-600 mb-1">
                        Phone Number
                    </label>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500" aria-hidden="true" />
                        <a
                            href={`tel:${application.phone}`}
                            className="normal-text text-primary hover:text-primary-100"
                        >
                            {application.phone}
                        </a>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block small-text font-semibold text-slate-600 mb-1">
                        Location
                    </label>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" aria-hidden="true" />
                        <p className="normal-text text-slate-900">{application.location}</p>
                    </div>
                </div>

                {/* Current Position (if provided) */}
                {application.current_position && (
                    <div>
                        <label className="block small-text font-semibold text-slate-600 mb-1">
                            Current Position
                        </label>
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-slate-500" aria-hidden="true" />
                            <p className="normal-text text-slate-900">
                                {application.current_position}
                            </p>
                        </div>
                    </div>
                )}

                {/* Current Company (if provided) */}
                {application.current_company && (
                    <div>
                        <label className="block small-text font-semibold text-slate-600 mb-1">
                            Current Company
                        </label>
                        <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-slate-500" aria-hidden="true" />
                            <p className="normal-text text-slate-900">
                                {application.current_company}
                            </p>
                        </div>
                    </div>
                )}

                {/* Years of Experience (if provided) */}
                {application.years_of_experience !== null && (
                    <div>
                        <label className="block small-text font-semibold text-slate-600 mb-1">
                            Years of Experience
                        </label>
                        <p className="normal-text text-slate-900">
                            {application.years_of_experience} years
                        </p>
                    </div>
                )}

                {/* Expected Salary (if provided) */}
                {application.expected_salary && (
                    <div>
                        <label className="block small-text font-semibold text-slate-600 mb-1">
                            Expected Salary
                        </label>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-slate-500" aria-hidden="true" />
                            <p className="normal-text text-slate-900">
                                GHS {parseFloat(application.expected_salary).toLocaleString()}
                                /month
                            </p>
                        </div>
                    </div>
                )}

                {/* Availability (if provided) */}
                {application.availability && (
                    <div>
                        <label className="block small-text font-semibold text-slate-600 mb-1">
                            Availability
                        </label>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />
                            <p className="normal-text text-slate-900">
                                {application.availability}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* References (if provided) */}
            {application.references && (
                <div className="mt-6 pt-6 border-t-2 border-slate-100">
                    <label className="block small-text font-semibold text-slate-600 mb-2">
                        References
                    </label>
                    <p className="normal-text text-slate-900 whitespace-pre-line">
                        {application.references}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ApplicationPersonalInfo;