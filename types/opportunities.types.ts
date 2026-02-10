/* ===========================
   EXACT TYPES FROM DJANGO BACKEND
   Matches OpportunityListSerializer
=========================== */

// User (from UserMinimalSerializer)
export interface User {
    id: number;
    username: string;
    full_name: string;
    display_name: string;
    avatar: string | null;
    is_verified: boolean;
    verification_badge: string;
}

// Category (from CategorySerializer - nested in Opportunity)
export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    order: number;
    is_active: boolean;
    created_at: string;
}

// Tag (from TagSerializer)
export interface Tag {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: number;
    category_name: string;
    usage_count: number;
    is_active: boolean;
    created_at: string;
    is_subscribed: boolean;
}

// Opportunity Type Choices (from models.py OPPORTUNITY_TYPE_CHOICES)
export type OpportunityType =
    | "job"
    | "scholarship"
    | "grant"
    | "internship"
    | "fellowship"
    | "volunteer"
    | "business"
    | "funding"
    | "mentorship"
    | "training";

// Status Choices (from models.py STATUS_CHOICES)
export type OpportunityStatus =
    | "draft"
    | "pending_review"
    | "published"
    | "expired"
    | "filled"
    | "cancelled";

// Employment Type Choices (from models.py EMPLOYMENT_TYPE_CHOICES)
export type EmploymentType =
    | "full-time"
    | "part-time"
    | "contract"
    | "freelance"
    | "remote"
    | "hybrid"
    | "temporary";

// Experience Level Choices (from models.py EXPERIENCE_LEVEL_CHOICES)
export type ExperienceLevel =
    | "entry"
    | "mid"
    | "senior"
    | "executive"
    | "internship"
    | "no-experience";

/* ===========================
   MAIN OPPORTUNITY TYPE
   Matches OpportunityListSerializer.Meta.fields
=========================== */

export interface Opportunity {
    // Core fields
    id: string; // UUID
    title: string;
    slug: string;
    summary: string;
    featured_image: string | null;

    // Type and categorization
    opportunity_type: OpportunityType;
    opportunity_type_display: string;
    category: Category | null;
    tags: Tag[];
    posted_by: User;

    // Organization details
    organization_name: string;
    organization_logo: string | null;
    organization_verified: boolean;

    // Location details
    location: string;
    city: string;
    region: string;
    country: string;
    is_remote: boolean;
    is_diaspora: boolean;

    // Job-specific fields
    employment_type: EmploymentType | "";
    employment_type_display: string;
    experience_level: ExperienceLevel | "";
    experience_level_display: string;
    salary_range: string; // Computed field from backend
    show_salary: boolean;

    // Scholarship/Grant-specific fields
    funding_amount: string | null; // Decimal as string
    funding_currency: string;
    duration: string;

    // Deadline
    deadline: string | null; // ISO datetime
    days_until_deadline: number | null; // Computed by backend

    // Status and visibility
    is_featured: boolean;
    is_trending: boolean;
    is_urgent: boolean;
    is_active: boolean; // Computed property from backend

    // Engagement tracking
    views_count: number;
    applications_count: number;
    likes_count: number;
    shares_count: number;

    // User-specific engagement (requires authentication)
    user_applied: boolean;
    user_saved: boolean;
    user_liked: boolean;

    // Status and timestamps
    status: OpportunityStatus;
    created_at: string; // ISO datetime
    published_at: string | null; // ISO datetime
}

/* ===========================
   DETAIL SERIALIZER TYPE
   For single opportunity view (OpportunityDetailSerializer)
=========================== */

export interface OpportunityDetail extends Opportunity {
    // Additional fields from OpportunityDetailSerializer
    description: string;
    organization_website: string;
    organization_description: string;
    relocation_assistance: boolean;
    benefits: string;

    // Requirements
    education_requirement: string;
    experience_requirement: string;
    skills_required: string;
    languages_required: string;
    certifications_required: string;

    // Scholarship/Grant additional
    eligibility_criteria: string;
    selection_process: string;
    number_of_slots: number;

    // Application details
    application_method: string;
    application_url: string;
    application_email: string;
    application_instructions: string;
    required_documents: string;

    // Contact information
    contact_person: string;
    contact_email: string;
    contact_phone: string;

    // AI Integration
    is_ai_enhanced: boolean;
    ai_summary: string;
    ai_match_keywords: string;

    // Media
    gallery_images: OpportunityImage[];

    // Related content
    related_opportunities: Opportunity[];
    similar_by_organization: Opportunity[];

    // Updated timestamp
    updated_at: string;
}

export interface OpportunityImage {
    id: string;
    image: string;
    caption: string;
    order: number;
    created_at: string;
}

/* ===========================
   Paginated Response
=========================== */

export type PaginatedOpportunitiesResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Opportunity[];
};

/* ===========================
   Opportunity Filters
=========================== */

export type OpportunityFilters = {
    search?: string;
    opportunity_type?: OpportunityType | OpportunityType[];
    category?: string | string[]; // legacy
    category_slug?: string | string[]; // legacy
    category__slug?: string | string[];
    is_featured?: boolean;
    is_remote?: boolean;
    is_diaspora?: boolean;
    status?: OpportunityStatus;
    page?: number;
    ordering?: string; // e.g. '-published_at'
};
