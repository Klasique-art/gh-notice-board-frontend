import { Application } from "@/types/applications.types";
import { ApplicationCard } from "@/components";

interface ApplicationsGridProps {
    applications: Application[];
}

const ApplicationsGrid = ({ applications }: ApplicationsGridProps) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {applications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
            ))}
        </div>
    );
};

export default ApplicationsGrid;