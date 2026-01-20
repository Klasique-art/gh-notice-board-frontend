"use client";

import { AnalyticsData } from "@/types/analytics.types";
import {
    AnalyticsHeader,
    AnalyticsOverviewCards,
    AnalyticsTimeSeriesChart,
    ContentPerformanceChart,
    TopContentList,
    ApplicationStatsCard,
    RecentActivityFeed,
    GrowthMetricsCards,
} from "@/components";

interface AnalyticsContentProps {
    analytics: AnalyticsData;
}

const AnalyticsContent = ({ analytics }: AnalyticsContentProps) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <AnalyticsHeader period={analytics.period} />

            {/* Growth Metrics */}
            <GrowthMetricsCards metrics={analytics.growth_metrics} />

            {/* Overview Stats */}
            <AnalyticsOverviewCards overview={analytics.overview} />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsTimeSeriesChart data={analytics.time_series} />
                <ContentPerformanceChart data={analytics.content_performance} />
            </div>

            {/* Content & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Top Content (2/3 width on lg) */}
                <div className="lg:col-span-2">
                    <TopContentList content={analytics.top_content} />
                </div>

                {/* Right - Application Stats (1/3 width on lg) */}
                <div className="lg:col-span-1">
                    <ApplicationStatsCard analytics={analytics.application_analytics} />
                </div>
            </div>

            {/* Recent Activity */}
            <RecentActivityFeed activities={analytics.recent_activity} />
        </div>
    );
};

export default AnalyticsContent;