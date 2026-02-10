import { Metadata } from "next";
import { OpportunityHero, OpportunityPageContent } from "@/components";

import { getOpportunities } from "@/app/lib/opportunities";
import { OpportunityType } from "@/types/opportunities.types";

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

type Props = {
  searchParams: Promise<{
    search?: string;
    opportunity_type?: string;
    type?: string;
    category__slug?: string;
    category?: string;
    is_remote?: string;
    is_diaspora?: string;
    is_featured?: string;
    ordering?: string;
    page?: string;
  }>;
};

function parseCsvParam(value?: string): string[] | undefined {
  if (!value) return undefined;
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

function parseBooleanParam(value?: string): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

// Server Component - Fetches data and prepares props
const OpportunitiesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const page = Number.parseInt(params.page || "1", 10);
  let opportunitiesData;

  try {
    // Fetch published opportunities
    opportunitiesData = await getOpportunities({
      search: params.search || undefined,
      opportunity_type: parseCsvParam(params.opportunity_type || params.type) as OpportunityType[] | undefined,
      category__slug: parseCsvParam(params.category__slug || params.category),
      is_remote: parseBooleanParam(params.is_remote),
      is_diaspora: parseBooleanParam(params.is_diaspora),
      is_featured: parseBooleanParam(params.is_featured),
      ordering: params.ordering || "-published_at",
      status: "published",
      page: Number.isNaN(page) ? 1 : page,
    });
  } catch (error) {
    console.error("Failed to load opportunities page:", error);
    opportunitiesData = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }

  const opportunities = opportunitiesData.results || [];

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
        initialNext={opportunitiesData.next}
        initialCount={opportunitiesData.count}
      />
    </main>
  );
};

export default OpportunitiesPage;
