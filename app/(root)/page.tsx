import { Landing, BreakingNewsSection, FeaturedOpportunitiesSection, UpcomingEventsSection, CategoriesSection, CTASection } from "@/components"
import { mockNews } from "@/data/mockNews"
import { mockOpportunities } from "@/data/mockOpportunities"
import { mockEvents } from "@/data/mockEvents"

const HomePage = async () => {
    const breakingNews = mockNews;
    const featuredOpportunities = mockOpportunities;
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