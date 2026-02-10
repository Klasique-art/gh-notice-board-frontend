import { Landing, BreakingNewsSection, FeaturedOpportunitiesSection, UpcomingEventsSection, CategoriesSection, CTASection } from "@/components";
import { getFeaturedOpportunities } from "@/app/lib/opportunities";
import { getBreakingNews } from "@/app/lib/news";
import { getUpcomingEvents } from "@/app/lib/events";

const HomePage = async () => {
    const [breakingNewsResponse, featuredResponse, upcomingEventsResponse] = await Promise.all([
        getBreakingNews(3),
        getFeaturedOpportunities(6),
        getUpcomingEvents(4),
    ]);

    const breakingNews = breakingNewsResponse.results || [];
    const featuredOpportunities = featuredResponse.results || [];
    const upcomingEvents = upcomingEventsResponse.results || [];

    return (
        <main>
            <Landing />
            <BreakingNewsSection articles={breakingNews} />
            <FeaturedOpportunitiesSection opportunities={featuredOpportunities} />
            <UpcomingEventsSection events={upcomingEvents} />
            <CategoriesSection />
            <CTASection />
        </main>
    );
};

export default HomePage;
