import { Metadata } from "next";
import { OpportunityHero, OpportunityPageContent } from "@/components";
import { mockOpportunities } from "@/data/mockOpportunities";

// SEO Metadata
export const metadata: Metadata = {
  title: "Opportunities | Ghana Notice Board",
  description:
    "Discover jobs, scholarships, grants, internships, fellowships, and more opportunities in Ghana and for the diaspora. Connect with employers, universities, and organizations offering career and educational opportunities.",
  keywords: [
    "Ghana jobs",
    "Ghana scholarships",
    "Ghana grants",
    "Ghana internships",
    "Ghana fellowships",
    "remote jobs Ghana",
    "diaspora opportunities",
    "study in Ghana",
    "work in Ghana",
    "startup funding Ghana",
    "volunteer opportunities Ghana",
  ],
  openGraph: {
    title: "Opportunities | Ghana Notice Board",
    description:
      "Find jobs, scholarships, grants, and more opportunities in Ghana",
    type: "website",
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opportunities | Ghana Notice Board",
    description:
      "Find jobs, scholarships, grants, and more opportunities in Ghana",
  },
};

// Server Component - Fetches data and prepares props
const OpportunitiesPage = async () => {
  // In production, this would be an API call:
  // const opportunities = await getOpportunities();
  const opportunities = mockOpportunities;

  // Extract unique categories (if opportunities have categories)
  const categoriesSet = new Set<string>();
  const categoriesMap = new Map<
    string,
    { slug: string; name: string; color: string }
  >();

  opportunities.forEach((opp) => {
    if (opp.category) {
      if (!categoriesSet.has(opp.category.slug)) {
        categoriesSet.add(opp.category.slug);
        categoriesMap.set(opp.category.slug, {
          slug: opp.category.slug,
          name: opp.category.name,
          color: opp.category.color,
        });
      }
    }
  });

  const uniqueCategories = Array.from(categoriesMap.values());

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section - Server Component */}
      <OpportunityHero />

      {/* Interactive Content - Client Component */}
      <OpportunityPageContent
        initialOpportunities={opportunities}
        availableCategories={uniqueCategories}
      />
    </main>
  );
};

export default OpportunitiesPage;