// import { Landing, HomeCategoryBar, SoonEvents, HomeEvents, StatsSection } from "@/components"
import { Landing } from "@/components"
// import { getEventCategories, getPublicStats } from "../lib/general"
// import { getEvents } from "../lib/events";

const HomePage = async () => {
    // const [categories, events, statsData] = await Promise.all([
    //     getEventCategories(),
    //     getEvents({ status: 'upcoming', ordering: 'start_date', page: 1 }),
    //     getPublicStats()
    // ]);

    return (
        <main>
            <Landing />
            {/* <StatsSection stats={statsData?.data || null} /> */}
            {/* <HomeCategoryBar eventCategories={categories} /> */}
            {/* <SoonEvents events={events.results} /> */}
            {/* <HomeEvents events={events.results} /> */}
        </main>
    )
}

export default HomePage 