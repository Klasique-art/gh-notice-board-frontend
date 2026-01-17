import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    OpportunityDetailHero,
    OpportunityDetailMeta,
    OpportunityDetailDescription,
    OpportunityDetailRequirements,
    OpportunityDetailApplication,
    OpportunityDetailOrganization,
    OpportunityDetailShare,
    OpportunityDetailRelated,
    OpportunityDetailComments,
} from "@/components";
import { mockOpportunities } from "@/data/mockOpportunities";

// Type definition for params
type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all opportunities
export async function generateStaticParams() {
    // In production, fetch all opportunity slugs from API
    return mockOpportunities.map((opportunity) => ({
        slug: opportunity.slug,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Await params (Next.js 15+)
    const { slug } = await params;

    // In production, fetch opportunity from API
    const opportunity = mockOpportunities.find((o) => o.slug === slug);

    if (!opportunity) {
        return {
            title: "Opportunity Not Found | Ghana Notice Board",
        };
    }

    const deadline = opportunity.deadline
        ? new Date(opportunity.deadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

    return {
        title: `${opportunity.title} | Ghana Notice Board`,
        description: opportunity.summary,
        keywords: [
            opportunity.opportunity_type_display,
            opportunity.organization_name,
            opportunity.city,
            opportunity.country,
            "Ghana opportunities",
            ...opportunity.tags.map((tag) => tag.name),
        ],
        openGraph: {
            title: opportunity.title,
            description: `${opportunity.summary} | ${opportunity.organization_name}${deadline ? ` | Deadline: ${deadline}` : ""}`,
            type: "website",
            images: opportunity.featured_image
                ? [
                      {
                          url: opportunity.featured_image,
                          width: 1200,
                          height: 630,
                          alt: opportunity.title,
                      },
                  ]
                : [],
            locale: "en_GH",
        },
        twitter: {
            card: "summary_large_image",
            title: opportunity.title,
            description: `${opportunity.summary} | ${opportunity.organization_name}`,
            images: opportunity.featured_image ? [opportunity.featured_image] : [],
        },
    };
}

// Server Component - Fetches data and assembles page
const OpportunityDetailPage = async ({ params }: Props) => {
    // Await params (Next.js 15+)
    const { slug } = await params;

    // In production, this would be an API call:
    // const opportunity = await getOpportunityBySlug(slug);
    const opportunity = mockOpportunities.find((o) => o.slug === slug);

    // Handle 404
    if (!opportunity) {
        notFound();
    }

    // Get related opportunities (same type or category, exclude current)
    const relatedOpportunities = mockOpportunities
        .filter(
            (o) =>
                (o.opportunity_type === opportunity.opportunity_type ||
                    o.category?.slug === opportunity.category?.slug) &&
                o.id !== opportunity.id
        )
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section with Featured Image */}
            <OpportunityDetailHero opportunity={opportunity} />

            <div className="inner-wrapper py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Opportunity Metadata */}
                        <OpportunityDetailMeta opportunity={opportunity} />

                        {/* Application Section */}
                        <OpportunityDetailApplication opportunity={opportunity} />

                        {/* Description */}
                        <OpportunityDetailDescription opportunity={opportunity} />

                        {/* Requirements */}
                        <OpportunityDetailRequirements opportunity={opportunity} />

                        {/* Share Section */}
                        <OpportunityDetailShare opportunity={opportunity} />

                        {/* Comments Section */}
                        <OpportunityDetailComments opportunityId={opportunity.id} />
                    </div>

                    {/* Sidebar Column */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Organization Card */}
                        <OpportunityDetailOrganization opportunity={opportunity} />

                        {/* Related Opportunities */}
                        {relatedOpportunities.length > 0 && (
                            <OpportunityDetailRelated
                                opportunities={relatedOpportunities}
                            />
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default OpportunityDetailPage;