import {
    Briefcase,
    GraduationCap,
    DollarSign,
    Users,
    TrendingUp,
    Award,
    Rocket,
    Heart,
    Lightbulb,
    Target,
} from "lucide-react";
import React from 'react';

// Configuration for different opportunity types
export const typeConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
    job: {
        icon: <Briefcase className="w-4 h-4" />,
        color: "#3B82F6",
        bg: "bg-blue-500",
        label: "Job",
    },
    scholarship: {
        icon: <GraduationCap className="w-4 h-4" />,
        color: "#10B981",
        bg: "bg-green-500",
        label: "Scholarship",
    },
    grant: {
        icon: <DollarSign className="w-4 h-4" />,
        color: "#8B5CF6",
        bg: "bg-purple-500",
        label: "Grant",
    },
    internship: {
        icon: <Users className="w-4 h-4" />,
        color: "#F59E0B",
        bg: "bg-amber-500",
        label: "Internship",
    },
    fellowship: {
        icon: <Award className="w-4 h-4" />,
        color: "#EC4899",
        bg: "bg-pink-500",
        label: "Fellowship",
    },
    volunteer: {
        icon: <Heart className="w-4 h-4" />,
        color: "#EF4444",
        bg: "bg-red-500",
        label: "Volunteer",
    },
    business: {
        icon: <Rocket className="w-4 h-4" />,
        color: "#6366F1",
        bg: "bg-indigo-500",
        label: "Business",
    },
    funding: {
        icon: <TrendingUp className="w-4 h-4" />,
        color: "#14B8A6",
        bg: "bg-teal-500",
        label: "Funding",
    },
    mentorship: {
        icon: <Lightbulb className="w-4 h-4" />,
        color: "#F97316",
        bg: "bg-orange-500",
        label: "Mentorship",
    },
    training: {
        icon: <Target className="w-4 h-4" />,
        color: "#06B6D4",
        bg: "bg-cyan-500",
        label: "Training",
    },
};
