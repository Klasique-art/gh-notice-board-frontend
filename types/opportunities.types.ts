/* ===========================
   Opportunity Type Discriminators
=========================== */

export type OpportunityType =
    | "job"
    | "scholarship"
    | "grant"
    | "internship";

/* ===========================
   Employment Type
=========================== */

export type EmploymentType =
    | "full-time"
    | "part-time"
    | "contract"
    | "remote"
    | "temporary";

/* ===========================
   Opportunity Status
=========================== */

export type OpportunityStatus =
    | "draft"
    | "published"
    | "archived";

/* ===========================
   Base Opportunity
=========================== */

type BaseOpportunity = {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;

    organization_name: string;
    organization_logo?: string | null;

    location: string;
    city: string;
    country: string;

    is_remote: boolean;
    is_diaspora: boolean;

    deadline?: string | null;

    status: OpportunityStatus;

    views_count: number;
    applications_count: number;

    created_at: string;
};

/* ===========================
   Salary / Funding
=========================== */

type WithSalary = {
    salary_min: number;
    salary_max?: number | null;
    salary_currency: "GHS" | "USD" | "EUR";
};

type WithoutSalary = {
    salary_min: null;
    salary_max: null;
    salary_currency: "GHS" | "USD" | "EUR";
};

/* ===========================
   Opportunity Variants
=========================== */

export type JobOpportunity = BaseOpportunity &
    WithSalary & {
        opportunity_type: "job";
        employment_type: EmploymentType;
    };

export type InternshipOpportunity = BaseOpportunity &
    WithSalary & {
        opportunity_type: "internship";
        employment_type: "full-time" | "part-time";
    };

export type ScholarshipOpportunity = BaseOpportunity &
    WithoutSalary & {
        opportunity_type: "scholarship";
        employment_type: "full-time";
    };

export type GrantOpportunity = BaseOpportunity &
    WithoutSalary & {
        opportunity_type: "grant";
        employment_type: "contract";
    };

/* ===========================
   Final Opportunity Type
=========================== */

export type Opportunity =
    | JobOpportunity
    | InternshipOpportunity
    | ScholarshipOpportunity
    | GrantOpportunity;
