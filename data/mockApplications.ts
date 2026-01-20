import { Application, ApplicationsResponse } from "@/types/applications.types";
import { mockOpportunities } from "./mockOpportunities";
import { currentUser } from "./dummy.general";

// Mock Applications Data
export const mockApplications: Application[] = [
    {
        id: 1,
        opportunity: mockOpportunities[0].id,
        opportunity_details: mockOpportunities[0],
        applicant: currentUser,

        // Personal information
        full_name: "Kwame Mensah",
        email: "kwame.mensah@example.com",
        phone: "+233241234567",
        location: "Accra, Greater Accra",

        // Application documents
        cv_file: "/applications/cvs/kwame_mensah_cv.pdf",
        cover_letter: "I am excited to apply for the Senior Software Engineer position at Ghana Fintech Solutions. With over 5 years of experience in full-stack development and a passion for fintech innovation, I believe I would be a great fit for your team. I have extensive experience with React, Node.js, and mobile money integrations...",
        portfolio_url: "https://kwamemensah.dev",
        linkedin_url: "https://linkedin.com/in/kwamemensah",

        // Additional information
        years_of_experience: 5,
        current_position: "Senior Software Engineer",
        current_company: "TechGhana Solutions",
        expected_salary: "12000",
        availability: "2 weeks notice",
        references: "Available upon request",

        // Status tracking
        status: "under_review",
        status_display: "Under Review",
        reviewer_notes: "",
        interview_date: null,
        interview_location: "",

        // AI matching
        ai_match_score: 0.92,
        ai_match_reasons: "Strong match based on 5 years experience, full-stack skills, fintech background",

        // Timestamps
        created_at: "2025-01-15T10:30:00Z",
        submitted_at: "2025-01-15T10:35:00Z",
        reviewed_at: "2025-01-16T09:00:00Z",
    },
    {
        id: 2,
        opportunity: mockOpportunities[1].id,
        opportunity_details: mockOpportunities[1],
        applicant: currentUser,

        // Personal information
        full_name: "Kwame Mensah",
        email: "kwame.mensah@example.com",
        phone: "+233241234567",
        location: "Accra, Ghana",

        // Application documents
        cv_file: "/applications/cvs/kwame_mensah_academic_cv.pdf",
        cover_letter: "I am writing to express my strong interest in the Mastercard Foundation Scholars Program 2025. As a passionate student with a strong academic record and commitment to community development, I believe this scholarship would enable me to pursue my dreams of studying Computer Science...",
        portfolio_url: "",
        linkedin_url: "https://linkedin.com/in/kwamemensah",

        // Additional information
        years_of_experience: null,
        current_position: "",
        current_company: "",
        expected_salary: null,
        availability: "Immediately",
        references: "1. Dr. Emmanuel Asante - Head of Computer Science, University of Ghana\n2. Mrs. Abena Osei - High School Principal",

        // Status tracking
        status: "shortlisted",
        status_display: "Shortlisted",
        reviewer_notes: "Strong academic performance, excellent essay",
        interview_date: "2025-02-15T10:00:00Z",
        interview_location: "Accra Interview Center",

        // AI matching
        ai_match_score: 0.88,
        ai_match_reasons: "Excellent academic record, strong community involvement, clear career goals",

        // Timestamps
        created_at: "2025-01-10T14:20:00Z",
        submitted_at: "2025-01-10T14:30:00Z",
        reviewed_at: "2025-01-14T11:00:00Z",
    },
    {
        id: 3,
        opportunity: mockOpportunities[2].id,
        opportunity_details: mockOpportunities[2],
        applicant: currentUser,

        // Personal information
        full_name: "Kwame Mensah",
        email: "kwame.mensah@example.com",
        phone: "+233241234567",
        location: "Accra, Ghana",

        // Application documents
        cv_file: "/applications/cvs/kwame_mensah_marketing_cv.pdf",
        cover_letter: "I am thrilled to submit my application for the Digital Marketing Specialist position at Bloom Marketing Agency. With my background in software engineering and growing interest in digital marketing, I bring a unique perspective...",
        portfolio_url: "https://kwamemensah.dev/marketing",
        linkedin_url: "https://linkedin.com/in/kwamemensah",

        // Additional information
        years_of_experience: 2,
        current_position: "Software Engineer",
        current_company: "TechGhana Solutions",
        expected_salary: "7000",
        availability: "1 month notice",
        references: "Available upon request",

        // Status tracking
        status: "submitted",
        status_display: "Submitted",
        reviewer_notes: "",
        interview_date: null,
        interview_location: "",

        // AI matching
        ai_match_score: 0.75,
        ai_match_reasons: "Good technical skills, career transition candidate",

        // Timestamps
        created_at: "2025-01-18T16:45:00Z",
        submitted_at: "2025-01-18T17:00:00Z",
        reviewed_at: null,
    },
    {
        id: 4,
        opportunity: mockOpportunities[4].id,
        opportunity_details: mockOpportunities[4],
        applicant: currentUser,

        // Personal information
        full_name: "Kwame Mensah",
        email: "kwame.mensah@example.com",
        phone: "+233241234567",
        location: "Accra, Ghana",

        // Application documents
        cv_file: "/applications/cvs/kwame_mensah_data_cv.pdf",
        cover_letter: "I am excited to apply for the Data Analyst position with African Development Initiative. My experience with data analysis, Python, and SQL, combined with my passion for African development, makes me an ideal candidate...",
        portfolio_url: "https://github.com/kwamemensah/data-projects",
        linkedin_url: "https://linkedin.com/in/kwamemensah",

        // Additional information
        years_of_experience: 3,
        current_position: "Senior Software Engineer",
        current_company: "TechGhana Solutions",
        expected_salary: "10000",
        availability: "Flexible",
        references: "Available upon request",

        // Status tracking
        status: "accepted",
        status_display: "Accepted",
        reviewer_notes: "Excellent candidate, strong data skills",
        interview_date: "2025-01-12T15:00:00Z",
        interview_location: "Virtual Interview - Zoom",

        // AI matching
        ai_match_score: 0.95,
        ai_match_reasons: "Perfect match: Python expertise, data analysis experience, remote work ready",

        // Timestamps
        created_at: "2025-01-05T09:15:00Z",
        submitted_at: "2025-01-05T09:30:00Z",
        reviewed_at: "2025-01-08T14:00:00Z",
    },
    {
        id: 5,
        opportunity: mockOpportunities[3].id,
        opportunity_details: mockOpportunities[3],
        applicant: currentUser,

        // Personal information
        full_name: "Kwame Mensah",
        email: "kwame.mensah@example.com",
        phone: "+233241234567",
        location: "Kumasi, Ashanti Region",

        // Application documents
        cv_file: null,
        cover_letter: "Draft application for Ghana Tech Startup Grant...",
        portfolio_url: "",
        linkedin_url: "",

        // Additional information
        years_of_experience: null,
        current_position: "",
        current_company: "",
        expected_salary: null,
        availability: "",
        references: "",

        // Status tracking
        status: "draft",
        status_display: "Draft",
        reviewer_notes: "",
        interview_date: null,
        interview_location: "",

        // AI matching
        ai_match_score: null,
        ai_match_reasons: "",

        // Timestamps
        created_at: "2025-01-19T20:00:00Z",
        submitted_at: null,
        reviewed_at: null,
    },
    {
        id: 6,
        opportunity: mockOpportunities[5].id,
        opportunity_details: mockOpportunities[5],
        applicant: currentUser,

        // Personal information
        full_name: "Kwame Mensah",
        email: "kwame.mensah@example.com",
        phone: "+233241234567",
        location: "Accra, Ghana",

        // Application documents
        cv_file: "/applications/cvs/kwame_mensah_pm_cv.pdf",
        cover_letter: "Thank you for considering my application for the Product Manager role...",
        portfolio_url: "https://kwamemensah.dev/products",
        linkedin_url: "https://linkedin.com/in/kwamemensah",

        // Additional information
        years_of_experience: 5,
        current_position: "Senior Software Engineer",
        current_company: "TechGhana Solutions",
        expected_salary: "15000",
        availability: "2 weeks",
        references: "Available upon request",

        // Status tracking
        status: "rejected",
        status_display: "Rejected",
        reviewer_notes: "Excellent technical skills but limited product management experience",
        interview_date: null,
        interview_location: "",

        // AI matching
        ai_match_score: 0.68,
        ai_match_reasons: "Strong technical background, limited PM experience",

        // Timestamps
        created_at: "2024-12-20T10:00:00Z",
        submitted_at: "2024-12-20T11:00:00Z",
        reviewed_at: "2024-12-28T16:00:00Z",
    },
];

// Mock Paginated Response
export const mockApplicationsResponse: ApplicationsResponse = {
    count: mockApplications.length,
    next: null,
    previous: null,
    results: mockApplications,
};