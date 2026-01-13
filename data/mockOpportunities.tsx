import { Opportunity, User, Tag } from "@/types/opportunities.types";
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

// Mock User (from UserMinimalSerializer)
const mockUser: User = {
    id: 1,
    username: "admin",
    full_name: "Admin User",
    display_name: "Admin ✓",
    avatar: "https://i.pravatar.cc/300?img=12",
    is_verified: true,
    verification_badge: "✓",
};

// Mock Categories (from CategorySerializer)
const mockCategories = {
    technology: {
        id: 1,
        name: "Technology",
        slug: "technology",
        description: "Tech jobs and opportunities",
        icon: "Laptop",
        color: "#3B82F6",
        order: 1,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
    },
    education: {
        id: 2,
        name: "Education",
        slug: "education",
        description: "Education opportunities",
        icon: "GraduationCap",
        color: "#10B981",
        order: 2,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
    },
    business: {
        id: 3,
        name: "Business",
        slug: "business",
        description: "Business opportunities",
        icon: "Briefcase",
        color: "#F59E0B",
        order: 3,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
    },
    health: {
        id: 4,
        name: "Health",
        slug: "health",
        description: "Healthcare opportunities",
        icon: "Heart",
        color: "#EF4444",
        order: 4,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
    },
};

// Mock Tags (from TagSerializer)
const mockTags: Tag[] = [
    {
        id: 1,
        name: "Software Development",
        slug: "software-development",
        description: "Software development opportunities",
        category: 1,
        category_name: "Technology",
        usage_count: 45,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        is_subscribed: false,
    },
    {
        id: 2,
        name: "Fintech",
        slug: "fintech",
        description: "Financial technology",
        category: 1,
        category_name: "Technology",
        usage_count: 32,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        is_subscribed: false,
    },
];

/* ===========================
   MOCK OPPORTUNITIES
   Exact structure from OpportunityListSerializer
=========================== */

