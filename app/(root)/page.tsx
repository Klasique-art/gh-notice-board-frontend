import { Landing, BreakingNewsSection, FeaturedOpportunitiesSection, UpcomingEventsSection, CategoriesSection, CTASection } from "@/components"
import { mockNews } from "@/data/mockNews"
import { mockEvents } from "@/data/mockEvents"
import { getFeaturedOpportunities } from "@/app/lib/opportunities"

const HomePage = async () => {
    const breakingNews = mockNews;

    // Fetch featured opportunities
    const featuredResponse = await getFeaturedOpportunities(6);
    const featuredOpportunities = featuredResponse.results;

    const upcomingEvents = mockEvents;

    return (
        <main>
            <Landing />
            <BreakingNewsSection articles={breakingNews} />
            <FeaturedOpportunitiesSection opportunities={featuredOpportunities} />
            <UpcomingEventsSection events={upcomingEvents} />
            <CategoriesSection />
            <CTASection />
        </main>
    )
}

export default HomePage 