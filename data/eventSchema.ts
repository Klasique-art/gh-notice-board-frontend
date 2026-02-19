import * as Yup from "yup";

export interface EventFormValues {
    title: string;
    summary: string;
    description: string;
    agenda: string;

    category: string;
    tags_ids: string[];

    event_type: "in-person" | "virtual" | "hybrid" | "";
    start_date: string;
    end_date: string;
    timezone: string;

    venue_name: string;
    venue_address: string;
    venue_details: string;
    venue_map_url: string;

    virtual_meeting_url: string;
    virtual_meeting_password: string;

    featured_image: File | string | null;
    featured_image_url: string;

    registration_required: boolean;
    registration_url: string;
    max_attendees: number | "";
    allow_waitlist: boolean;

    price: string;
    early_bird_price: string;
    early_bird_deadline: string;

    registration_instructions: string;
    cancellation_policy: string;
    covid_safety_measures: string;
    parking_info: string;
    accessibility_info: string;

    contact_email: string;
    contact_phone: string;
    website_url: string;
    facebook_event_url: string;
    livestream_url: string;

    is_featured: boolean;
    is_trending: boolean;
    status: "draft" | "pending_review" | "published" | "cancelled" | "postponed" | "completed";

    featured_guests_data: Array<{
        name: string;
        title: string;
        bio: string;
        linkedin_url: string;
        twitter_username: string;
        website: string;
        order: number;
    }>;
    sponsors_data: Array<{
        name: string;
        website: string;
        description: string;
        sponsorship_level: "platinum" | "gold" | "silver" | "bronze" | "";
        order: number;
    }>;

    // Compatibility with existing sections/components.
    registration_deadline: string;
    is_free: boolean;
}

export const eventCreationSchema = Yup.object().shape({
    title: Yup.string().required("Event title is required").min(5).max(200),
    summary: Yup.string().required("Summary is required").min(20).max(500),
    description: Yup.string().required("Description is required").min(50),
    agenda: Yup.string().optional(),

    category: Yup.string().required("Event category is required"),
    tags_ids: Yup.array().of(Yup.string()).optional(),

    event_type: Yup.string()
        .required("Event type is required")
        .oneOf(["in-person", "virtual", "hybrid"]),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
        .required("End date is required")
        .min(Yup.ref("start_date"), "End date must be after start date"),
    timezone: Yup.string().required("Timezone is required"),

    venue_name: Yup.string().when("event_type", {
        is: (val: string) => val === "in-person" || val === "hybrid",
        then: (schema) => schema.required("Venue name is required for in-person/hybrid events"),
        otherwise: (schema) => schema.optional(),
    }),
    venue_address: Yup.string().when("event_type", {
        is: (val: string) => val === "in-person" || val === "hybrid",
        then: (schema) => schema.required("Venue address is required for in-person/hybrid events"),
        otherwise: (schema) => schema.optional(),
    }),
    venue_details: Yup.string().optional(),
    venue_map_url: Yup.string().url("Must be a valid URL").optional(),

    virtual_meeting_url: Yup.string().url("Must be a valid URL").optional(),
    virtual_meeting_password: Yup.string().optional(),

    featured_image: Yup.mixed()
        .nullable()
        .test("fileSize", "File size must be less than 8MB", (value) => {
            if (!value || typeof value === "string") return true;
            return (value as File).size <= 8 * 1024 * 1024;
        })
        .test("fileType", "Only image files are allowed", (value) => {
            if (!value || typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
                (value as File).type
            );
        }),
    featured_image_url: Yup.string().url("Must be a valid URL").optional(),

    registration_required: Yup.boolean(),
    registration_url: Yup.string().when("registration_required", {
        is: true,
        then: (schema) =>
            schema.required("Registration URL is required").url("Must be a valid URL"),
        otherwise: (schema) => schema.optional(),
    }),
    max_attendees: Yup.number().min(1, "Maximum attendees must be at least 1").optional(),
    allow_waitlist: Yup.boolean(),

    price: Yup.string()
        .required("Price is required")
        .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid decimal number"),
    early_bird_price: Yup.string()
        .optional()
        .matches(/^\d+(\.\d{1,2})?$/, "Early bird price must be a valid decimal number"),
    early_bird_deadline: Yup.string().optional(),

    registration_instructions: Yup.string().optional(),
    cancellation_policy: Yup.string().optional(),
    covid_safety_measures: Yup.string().optional(),
    parking_info: Yup.string().optional(),
    accessibility_info: Yup.string().optional(),

    contact_email: Yup.string().required("Contact email is required").email("Invalid email"),
    contact_phone: Yup.string().optional(),
    website_url: Yup.string().url("Must be a valid URL").optional(),
    facebook_event_url: Yup.string().url("Must be a valid URL").optional(),
    livestream_url: Yup.string().url("Must be a valid URL").optional(),

    is_featured: Yup.boolean(),
    is_trending: Yup.boolean(),
    status: Yup.string()
        .required("Status is required")
        .oneOf(["draft", "pending_review", "published", "cancelled", "postponed", "completed"]),

    featured_guests_data: Yup.array().of(
        Yup.object({
            name: Yup.string().required("Guest name is required"),
            title: Yup.string().required("Guest title is required"),
            bio: Yup.string().required("Guest bio is required"),
            linkedin_url: Yup.string().url("Must be a valid URL").optional(),
            twitter_username: Yup.string().optional(),
            website: Yup.string().url("Must be a valid URL").optional(),
            order: Yup.number().required(),
        })
    ),
    sponsors_data: Yup.array().of(
        Yup.object({
            name: Yup.string().required("Sponsor name is required"),
            website: Yup.string().url("Must be a valid URL").optional(),
            description: Yup.string().optional(),
            sponsorship_level: Yup.string()
                .oneOf(["platinum", "gold", "silver", "bronze", ""])
                .optional(),
            order: Yup.number().required(),
        })
    ),

    registration_deadline: Yup.string().optional(),
    is_free: Yup.boolean(),
});
