import { Opportunity, User } from "./opportunities.types";

/* ===========================
   APPLICATION TYPES
   Exact structure from ApplicationSerializer
=========================== */

// Application Status Choices (from models.py APPLICATION_STATUS_CHOICES)
export type ApplicationStatus =
    | "draft"
    | "submitted"
    | "under_review"
    | "shortlisted"
    | "interview_scheduled"
    | "accepted"
    | "rejected"
    | "withdrawn";

// Main Application Interface (ApplicationSerializer)
export interface Application {
    // Core fields
    id: number;
    opportunity: string; // UUID (write-only in serializer)
    opportunity_details: Opportunity; // Nested OpportunityListSerializer
    applicant: User; // UserMinimalSerializer

    // Personal information
    full_name: string;
    email: string;
    phone: string;
    location: string;

    // Application documents
    cv_file: string | null; // FileField URL
    cover_letter: string;
    portfolio_url: string;
    linkedin_url: string;

    // Additional information
    years_of_experience: number | null;
    current_position: string;
    current_company: string;
    expected_salary: string | null; // Decimal as string
    availability: string;
    references: string;

    // Status tracking
    status: ApplicationStatus;
    status_display: string; // Computed from get_status_display
    reviewer_notes: string;
    interview_date: string | null; // ISO datetime
    interview_location: string;

    // AI matching
    ai_match_score: number | null;
    ai_match_reasons: string;

    // Timestamps
    created_at: string; // ISO datetime
    submitted_at: string | null; // ISO datetime
    reviewed_at: string | null; // ISO datetime
}

// Minimal Application (ApplicationMinimalSerializer)
export interface ApplicationMinimal {
    id: number;
    applicant: User;
    full_name: string;
    email: string;
    status: ApplicationStatus;
    status_display: string;
    ai_match_score: number | null;
    created_at: string;
    submitted_at: string | null;
}

// Application Create (ApplicationCreateSerializer)
export interface ApplicationCreate {
    opportunity: string; // UUID
    full_name: string;
    email: string;
    phone: string;
    location: string;
    cv_file?: File | null;
    cover_letter: string;
    portfolio_url?: string;
    linkedin_url?: string;
    years_of_experience?: number;
    current_position?: string;
    current_company?: string;
    expected_salary?: string;
    availability?: string;
    references?: string;
}

// Paginated Response
export interface ApplicationsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Application[];
}