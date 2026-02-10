import { Briefcase } from "lucide-react";

interface ApplicationsHeaderProps {
    totalCount: number;
}

const ApplicationsHeader = ({ totalCount }: ApplicationsHeaderProps) => {
    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="big-text-2 font-bold text-slate-900">
                        My Applications
                    </h1>
                    <p className="normal-text text-slate-600">
                        {totalCount === 0
                            ? "You haven't applied to any opportunities yet"
                            : totalCount === 1
                                ? "1 application"
                                : `${totalCount} applications`}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ApplicationsHeader;
