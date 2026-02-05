'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { CheckCircle, AlertCircle } from 'lucide-react';

import { eventCreationSchema, EventFormValues } from '@/data/eventSchema';
import {
    EventBasicInfoSection,
    EventCategorySection,
    EventDetailsSection,
    EventVenueSection,
    EventMediaSection,
    EventContactSection,
    EventRegistrationSection,
    EventPricingSection,
    SubmitButton,
    FormLoader
} from '@/components';

interface CreateEventFormProps {
    eventSlug?: string;
    initialData?: Partial<EventFormValues>;
}

const CreateEventForm = ({ eventSlug, initialData }: CreateEventFormProps = {}) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const isEditMode = !!eventSlug;

    const defaultValues: EventFormValues = {
        // Basic Information
        title: '',
        summary: '',
        description: '',
        agenda: '',

        // Categorization
        category: '',

        // Event Details
        event_type: '',
        start_date: '',
        end_date: '',

        // Venue Information
        venue_name: '',
        venue_address: '',
        venue_details: '',
        venue_map_url: '',

        // Media
        featured_image: null,

        // Contact Information
        contact_email: '',
        contact_phone: '',
        website_url: '',

        // Registration
        registration_required: false,
        registration_url: '',
        registration_deadline: '',
        max_attendees: '',
        allow_waitlist: false,
        registration_instructions: '',

        // Pricing
        price: '',
        is_free: true,
    };

    const initialValues: EventFormValues = {
        ...defaultValues,
        ...initialData,
    };

    const handleSubmit = async (values: EventFormValues, { setSubmitting }: any) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            // Build FormData for multipart/form-data
            const formData = new FormData();

            // Basic Information
            formData.append('title', values.title);
            formData.append('summary', values.summary);
            formData.append('description', values.description);
            if (values.agenda) formData.append('agenda', values.agenda);

            // Categorization
            formData.append('category', values.category.toString());

            // Event Details
            formData.append('event_type', values.event_type);
            formData.append('start_date', new Date(values.start_date).toISOString());
            formData.append('end_date', new Date(values.end_date).toISOString());

            // Venue Information (for in-person/hybrid)
            if (values.event_type === 'in-person' || values.event_type === 'hybrid') {
                formData.append('venue_name', values.venue_name);
                formData.append('venue_address', values.venue_address);
                if (values.venue_details) formData.append('venue_details', values.venue_details);
                if (values.venue_map_url) formData.append('venue_map_url', values.venue_map_url);
            }

            // Media - only append if it's a new File upload
            if (values.featured_image && typeof values.featured_image !== 'string') {
                formData.append('featured_image', values.featured_image);
            }

            // Contact Information
            formData.append('contact_email', values.contact_email);
            if (values.contact_phone) formData.append('contact_phone', values.contact_phone);
            if (values.website_url) formData.append('website_url', values.website_url);

            // Registration
            formData.append('registration_required', values.registration_required.toString());
            if (values.registration_required) {
                if (values.registration_url) formData.append('registration_url', values.registration_url);
                if (values.registration_deadline) {
                    formData.append('registration_deadline', new Date(values.registration_deadline).toISOString());
                }
                if (values.max_attendees) formData.append('max_attendees', values.max_attendees.toString());
                formData.append('allow_waitlist', values.allow_waitlist.toString());
                if (values.registration_instructions) {
                    formData.append('registration_instructions', values.registration_instructions);
                }
            }

            // Pricing
            formData.append('is_free', values.is_free.toString());
            formData.append('price', values.is_free ? '0.00' : values.price);

            // Send to API route
            const apiUrl = isEditMode ? `/api/events/${eventSlug}/edit` : '/api/events/create';
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(apiUrl, {
                method,
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.detail || `Failed to ${isEditMode ? 'update' : 'create'} event`);
            }

            setSubmitSuccess(true);

            // Redirect to event detail page
            setTimeout(() => {
                router.push(`/events/${data.slug || data.id}`);
            }, 1500);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error ${isEditMode ? 'updating' : 'creating'} event:`, error.message);
                setSubmitError(error.message);
            } else {
                console.error(`Error ${isEditMode ? 'updating' : 'creating'} event:`, error);
                setSubmitError(`Failed to ${isEditMode ? 'update' : 'create'} event. Please try again.`);
            }
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 sm:p-8 shadow-lg">
            <Formik
                initialValues={initialValues}
                validationSchema={eventCreationSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className="space-y-6">
                        <FormLoader visible={isSubmitting} message={`${isEditMode ? 'Updating' : 'Creating'} your event...`} />

                        {/* Section 1: Basic Info */}
                        <EventBasicInfoSection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 2: Category */}
                        <EventCategorySection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 3: Event Details */}
                        <EventDetailsSection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 4: Venue */}
                        <EventVenueSection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 5: Media */}
                        <EventMediaSection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 6: Contact */}
                        <EventContactSection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 7: Registration */}
                        <EventRegistrationSection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 8: Pricing */}
                        <EventPricingSection />

                        {/* Submit Error */}
                        {submitError && (
                            <div className="p-4 bg-red-50 rounded-xl border border-red-200 animate-fade-in">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text text-red-700 font-semibold mb-1">
                                            Error {isEditMode ? 'Updating' : 'Creating'} Event
                                        </p>
                                        <p className="small-text text-red-600">
                                            {submitError}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Success */}
                        {submitSuccess && (
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 animate-fade-in">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text text-emerald-700 font-semibold mb-1">
                                            Event {isEditMode ? 'Updated' : 'Created'} Successfully!
                                        </p>
                                        <p className="small-text text-emerald-600">
                                            Redirecting to event page...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard/my-events')}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold big-text-5 hover:bg-slate-200 transition-all duration-300 border-2 border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <div className="flex-1">
                                <SubmitButton title={isEditMode ? 'Update Event' : 'Create Event'} />
                            </div>
                        </div>

                        {/* Helper Text */}
                        <p className="text-center small-text text-slate-500">
                            By {isEditMode ? 'updating' : 'creating'} this event, you agree to our Terms of Service and Event Guidelines
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateEventForm;
