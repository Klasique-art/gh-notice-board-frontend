'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikHelpers } from 'formik';
import { CheckCircle, AlertCircle, Plus, X, Loader2 } from 'lucide-react';

import { eventCreationSchema, EventFormValues } from '@/data/eventSchema';
import {
    EventBasicInfoSection,
    EventDetailsSection,
    EventVenueSection,
    EventMediaSection,
    EventContactSection,
    EventRegistrationSection,
    EventPricingSection,
    AppFormField,
    SubmitButton,
    FormLoader
} from '@/components';

interface CreateEventFormProps {
    eventSlug?: string;
    initialData?: Partial<EventFormValues>;
}

type CategoryOption = {
    id: string;
    name: string;
    color?: string;
    is_active?: boolean;
    order?: number;
};

type TagOption = {
    id: string;
    name: string;
    usage_count?: number;
    is_active?: boolean;
};

const CreateEventForm = ({ eventSlug, initialData }: CreateEventFormProps = {}) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [tags, setTags] = useState<TagOption[]>([]);
    const [taxonomyLoading, setTaxonomyLoading] = useState(true);
    const [taxonomyError, setTaxonomyError] = useState<string | null>(null);

    const isEditMode = !!eventSlug;

    useEffect(() => {
        const loadTaxonomy = async () => {
            setTaxonomyLoading(true);
            setTaxonomyError(null);
            try {
                const [categoriesRes, tagsRes] = await Promise.all([
                    fetch('/api/categories', { cache: 'no-store' }),
                    fetch('/api/tags', { cache: 'no-store' }),
                ]);

                if (!categoriesRes.ok || !tagsRes.ok) {
                    throw new Error('Unable to load categories and tags.');
                }

                const categoriesData = await categoriesRes.json();
                const tagsData = await tagsRes.json();

                const rawCategories = Array.isArray(categoriesData)
                    ? categoriesData
                    : categoriesData.results || [];
                const rawTags = Array.isArray(tagsData) ? tagsData : tagsData.results || [];

                setCategories(
                    rawCategories
                        .filter((cat: CategoryOption) => cat.is_active !== false)
                        .sort((a: CategoryOption, b: CategoryOption) => (a.order || 0) - (b.order || 0))
                );
                setTags(
                    rawTags
                        .filter((tag: TagOption) => tag.is_active !== false)
                        .sort((a: TagOption, b: TagOption) => (b.usage_count || 0) - (a.usage_count || 0))
                );
            } catch (error) {
                setTaxonomyError(error instanceof Error ? error.message : 'Failed to load taxonomy.');
            } finally {
                setTaxonomyLoading(false);
            }
        };

        loadTaxonomy();
    }, []);

    const defaultValues: EventFormValues = {
        title: '',
        summary: '',
        description: '',
        agenda: '',
        category: '',
        tags_ids: [],
        event_type: '',
        start_date: '',
        end_date: '',
        timezone: 'Africa/Accra',
        venue_name: '',
        venue_address: '',
        venue_details: '',
        venue_map_url: '',
        virtual_meeting_url: '',
        virtual_meeting_password: '',
        featured_image: null,
        featured_image_url: '',
        contact_email: '',
        contact_phone: '',
        website_url: '',
        facebook_event_url: '',
        livestream_url: '',
        registration_required: false,
        registration_url: '',
        registration_deadline: '',
        max_attendees: '',
        allow_waitlist: false,
        registration_instructions: '',
        price: '0.00',
        early_bird_price: '',
        early_bird_deadline: '',
        cancellation_policy: '',
        covid_safety_measures: '',
        parking_info: '',
        accessibility_info: '',
        is_featured: false,
        is_trending: false,
        status: 'published',
        featured_guests_data: [],
        sponsors_data: [],
        is_free: true,
    };

    const initialValues: EventFormValues = {
        ...defaultValues,
        ...initialData,
    };

    const handleSubmit = async (
        values: EventFormValues,
        { setSubmitting }: FormikHelpers<EventFormValues>
    ) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            const formData = new FormData();
            const appendString = (key: string, value: string) => {
                if (value?.trim()) formData.append(key, value.trim());
            };

            const guests = values.featured_guests_data
                .map((guest, index) => ({
                    ...guest,
                    name: guest.name.trim(),
                    title: guest.title.trim(),
                    bio: guest.bio.trim(),
                    linkedin_url: guest.linkedin_url.trim(),
                    twitter_username: guest.twitter_username.trim(),
                    website: guest.website.trim(),
                    order: index,
                }))
                .filter((guest) => guest.name || guest.title || guest.bio);

            const sponsors = values.sponsors_data
                .map((sponsor, index) => ({
                    ...sponsor,
                    name: sponsor.name.trim(),
                    website: sponsor.website.trim(),
                    description: sponsor.description.trim(),
                    sponsorship_level: sponsor.sponsorship_level || "gold",
                    order: index,
                }))
                .filter((sponsor) => sponsor.name || sponsor.website || sponsor.description);

            formData.append('title', values.title.trim());
            formData.append('summary', values.summary.trim());
            formData.append('description', values.description.trim());
            appendString('agenda', values.agenda);
            formData.append('category', values.category);
            formData.append('event_type', values.event_type);
            formData.append('start_date', new Date(values.start_date).toISOString());
            formData.append('end_date', new Date(values.end_date).toISOString());
            formData.append('timezone', values.timezone);

            appendString('venue_name', values.venue_name);
            appendString('venue_address', values.venue_address);
            appendString('venue_details', values.venue_details);
            appendString('venue_map_url', values.venue_map_url);

            appendString('virtual_meeting_url', values.virtual_meeting_url);
            appendString('virtual_meeting_password', values.virtual_meeting_password);
            if (values.featured_image && typeof values.featured_image !== 'string') {
                formData.append('featured_image', values.featured_image);
            } else if (values.featured_image_url.trim()) {
                formData.append('featured_image', values.featured_image_url.trim());
            }

            formData.append('contact_email', values.contact_email.trim());
            appendString('contact_phone', values.contact_phone);
            appendString('website_url', values.website_url);
            appendString('facebook_event_url', values.facebook_event_url);
            appendString('livestream_url', values.livestream_url);

            formData.append('registration_required', values.registration_required.toString());
            if (values.registration_required) {
                formData.append('registration_url', values.registration_url.trim());
            }
            if (values.max_attendees) formData.append('max_attendees', values.max_attendees.toString());
            formData.append('allow_waitlist', values.allow_waitlist.toString());
            appendString('registration_instructions', values.registration_instructions);

            formData.append('price', values.price || '0.00');
            appendString('early_bird_price', values.early_bird_price);
            if (values.early_bird_deadline) {
                formData.append('early_bird_deadline', new Date(values.early_bird_deadline).toISOString());
            }

            appendString('cancellation_policy', values.cancellation_policy);
            appendString('covid_safety_measures', values.covid_safety_measures);
            appendString('parking_info', values.parking_info);
            appendString('accessibility_info', values.accessibility_info);

            formData.append('is_featured', values.is_featured.toString());
            formData.append('is_trending', values.is_trending.toString());
            formData.append('status', values.status);

            values.tags_ids.forEach((tagId) => formData.append('tags_ids', tagId));

            if (guests.length > 0) {
                formData.append('featured_guests_data', JSON.stringify(guests));
            }
            if (sponsors.length > 0) {
                formData.append('sponsors_data', JSON.stringify(sponsors));
            }

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
                {({ values, isSubmitting, setFieldValue }) => {
                    const selectedTagSet = new Set(values.tags_ids);
                    const toggleTag = (tagId: string) => {
                        if (selectedTagSet.has(tagId)) {
                            setFieldValue(
                                'tags_ids',
                                values.tags_ids.filter((id) => id !== tagId)
                            );
                            return;
                        }
                        setFieldValue('tags_ids', [...values.tags_ids, tagId]);
                    };

                    return (
                    <Form className="space-y-6">
                        <FormLoader visible={isSubmitting} message={`${isEditMode ? 'Updating' : 'Creating'} your event...`} />

                        {/* Section 1: Basic Info */}
                        <EventBasicInfoSection />

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 2: Category & Tags */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Category & Tags</h2>
                                <p className="small-text text-slate-600">
                                    Pick one category and relevant tags
                                </p>
                            </div>

                            {taxonomyLoading ? (
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="small-text">Loading categories and tags...</span>
                                </div>
                            ) : taxonomyError ? (
                                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                                    <p className="small-text text-red-600">{taxonomyError}</p>
                                </div>
                            ) : (
                                <>
                                    <AppFormField
                                        name="category"
                                        label="Event Category"
                                        type="select"
                                        options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
                                        required
                                        placeholder="Select category"
                                    />

                                    <div className="space-y-2">
                                        <label className="normal-text font-medium text-slate-700">Tags</label>
                                        <div className="flex flex-wrap gap-2 rounded-xl border-2 border-slate-200 p-3">
                                            {tags.map((tag) => {
                                                const selected = selectedTagSet.has(tag.id);
                                                return (
                                                    <button
                                                        key={tag.id}
                                                        type="button"
                                                        onClick={() => toggleTag(tag.id)}
                                                        className={`px-3 py-1.5 rounded-full small-text font-semibold border transition-colors ${
                                                            selected
                                                                ? 'bg-primary text-white border-primary'
                                                                : 'bg-white text-slate-700 border-slate-300 hover:border-primary'
                                                        }`}
                                                    >
                                                        {tag.name}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200"></div>

                        {/* Section 3: Event Details */}
                        <EventDetailsSection />

                        <AppFormField
                            name="timezone"
                            label="Timezone"
                            placeholder="Africa/Accra"
                            required
                        />

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

                        <AppFormField
                            name="early_bird_price"
                            label="Early Bird Price"
                            placeholder="0.00"
                            type="text"
                        />

                        <AppFormField
                            name="early_bird_deadline"
                            label="Early Bird Deadline"
                            type="datetime-local"
                        />

                        <AppFormField
                            name="facebook_event_url"
                            label="Facebook Event URL"
                            placeholder="https://facebook.com/events/..."
                            type="url"
                        />

                        <AppFormField
                            name="livestream_url"
                            label="Livestream URL"
                            placeholder="https://youtube.com/..."
                            type="url"
                        />

                        <AppFormField
                            name="cancellation_policy"
                            label="Cancellation Policy"
                            multiline
                            rows={3}
                        />

                        <AppFormField
                            name="covid_safety_measures"
                            label="COVID Safety Measures"
                            multiline
                            rows={2}
                        />

                        <AppFormField
                            name="parking_info"
                            label="Parking Information"
                            multiline
                            rows={2}
                        />

                        <AppFormField
                            name="accessibility_info"
                            label="Accessibility Information"
                            multiline
                            rows={2}
                        />

                        <AppFormField
                            name="status"
                            label="Publishing Status"
                            type="select"
                            options={[
                                { value: 'draft', label: 'Draft' },
                                { value: 'pending_review', label: 'Pending Review' },
                                { value: 'published', label: 'Published' },
                                { value: 'cancelled', label: 'Cancelled' },
                                { value: 'postponed', label: 'Postponed' },
                                { value: 'completed', label: 'Completed' },
                            ]}
                            required
                            placeholder="Select status"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                                <input
                                    type="checkbox"
                                    checked={values.is_featured}
                                    onChange={(e) => setFieldValue('is_featured', e.target.checked)}
                                    className="w-5 h-5 text-primary border-slate-300 rounded"
                                />
                                <span className="normal-text font-semibold text-slate-900">Feature this event</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                                <input
                                    type="checkbox"
                                    checked={values.is_trending}
                                    onChange={(e) => setFieldValue('is_trending', e.target.checked)}
                                    className="w-5 h-5 text-primary border-slate-300 rounded"
                                />
                                <span className="normal-text font-semibold text-slate-900">Mark as trending</span>
                            </label>
                        </div>

                        <div className="border-t border-slate-200"></div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="big-text-4 font-bold text-slate-900">Featured Guests</h2>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFieldValue('featured_guests_data', [
                                            ...values.featured_guests_data,
                                            {
                                                name: '',
                                                title: '',
                                                bio: '',
                                                linkedin_url: '',
                                                twitter_username: '',
                                                website: '',
                                                order: values.featured_guests_data.length,
                                            },
                                        ])
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:border-primary"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Guest
                                </button>
                            </div>

                            {values.featured_guests_data.map((guest, index) => (
                                <div key={`guest-${index}`} className="rounded-xl border-2 border-slate-200 p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="normal-text font-semibold text-slate-900">Guest #{index + 1}</p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFieldValue(
                                                    'featured_guests_data',
                                                    values.featured_guests_data.filter((_, i) => i !== index)
                                                )
                                            }
                                            className="p-2 rounded-lg hover:bg-slate-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <input
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200"
                                        placeholder="Name*"
                                        value={guest.name}
                                        onChange={(e) => {
                                            const next = [...values.featured_guests_data];
                                            next[index] = { ...next[index], name: e.target.value };
                                            setFieldValue('featured_guests_data', next);
                                        }}
                                    />
                                    <input
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200"
                                        placeholder="Title*"
                                        value={guest.title}
                                        onChange={(e) => {
                                            const next = [...values.featured_guests_data];
                                            next[index] = { ...next[index], title: e.target.value };
                                            setFieldValue('featured_guests_data', next);
                                        }}
                                    />
                                    <textarea
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200"
                                        rows={3}
                                        placeholder="Bio*"
                                        value={guest.bio}
                                        onChange={(e) => {
                                            const next = [...values.featured_guests_data];
                                            next[index] = { ...next[index], bio: e.target.value };
                                            setFieldValue('featured_guests_data', next);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-200"></div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="big-text-4 font-bold text-slate-900">Sponsors</h2>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFieldValue('sponsors_data', [
                                            ...values.sponsors_data,
                                            {
                                                name: '',
                                                website: '',
                                                description: '',
                                                sponsorship_level: '',
                                                order: values.sponsors_data.length,
                                            },
                                        ])
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:border-primary"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Sponsor
                                </button>
                            </div>

                            {values.sponsors_data.map((sponsor, index) => (
                                <div key={`sponsor-${index}`} className="rounded-xl border-2 border-slate-200 p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="normal-text font-semibold text-slate-900">Sponsor #{index + 1}</p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFieldValue(
                                                    'sponsors_data',
                                                    values.sponsors_data.filter((_, i) => i !== index)
                                                )
                                            }
                                            className="p-2 rounded-lg hover:bg-slate-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <input
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200"
                                        placeholder="Sponsor name*"
                                        value={sponsor.name}
                                        onChange={(e) => {
                                            const next = [...values.sponsors_data];
                                            next[index] = { ...next[index], name: e.target.value };
                                            setFieldValue('sponsors_data', next);
                                        }}
                                    />
                                    <input
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200"
                                        placeholder="Website"
                                        value={sponsor.website}
                                        onChange={(e) => {
                                            const next = [...values.sponsors_data];
                                            next[index] = { ...next[index], website: e.target.value };
                                            setFieldValue('sponsors_data', next);
                                        }}
                                    />
                                    <textarea
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200"
                                        rows={2}
                                        placeholder="Description"
                                        value={sponsor.description}
                                        onChange={(e) => {
                                            const next = [...values.sponsors_data];
                                            next[index] = { ...next[index], description: e.target.value };
                                            setFieldValue('sponsors_data', next);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

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
                    );
                }}
            </Formik>
        </div>
    );
};

export default CreateEventForm;
