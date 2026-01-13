import { DiasporaPost, User, Tag } from "@/types/diaspora.types";

// Mock User (from UserMinimalSerializer)
const mockUser: User = {
    id: 1,
    username: "diaspora_admin",
    full_name: "Kwame Mensah",
    display_name: "Kwame Mensah ✓",
    avatar: "https://i.pravatar.cc/300?img=15",
    is_verified: true,
    verification_badge: "✓",
};

// Mock Categories (from CategorySerializer)
const mockCategories = {
    community: {
        id: 5,
        name: "Community",
        slug: "community",
        description: "Community and diaspora updates",
        icon: "Users",
        color: "#10B981",
        order: 5,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
    },
    business: {
        id: 3,
        name: "Business",
        slug: "business",
        description: "Business and investment opportunities",
        icon: "Briefcase",
        color: "#F59E0B",
        order: 3,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
    },
    culture: {
        id: 6,
        name: "Culture",
        slug: "culture",
        description: "Cultural events and preservation",
        icon: "Heart",
        color: "#EC4899",
        order: 6,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
    },
};

// Mock Tags (from TagSerializer)
const mockTags: Tag[] = [
    {
        id: 10,
        name: "USA Diaspora",
        slug: "usa-diaspora",
        description: "Ghana diaspora in United States",
        category: 5,
        category_name: "Community",
        usage_count: 156,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        is_subscribed: false,
    },
    {
        id: 11,
        name: "UK Diaspora",
        slug: "uk-diaspora",
        description: "Ghana diaspora in United Kingdom",
        category: 5,
        category_name: "Community",
        usage_count: 123,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        is_subscribed: false,
    },
];

/* ===========================
   MOCK DIASPORA POSTS
   Exact structure from DiasporaPostListSerializer
=========================== */

