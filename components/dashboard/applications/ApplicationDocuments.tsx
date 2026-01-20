import { Application } from "@/types/applications.types";
import { FileText, Download, Link2, Linkedin, Github, Eye } from "lucide-react";

interface ApplicationDocumentsProps {
    application: Application;
}

const ApplicationDocuments = ({ application }: ApplicationDocumentsProps) => {
    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-slate-900">
                    Documents & Links
                </h3>
            </div>

            <div className="space-y-6">
                {/* CV/Resume */}
                {application.cv_file ? (
                    <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                    <FileText
                                        className="w-5 h-5 text-accent"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div>
                                    <h4 className="normal-text font-semibold text-slate-900 mb-1">
                                        CV / Resume
                                    </h4>
                                    <p className="small-text text-slate-600">
                                        {application.cv_file.split("/").pop()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={application.cv_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white hover:bg-slate-100 border-2 border-slate-200 rounded-lg transition-colors"
                                    aria-label="View CV"
                                >
                                    <Eye className="w-4 h-4 text-slate-700" aria-hidden="true" />
                                </a>
                                <a
                                    href={application.cv_file}
                                    download
                                    className="p-2 bg-primary hover:bg-primary-100 text-white rounded-lg transition-colors"
                                    aria-label="Download CV"
                                >
                                    <Download className="w-4 h-4" aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 text-center">
                        <p className="small-text text-slate-500">No CV uploaded</p>
                    </div>
                )}

                {/* Cover Letter */}
                <div>
                    <label className="block small-text font-semibold text-slate-600 mb-2">
                        Cover Letter
                    </label>
                    {application.cover_letter ? (
                        <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                            <p className="normal-text text-slate-900 whitespace-pre-line">
                                {application.cover_letter}
                            </p>
                        </div>
                    ) : (
                        <div className="p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                            <p className="small-text text-slate-500 text-center">
                                No cover letter provided
                            </p>
                        </div>
                    )}
                </div>

                {/* Portfolio URL */}
                {application.portfolio_url && (
                    <div>
                        <label className="block small-text font-semibold text-slate-600 mb-2">
                            Portfolio
                        </label>
                        <a
                            href={application.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:bg-blue-100 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Link2
                                    className="w-5 h-5 text-blue-600"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="normal-text font-semibold text-blue-900">
                                    View Portfolio
                                </p>
                                <p className="small-text text-blue-700 truncate">
                                    {application.portfolio_url}
                                </p>
                            </div>
                            <Eye
                                className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                )}

                {/* LinkedIn URL */}
                {application.linkedin_url && (
                    <div>
                        <label className="block small-text font-semibold text-slate-600 mb-2">
                            LinkedIn Profile
                        </label>
                        <a
                            href={application.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 hover:bg-blue-100 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Linkedin
                                    className="w-5 h-5 text-blue-600"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="normal-text font-semibold text-blue-900">
                                    View LinkedIn
                                </p>
                                <p className="small-text text-blue-700 truncate">
                                    {application.linkedin_url}
                                </p>
                            </div>
                            <Eye
                                className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationDocuments;