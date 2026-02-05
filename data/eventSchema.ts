import * as Yup from 'yup';

// Event form values type
export interface EventFormValues {
    // Basic Information
    title: string;
    summary: string;
    description: string;
    agenda: string;

    // Categorization
    category: number | '';

    // Event Details
    event_type: 'in-person' | 'virtual' | 'hybrid' | '';
    start_date: string;
    end_date: string;

    // Venue Information
    venue_name: string;
    venue_address: string;
    venue_details: string;
    venue_map_url: string;

    // Media
    featured_image: File | string | null;

    // Contact Information
    contact_email: string;
    contact_phone: string;
    website_url: string;

    // Registration
    registration_required: boolean;
    registration_url: string;
    registration_deadline: string;
    max_attendees: number | '';
    allow_waitlist: boolean;
    registration_instructions: string;

    // Pricing
    price: string;
    is_free: boolean;
}

// Validation schema
export const eventCreationSchema = Yup.object().shape({
    // Basic Information
    title: Yup.string()
        .required('Event title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must not exceed 200 characters'),

    summary: Yup.string()
        .required('Summary is required')
        .min(20, 'Summary must be at least 20 characters')
        .max(500, 'Summary must not exceed 500 characters'),

    description: Yup.string()
        .required('Description is required')
        .min(50, 'Description must be at least 50 characters'),

    agenda: Yup.string()
        .optional(),

    // Categorization
    category: Yup.number()
        .required('Event category is required')
        .positive('Please select a valid category'),

    // Event Details
    event_type: Yup.string()
        .required('Event type is required')
        .oneOf(['in-person', 'virtual', 'hybrid'], 'Invalid event type'),

    start_date: Yup.date()
        .required('Start date is required')
        .min(new Date(), 'Start date must be in the future'),

    end_date: Yup.date()
        .required('End date is required')
        .min(Yup.ref('start_date'), 'End date must be after start date'),

    // Venue Information (required for in-person/hybrid)
    venue_name: Yup.string()
        .when('event_type', {
            is: (val: string) => val === 'in-person' || val === 'hybrid',
            then: (schema) => schema.required('Venue name is required for in-person/hybrid events'),
            otherwise: (schema) => schema.optional(),
        }),

    venue_address: Yup.string()
        .when('event_type', {
            is: (val: string) => val === 'in-person' || val === 'hybrid',
            then: (schema) => schema.required('Venue address is required for in-person/hybrid events'),
            otherwise: (schema) => schema.optional(),
        }),

    venue_details: Yup.string().optional(),

    venue_map_url: Yup.string()
        .url('Must be a valid URL')
        .optional(),

    // Media
    featured_image: Yup.mixed()
        .nullable()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value || typeof value === 'string') return true; // Skip validation for existing URLs
            return (value as File).size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value || typeof value === 'string') return true; // Skip validation for existing URLs
            return ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes((value as File).type);
        }),

    // Contact Information
    contact_email: Yup.string()
        .required('Contact email is required')
        .email('Must be a valid email address'),

    contact_phone: Yup.string()
        .optional()
        .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Invalid phone number format'),

    website_url: Yup.string()
        .url('Must be a valid URL')
        .optional(),

    // Registration
    registration_required: Yup.boolean(),

    registration_url: Yup.string()
        .url('Must be a valid URL')
        .optional(),

    registration_deadline: Yup.date()
        .optional()
        .max(Yup.ref('start_date'), 'Registration deadline must be before event start date'),

    max_attendees: Yup.number()
        .min(0, 'Maximum attendees cannot be negative')
        .optional(),

    allow_waitlist: Yup.boolean(),

    registration_instructions: Yup.string()
        .optional(),

    // Pricing
    price: Yup.string()
        .when('is_free', {
            is: false,
            then: (schema) => schema.required('Price is required for paid events'),
            otherwise: (schema) => schema.optional(),
        })
        .matches(/^\d+(\.\d{1,2})?$/, 'Price must be a valid decimal number'),

    is_free: Yup.boolean(),
});