export const mockDiasporaPosts: DiasporaPost[] = [
    {
        // Core fields
        id: "650e8400-e29b-41d4-a716-446655440001",
        title: "Ghana UK Homecoming Festival 2025",
        slug: "ghana-uk-homecoming-festival-2025",
        summary: "Join thousands of Ghanaians in the UK for the biggest homecoming celebration. Three days of culture, networking, and celebration.",
        featured_image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",

        // Content categorization
        content_type: "event",
        content_type_display: "Diaspora Event",
        category: mockCategories.culture,
        tags: mockTags,
        author: mockUser,
        is_diaspora_author: true,

        // Location details
        region: "europe",
        region_display: "Europe",
        country: "United Kingdom",
        city: "London",
        diaspora_community: "Ghana UK Association",

        // Organization details
        organization_name: "Ghana UK Cultural Centre",
        organization_logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400",
        organization_verified: true,

        // Status and visibility
        is_featured: true,
        is_trending: true,
        is_urgent: false,
        is_pinned: true,

        // Engagement tracking
        views_count: 8450,
        likes_count: 567,
        comments_count: 89,
        shares_count: 234,

        // User-specific engagement
        user_liked: false,
        user_bookmarked: false,

        // Computed properties
        is_active: true,
        is_event: true,
        is_upcoming_event: true,
        is_investment_opportunity: false,

        // Event-specific fields
        event_date: "2025-08-15T10:00:00Z",
        opportunity_deadline: null,

        // Investment-specific fields
        investment_amount: null,
        investment_currency: "USD",

        // Status and timestamps
        status: "published",
        created_at: "2025-01-10T10:00:00Z",
        published_at: "2025-01-10T10:00:00Z",
    },
    {
        // Core fields
        id: "650e8400-e29b-41d4-a716-446655440002",
        title: "US Visa Update: New Policy for Ghanaian Nationals",
        slug: "us-visa-update-ghanaian-nationals-2025",
        summary: "Important updates on US visa application process for Ghanaian citizens. Changes effective February 2025.",
        featured_image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",

        // Content categorization
        content_type: "immigration",
        content_type_display: "Immigration Update",
        category: mockCategories.community,
        tags: [
            {
                id: 12,
                name: "Immigration",
                slug: "immigration",
                description: "Immigration updates",
                category: 5,
                category_name: "Community",
                usage_count: 89,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        author: mockUser,
        is_diaspora_author: false,

        // Location details
        region: "north-america",
        region_display: "North America",
        country: "United States",
        city: "Washington DC",
        diaspora_community: "",

        // Organization details
        organization_name: "US Embassy Ghana",
        organization_logo: "https://images.unsplash.com/photo-1509923768-1f1dc00e5206?w=400",
        organization_verified: true,

        // Status and visibility
        is_featured: true,
        is_trending: true,
        is_urgent: true,
        is_pinned: false,

        // Engagement tracking
        views_count: 15340,
        likes_count: 892,
        comments_count: 234,
        shares_count: 456,

        // User-specific engagement
        user_liked: false,
        user_bookmarked: false,

        // Computed properties
        is_active: true,
        is_event: false,
        is_upcoming_event: false,
        is_investment_opportunity: false,

        // Event-specific fields
        event_date: null,
        opportunity_deadline: null,

        // Investment-specific fields
        investment_amount: null,
        investment_currency: "USD",

        // Status and timestamps
        status: "published",
        created_at: "2025-01-12T14:00:00Z",
        published_at: "2025-01-12T14:00:00Z",
    },
    {
        // Core fields
        id: "650e8400-e29b-41d4-a716-446655440003",
        title: "Real Estate Investment Opportunity in Accra",
        slug: "real-estate-investment-accra-2025",
        summary: "Exclusive investment opportunity for diaspora: Luxury apartments in Airport Residential Area. Expected 18% annual ROI.",
        featured_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",

        // Content categorization
        content_type: "investment",
        content_type_display: "Investment Opportunity",
        category: mockCategories.business,
        tags: [
            {
                id: 13,
                name: "Real Estate",
                slug: "real-estate",
                description: "Real estate investments",
                category: 3,
                category_name: "Business",
                usage_count: 67,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        author: mockUser,
        is_diaspora_author: true,

        // Location details
        region: "global",
        region_display: "Global",
        country: "Ghana",
        city: "Accra",
        diaspora_community: "Diaspora Investment Network",

        // Organization details
        organization_name: "Ghana Properties Ltd",
        organization_logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
        organization_verified: true,

        // Status and visibility
        is_featured: true,
        is_trending: false,
        is_urgent: false,
        is_pinned: false,

        // Engagement tracking
        views_count: 6780,
        likes_count: 234,
        comments_count: 67,
        shares_count: 123,

        // User-specific engagement
        user_liked: false,
        user_bookmarked: false,

        // Computed properties
        is_active: true,
        is_event: false,
        is_upcoming_event: false,
        is_investment_opportunity: true,

        // Event-specific fields
        event_date: null,
        opportunity_deadline: "2025-03-31T23:59:59Z",

        // Investment-specific fields
        investment_amount: "50000",
        investment_currency: "USD",

        // Status and timestamps
        status: "published",
        created_at: "2025-01-08T10:00:00Z",
        published_at: "2025-01-08T10:00:00Z",
    },
    {
        // Core fields
        id: "650e8400-e29b-41d4-a716-446655440004",
        title: "Success Story: From London to Accra - My Tech Journey",
        slug: "success-story-london-accra-tech-journey",
        summary: "How I left my corporate job in London to build a successful tech company in Ghana. Lessons learned and opportunities discovered.",
        featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",

        // Content categorization
        content_type: "story",
        content_type_display: "Success Story",
        category: mockCategories.business,
        tags: [
            {
                id: 14,
                name: "Entrepreneurship",
                slug: "entrepreneurship",
                description: "Entrepreneurship stories",
                category: 3,
                category_name: "Business",
                usage_count: 45,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        author: mockUser,
        is_diaspora_author: true,

        // Location details
        region: "europe",
        region_display: "Europe",
        country: "United Kingdom",
        city: "London",
        diaspora_community: "Ghana Tech Diaspora",

        // Organization details
        organization_name: "",
        organization_logo: null,
        organization_verified: false,

        // Status and visibility
        is_featured: false,
        is_trending: true,
        is_urgent: false,
        is_pinned: false,

        // Engagement tracking
        views_count: 4230,
        likes_count: 389,
        comments_count: 78,
        shares_count: 156,

        // User-specific engagement
        user_liked: false,
        user_bookmarked: false,

        // Computed properties
        is_active: true,
        is_event: false,
        is_upcoming_event: false,
        is_investment_opportunity: false,

        // Event-specific fields
        event_date: null,
        opportunity_deadline: null,

        // Investment-specific fields
        investment_amount: null,
        investment_currency: "USD",

        // Status and timestamps
        status: "published",
        created_at: "2025-01-09T15:00:00Z",
        published_at: "2025-01-09T15:00:00Z",
    },
    {
        // Core fields
        id: "650e8400-e29b-41d4-a716-446655440005",
        title: "Ghana Embassy Notice: Passport Renewal Updates",
        slug: "ghana-embassy-passport-renewal-updates",
        summary: "Important information on passport renewal process at Ghana Embassy in Washington DC. New biometric system implemented.",
        featured_image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800",

        // Content categorization
        content_type: "embassy",
        content_type_display: "Embassy Notice",
        category: mockCategories.community,
        tags: [
            {
                id: 15,
                name: "Consular Services",
                slug: "consular-services",
                description: "Embassy and consular services",
                category: 5,
                category_name: "Community",
                usage_count: 112,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        author: mockUser,
        is_diaspora_author: false,

        // Location details
        region: "north-america",
        region_display: "North America",
        country: "United States",
        city: "Washington DC",
        diaspora_community: "",

        // Organization details
        organization_name: "Ghana Embassy USA",
        organization_logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
        organization_verified: true,

        // Status and visibility
        is_featured: false,
        is_trending: false,
        is_urgent: true,
        is_pinned: true,

        // Engagement tracking
        views_count: 9870,
        likes_count: 234,
        comments_count: 45,
        shares_count: 89,

        // User-specific engagement
        user_liked: false,
        user_bookmarked: false,

        // Computed properties
        is_active: true,
        is_event: false,
        is_upcoming_event: false,
        is_investment_opportunity: false,

        // Event-specific fields
        event_date: null,
        opportunity_deadline: null,

        // Investment-specific fields
        investment_amount: null,
        investment_currency: "USD",

        // Status and timestamps
        status: "published",
        created_at: "2025-01-11T09:00:00Z",
        published_at: "2025-01-11T09:00:00Z",
    },
    {
        // Core fields
        id: "650e8400-e29b-41d4-a716-446655440006",
        title: "Networking Event: Ghana Professionals in Dubai",
        slug: "networking-event-ghana-professionals-dubai",
        summary: "Monthly networking meetup for Ghanaian professionals in Dubai. Connect, collaborate, and celebrate our culture.",
        featured_image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",

        // Content categorization
        content_type: "community",
        content_type_display: "Community Network",
        category: mockCategories.community,
        tags: [
            {
                id: 16,
                name: "Networking",
                slug: "networking",
                description: "Professional networking",
                category: 5,
                category_name: "Community",
                usage_count: 78,
                is_active: true,
                created_at: "2024-01-01T00:00:00Z",
                is_subscribed: false,
            },
        ],
        author: mockUser,
        is_diaspora_author: true,

        // Location details
        region: "middle-east",
        region_display: "Middle East",
        country: "United Arab Emirates",
        city: "Dubai",
        diaspora_community: "Ghana Dubai Network",

        // Organization details
        organization_name: "Ghana Association UAE",
        organization_logo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
        organization_verified: false,

        // Status and visibility
        is_featured: false,
        is_trending: false,
        is_urgent: false,
        is_pinned: false,

        // Engagement tracking
        views_count: 2340,
        likes_count: 123,
        comments_count: 34,
        shares_count: 56,

        // User-specific engagement
        user_liked: false,
        user_bookmarked: false,

        // Computed properties
        is_active: true,
        is_event: true,
        is_upcoming_event: true,
        is_investment_opportunity: false,

        // Event-specific fields
        event_date: "2025-02-20T18:00:00Z",
        opportunity_deadline: null,

        // Investment-specific fields
        investment_amount: null,
        investment_currency: "USD",

        // Status and timestamps
        status: "published",
        created_at: "2025-01-07T12:00:00Z",
        published_at: "2025-01-07T12:00:00Z",
    },
];