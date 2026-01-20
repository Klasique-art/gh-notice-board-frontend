"use client";

import { ContentPerformance } from "@/types/analytics.types";
import { BarChart3 } from "lucide-react";

interface ContentPerformanceChartProps {
    data: ContentPerformance[];
}

const ContentPerformanceChart = ({
    data,
}: ContentPerformanceChartProps) => {
    // Calculate total views for percentage
    const totalViews = data.reduce((sum, item) => sum + item.total_views, 0);

    // Colors for different content types
    const colors = [
        "#006B3F", // Primary green
        "#CE1126", // Accent red
        "#FCD116", // Secondary gold
        "#8B5CF6", // Purple
    ];

    // Calculate donut chart segments
    const centerX = 100;
    const centerY = 100;
    const radius = 70;
    const innerRadius = 45;

    let currentAngle = -90; // Start from top

    const segments = data.map((item, index) => {
        const percentage = (item.total_views / totalViews) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        currentAngle = endAngle;

        // Calculate path for donut segment
        const startRadians = (startAngle * Math.PI) / 180;
        const endRadians = (endAngle * Math.PI) / 180;

        const outerStartX = centerX + radius * Math.cos(startRadians);
        const outerStartY = centerY + radius * Math.sin(startRadians);
        const outerEndX = centerX + radius * Math.cos(endRadians);
        const outerEndY = centerY + radius * Math.sin(endRadians);

        const innerStartX = centerX + innerRadius * Math.cos(endRadians);
        const innerStartY = centerY + innerRadius * Math.sin(endRadians);
        const innerEndX = centerX + innerRadius * Math.cos(startRadians);
        const innerEndY = centerY + innerRadius * Math.sin(startRadians);

        const largeArc = angle > 180 ? 1 : 0;

        const path = `
      M ${outerStartX} ${outerStartY}
      A ${radius} ${radius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}
      L ${innerStartX} ${innerStartY}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEndX} ${innerEndY}
      Z
    `;

        return {
            ...item,
            path,
            color: colors[index % colors.length],
            percentage,
        };
    });

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 className="big-text-4 font-bold text-slate-900">
                    Content Performance
                </h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Donut Chart */}
                <div className="shrink-0">
                    <svg viewBox="0 0 200 200" className="w-48 h-48">
                        {segments.map((segment, index) => (
                            <g key={index}>
                                <path
                                    d={segment.path}
                                    fill={segment.color}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            </g>
                        ))}
                        {/* Center text */}
                        <text
                            x={centerX}
                            y={centerY - 10}
                            textAnchor="middle"
                            className="text-2xl font-bold fill-slate-900"
                        >
                            {totalViews.toLocaleString()}
                        </text>
                        <text
                            x={centerX}
                            y={centerY + 10}
                            textAnchor="middle"
                            className="text-xs fill-slate-600"
                        >
                            Total Views
                        </text>
                    </svg>
                </div>

                {/* Legend & Stats */}
                <div className="flex-1 w-full space-y-3">
                    {segments.map((segment, index) => (
                        <div key={index} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div
                                    className="w-4 h-4 rounded-sm shrink-0"
                                    style={{ backgroundColor: segment.color }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="normal-text font-semibold text-slate-900 truncate">
                                        {segment.content_type_display}
                                    </p>
                                    <p className="small-text text-slate-600">
                                        {segment.total_items} items
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="normal-text font-bold text-slate-900">
                                    {segment.percentage.toFixed(1)}%
                                </p>
                                <p className="small-text text-slate-600">
                                    {segment.total_views.toLocaleString()} views
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Engagement Rate */}
            <div className="mt-6 pt-4 border-t-2 border-slate-100">
                <p className="small-text text-slate-600 mb-3">Average Engagement Rate</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg"
                            style={{ backgroundColor: `${colors[index % colors.length]}15` }}
                        >
                            <p
                                className="big-text-5 font-bold mb-1"
                                style={{ color: colors[index % colors.length] }}
                            >
                                {item.avg_engagement.toFixed(1)}%
                            </p>
                            <p className="small-text-2 text-slate-700 truncate">
                                {item.content_type_display}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentPerformanceChart;