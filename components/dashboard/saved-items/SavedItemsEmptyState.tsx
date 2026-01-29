import { Bookmark, Calendar, Newspaper, Briefcase, TrendingUp } from "lucide-react";
import { AppButton } from "@/components";

const SavedItemsEmptyState = () => {
    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto space-y-6">
                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                    <Bookmark className="w-10 h-10 text-primary" aria-hidden="true" />
                </div>

                {/* Message */}
                <div>
                    <h3 className="big-text-3 font-bold text-slate-900 mb-2">
                        No Saved Items Yet
                    </h3>
                    <p className="normal-text text-slate-600">
                        Start saving events, news, job opportunities, and more to access them
                        quickly later!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <AppButton
                        variant="primary"
                        url="/events"
                        title="Browse Events"
                        icon={<Calendar className="w-4 h-4" aria-hidden="true" />}
                        className="w-full sm:w-auto"
                    />

                    <AppButton
                        variant="secondary"
                        url="/opportunities"
                        title="Find Jobs"
                        icon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
                        className="w-full sm:w-auto"
                    />
                </div>

                {/* How it Works */}
                <div className="pt-6 border-t-2 border-slate-100">
                    <p className="small-text text-slate-600 mb-4 font-semibold">
                        How to save items
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
                            </div>
                            <p className="small-text text-slate-600">
                                <span className="font-semibold">Step 1:</span> Browse content
                            </p>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Bookmark className="w-5 h-5 text-secondary" aria-hidden="true" />
                            </div>
                            <p className="small-text text-slate-600">
                                <span className="font-semibold">Step 2:</span> Click bookmark icon
                            </p>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Bookmark className="w-5 h-5 text-primary" aria-hidden="true" />
                            </div>
                            <p className="small-text text-slate-600">
                                <span className="font-semibold">Step 3:</span> Access here anytime
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="pt-4">
                    <p className="small-text text-slate-600 mb-3">Popular sections</p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <AppButton
                            variant="ghost"
                            url="/news"
                            title="News"
                            icon={<Newspaper className="w-4 h-4" aria-hidden="true" />}
                            size="sm"
                        />
                        <AppButton
                            variant="ghost"
                            url="/events"
                            title="Events"
                            icon={<Calendar className="w-4 h-4" aria-hidden="true" />}
                            size="sm"
                        />
                        <AppButton
                            variant="ghost"
                            url="/opportunities"
                            title="Opportunities"
                            icon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
                            size="sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedItemsEmptyState;