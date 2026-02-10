"use client";

import { TimeSeriesDataPoint } from "@/types/analytics.types";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

interface AnalyticsTimeSeriesChartProps {
    data: TimeSeriesDataPoint[];
}

const AnalyticsTimeSeriesChart = ({
    data,
}: AnalyticsTimeSeriesChartProps) => {
    const [activeMetric, setActiveMetric] = useState<
        "views" | "likes" | "shares" | "comments"
    >("views");

    const metrics = [
        { key: "views" as const, label: "Views", color: "#006B3F" },
        { key: "likes" as const, label: "Likes", color: "#CE1126" },
        { key: "shares" as const, label: "Shares", color: "#FCD116" },
        { key: "comments" as const, label: "Comments", color: "#8B5CF6" },
    ];

    // Calculate max value for scaling
    const maxValue = Math.max(...data.map((d) => d[activeMetric]));
    const safeMaxValue = maxValue > 0 ? maxValue : 1;
    const chartHeight = 200;
    const chartWidth = 600;
    const padding = 40;

    // Generate SVG path
    const generatePath = () => {
        if (data.length === 0) return "";

        const points = data.map((point, index) => {
            const x = (index / (data.length - 1)) * (chartWidth - padding * 2) + padding;
            const y =
                chartHeight -
                padding -
                (point[activeMetric] / safeMaxValue) * (chartHeight - padding * 2);
            return `${x},${y}`;
        });

        return `M ${points.join(" L ")}`;
    };

    // Generate area path (for gradient fill)
    const generateAreaPath = () => {
        if (data.length === 0) return "";

        const path = generatePath();
        const lastPoint = data.length - 1;
        const lastX = (lastPoint / (data.length - 1)) * (chartWidth - padding * 2) + padding;
        const firstX = padding;

        return `${path} L ${lastX},${chartHeight - padding} L ${firstX},${chartHeight - padding
            } Z`;
    };

    const currentMetric = metrics.find((m) => m.key === activeMetric)!;

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
                    <h3 className="big-text-4 font-bold text-slate-900">
                        Engagement Trends
                    </h3>
                </div>
            </div>

            {/* Metric Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
                {metrics.map((metric) => (
                    <button
                        key={metric.key}
                        onClick={() => setActiveMetric(metric.key)}
                        className={`px-4 py-2 rounded-lg font-medium normal-text-2 transition-all ${activeMetric === metric.key
                                ? "bg-primary text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                    >
                        {metric.label}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div className="relative w-full overflow-x-auto">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-auto"
                    style={{ minWidth: "600px" }}
                >
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => {
                        const y = padding + ((chartHeight - padding * 2) / 4) * i;
                        return (
                            <g key={i}>
                                <line
                                    x1={padding}
                                    y1={y}
                                    x2={chartWidth - padding}
                                    y2={y}
                                    stroke="#E2E8F0"
                                    strokeWidth="1"
                                />
                                <text
                                    x={padding - 10}
                                    y={y + 5}
                                    textAnchor="end"
                                    fontSize="12"
                                    fill="#64748B"
                                >
                                    {Math.round((safeMaxValue * (4 - i)) / 4)}
                                </text>
                            </g>
                        );
                    })}

                    {/* Area gradient */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={currentMetric.color} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={currentMetric.color} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area */}
                    <path
                        d={generateAreaPath()}
                        fill="url(#areaGradient)"
                    />

                    {/* Line */}
                    <path
                        d={generatePath()}
                        fill="none"
                        stroke={currentMetric.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {data.map((point, index) => {
                        const x =
                            (index / (data.length - 1)) * (chartWidth - padding * 2) + padding;
                        const y =
                            chartHeight -
                            padding -
                            (point[activeMetric] / safeMaxValue) * (chartHeight - padding * 2);

                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="white"
                                stroke={currentMetric.color}
                                strokeWidth="2"
                            />
                        );
                    })}
                </svg>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t-2 border-slate-100">
                <div>
                    <p className="small-text text-slate-600 mb-1">Total</p>
                    <p className="normal-text font-bold text-slate-900">
                        {data.reduce((sum, d) => sum + d[activeMetric], 0).toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="small-text text-slate-600 mb-1">Average</p>
                    <p className="normal-text font-bold text-slate-900">
                        {Math.round(
                            data.reduce((sum, d) => sum + d[activeMetric], 0) / data.length
                        ).toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="small-text text-slate-600 mb-1">Peak</p>
                    <p className="normal-text font-bold text-slate-900">
                        {maxValue.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTimeSeriesChart;