export const mockOpportunities: Opportunity[] = [
    {
        // Core fields
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Senior Software Engineer - Full Stack",
        slug: "senior-software-engineer-accra",
        summary: "Join a leading fintech company building innovative mobile money solutions",
        featured_image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800",

        // Type and categorization
        opportunity_type: "job",
        opportunity_type_display: "Job",
        category: mockCategories.technology,
        tags: mockTags,
        posted_by: mockUser,

        // Organization details
        organization_name: "Ghana Fintech Solutions",
        organization_logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400",
        organization_verified: true,

        // Location details
        location: "Accra, Greater Accra Region",
        city: "Accra",
        region: "Greater Accra",
        country: "Ghana",
        is_remote: false,
        is_diaspora: false,

        // Job-specific fields
        employment_type: "full-time",
        employment_type_display: "Full-time",
        experience_level: "senior",
        experience_level_display: "Senior Level",
        salary_range: "GHS 8,000 - 15,000",
        show_salary: true,

        // Scholarship/Grant-specific fields
        funding_amount: null,
        funding_currency: "GHS",
        duration: "",

        // Deadline
        deadline: "2025-02-28T23:59:59Z",
        days_until_deadline: 46,

        // Status and visibility
        is_featured: true,
        is_trending: true,
        is_urgent: false,
        is_active: true,

        // Engagement tracking
        views_count: 2340,
        applications_count: 45,
        likes_count: 89,
        shares_count: 23,

        // User-specific engagement
        user_applied: false,
        user_saved: false,
        user_liked: false,

        // Status and timestamps
        status: "published",
        created_at: "2025-01-08T10:00:00Z",
        published_at: "2025-01-08T10:00:00Z",
    },
    {
        // Core fields
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "Mastercard Foundation Scholars Program 2025",
        slug: "mastercard-scholars-program-2025",
        summary: "Full scholarship for undergraduate studies at top African universities",
        featured_image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",

        // Type and categorization
        opportunity_type: "scholarship",
        opportunity_type_display: "Scholarship",
        category: mockCategories.education,
        tags: [
            {
                id: 3,
                name: "Undergraduate",
                slug: "undergraduate",
                description: "Undergraduate programs",
                category: 2,
                category_name: "Education",
                usage_count: 67,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        posted_by: mockUser,

        // Organization details
        organization_name: "Mastercard Foundation",
        organization_logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
        organization_verified: true,

        // Location details
        location: "Multiple Countries",
        city: "Various",
        region: "Various",
        country: "Ghana",
        is_remote: false,
        is_diaspora: true,

        // Job-specific fields
        employment_type: "",
        employment_type_display: "",
        experience_level: "",
        experience_level_display: "",
        salary_range: "",
        show_salary: false,

        // Scholarship/Grant-specific fields
        funding_amount: "Full Scholarship",
        funding_currency: "USD",
        duration: "4 years",

        // Deadline
        deadline: "2025-03-15T23:59:59Z",
        days_until_deadline: 61,

        // Status and visibility
        is_featured: true,
        is_trending: true,
        is_urgent: false,
        is_active: true,

        // Engagement tracking
        views_count: 8920,
        applications_count: 234,
        likes_count: 456,
        shares_count: 123,

        // User-specific engagement
        user_applied: false,
        user_saved: false,
        user_liked: false,

        // Status and timestamps
        status: "published",
        created_at: "2025-01-05T10:00:00Z",
        published_at: "2025-01-05T10:00:00Z",
    },
    {
        // Core fields
        id: "550e8400-e29b-41d4-a716-446655440003",
        title: "Marketing Manager - Consumer Goods",
        slug: "marketing-manager-kumasi",
        summary: "Lead marketing strategy for a growing FMCG company in Kumasi",
        featured_image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",

        // Type and categorization
        opportunity_type: "job",
        opportunity_type_display: "Job",
        category: mockCategories.business,
        tags: [
            {
                id: 4,
                name: "Marketing",
                slug: "marketing",
                description: "Marketing positions",
                category: 3,
                category_name: "Business",
                usage_count: 54,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        posted_by: mockUser,

        // Organization details
        organization_name: "Ghana Consumer Products Ltd",
        organization_logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
        organization_verified: false,

        // Location details
        location: "Kumasi, Ashanti Region",
        city: "Kumasi",
        region: "Ashanti",
        country: "Ghana",
        is_remote: false,
        is_diaspora: false,

        // Job-specific fields
        employment_type: "full-time",
        employment_type_display: "Full-time",
        experience_level: "mid",
        experience_level_display: "Mid Level",
        salary_range: "GHS 6,000 - 10,000",
        show_salary: true,

        // Scholarship/Grant-specific fields
        funding_amount: null,
        funding_currency: "GHS",
        duration: "",

        // Deadline
        deadline: "2025-02-15T23:59:59Z",
        days_until_deadline: 33,

        // Status and visibility
        is_featured: false,
        is_trending: false,
        is_urgent: false,
        is_active: true,

        // Engagement tracking
        views_count: 1890,
        applications_count: 67,
        likes_count: 34,
        shares_count: 12,

        // User-specific engagement
        user_applied: false,
        user_saved: false,
        user_liked: false,

        // Status and timestamps
        status: "published",
        created_at: "2025-01-09T10:00:00Z",
        published_at: "2025-01-09T10:00:00Z",
    },
    {
        // Core fields
        id: "550e8400-e29b-41d4-a716-446655440004",
        title: "Tech Startup Grant - $25,000 Funding",
        slug: "tech-startup-grant-2025",
        summary: "Non-equity grant for early-stage tech startups in Ghana",
        featured_image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",

        // Type and categorization
        opportunity_type: "grant",
        opportunity_type_display: "Grant",
        category: mockCategories.technology,
        tags: mockTags,
        posted_by: mockUser,

        // Organization details
        organization_name: "Ghana Innovation Hub",
        organization_logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
        organization_verified: true,

        // Location details
        location: "Accra, Greater Accra Region",
        city: "Accra",
        region: "Greater Accra",
        country: "Ghana",
        is_remote: false,
        is_diaspora: false,

        // Job-specific fields
        employment_type: "",
        employment_type_display: "",
        experience_level: "",
        experience_level_display: "",
        salary_range: "",
        show_salary: false,

        // Scholarship/Grant-specific fields
        funding_amount: "25000",
        funding_currency: "USD",
        duration: "12 months",

        // Deadline
        deadline: "2025-03-31T23:59:59Z",
        days_until_deadline: 77,

        // Status and visibility
        is_featured: true,
        is_trending: false,
        is_urgent: false,
        is_active: true,

        // Engagement tracking
        views_count: 5670,
        applications_count: 123,
        likes_count: 234,
        shares_count: 67,

        // User-specific engagement
        user_applied: false,
        user_saved: false,
        user_liked: false,

        // Status and timestamps
        status: "published",
        created_at: "2025-01-07T10:00:00Z",
        published_at: "2025-01-07T10:00:00Z",
    },
    {
        // Core fields
        id: "550e8400-e29b-41d4-a716-446655440005",
        title: "Data Analyst - Remote Position",
        slug: "data-analyst-remote",
        summary: "Work remotely for an international NGO focused on African development",
        featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",

        // Type and categorization
        opportunity_type: "job",
        opportunity_type_display: "Job",
        category: mockCategories.technology,
        tags: mockTags,
        posted_by: mockUser,

        // Organization details
        organization_name: "African Development Initiative",
        organization_logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        organization_verified: true,

        // Location details
        location: "Remote (Ghana-based)",
        city: "Remote",
        region: "",
        country: "Ghana",
        is_remote: true,
        is_diaspora: true,

        // Job-specific fields
        employment_type: "remote",
        employment_type_display: "Remote",
        experience_level: "entry",
        experience_level_display: "Entry Level",
        salary_range: "GHS 5,000 - 8,000",
        show_salary: true,

        // Scholarship/Grant-specific fields
        funding_amount: null,
        funding_currency: "GHS",
        duration: "",

        // Deadline
        deadline: "2025-02-20T23:59:59Z",
        days_until_deadline: 38,

        // Status and visibility
        is_featured: false,
        is_trending: true,
        is_urgent: false,
        is_active: true,

        // Engagement tracking
        views_count: 3450,
        applications_count: 89,
        likes_count: 112,
        shares_count: 45,

        // User-specific engagement
        user_applied: false,
        user_saved: false,
        user_liked: false,

        // Status and timestamps
        status: "published",
        created_at: "2025-01-10T10:00:00Z",
        published_at: "2025-01-10T10:00:00Z",
    },
    {
        // Core fields
        id: "550e8400-e29b-41d4-a716-446655440006",
        title: "Medical Internship Program - Teaching Hospital",
        slug: "medical-internship-korle-bu",
        summary: "12-month internship at Ghana's premier teaching hospital",
        featured_image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800",

        // Type and categorization
        opportunity_type: "internship",
        opportunity_type_display: "Internship",
        category: mockCategories.health,
        tags: [
            {
                id: 5,
                name: "Healthcare",
                slug: "healthcare",
                description: "Healthcare positions",
                category: 4,
                category_name: "Health",
                usage_count: 43,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        posted_by: mockUser,

        // Organization details
        organization_name: "Korle Bu Teaching Hospital",
        organization_logo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400",
        organization_verified: true,

        // Location details
        location: "Accra, Greater Accra Region",
        city: "Accra",
        region: "Greater Accra",
        country: "Ghana",
        is_remote: false,
        is_diaspora: false,

        // Job-specific fields
        employment_type: "full-time",
        employment_type_display: "Full-time",
        experience_level: "internship",
        experience_level_display: "Internship",
        salary_range: "GHS 2,000 - 3,000",
        show_salary: true,

        // Scholarship/Grant-specific fields
        funding_amount: null,
        funding_currency: "GHS",
        duration: "12 months",

        // Deadline
        deadline: "2025-02-10T23:59:59Z",
        days_until_deadline: 28,

        // Status and visibility
        is_featured: false,
        is_trending: false,
        is_urgent: true,

        is_active: true,

        // Engagement tracking
        views_count: 4230,
        applications_count: 156,
        likes_count: 78,
        shares_count: 34,

        // User-specific engagement
        user_applied: false,
        user_saved: false,
        user_liked: false,

        // Status and timestamps
        status: "published",
        created_at: "2025-01-06T10:00:00Z",
        published_at: "2025-01-06T10:00:00Z",
    },
];

export const typeConfig: Record<
    string,
    { icon: React.ReactNode; color: string; bg: string; label: string }
> = {
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