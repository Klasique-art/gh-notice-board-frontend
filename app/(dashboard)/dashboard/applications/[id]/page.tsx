import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicationDetailsContent } from "@/components";
import { getMyApplicationById } from "@/app/lib/applications";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Application #${id} | Ghana Notice Board`,
    description: "View your application details, status, and feedback.",
  };
}

const ApplicationDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const parsedId = Number.parseInt(id, 10);
  const application = Number.isNaN(parsedId)
    ? null
    : await getMyApplicationById(parsedId);

  if (!application) {
    return (
      <main className="dash-page">
        <div className="text-center py-12">
          <h1 className="big-text-2 font-bold text-slate-900 mb-3">
            Application Not Found
          </h1>
          <p className="normal-text text-slate-600 mb-6">
            This application doesn&apos;t exist or you don&apos;t have access to
            it.
          </p>
          <Link
            href="/dashboard/applications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold normal-text hover:bg-primary-100 transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to My Applications
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dash-page">
      <div className="space-y-6">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-100 transition-colors normal-text font-medium"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to My Applications
        </Link>

        <ApplicationDetailsContent application={application} />
      </div>
    </main>
  );
};

export default ApplicationDetailsPage;
