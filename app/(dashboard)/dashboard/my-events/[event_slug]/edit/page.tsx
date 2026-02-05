'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { CreateEventForm } from '@/components';
import { EventFormValues } from '@/data/eventSchema';

const EditEventPage = () => {
    const params = useParams();
    const router = useRouter();
    const eventSlug = params.event_slug as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [eventData, setEventData] = useState<Partial<EventFormValues> | null>(null);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`/api/events/${eventSlug}`);
                const data = await response.json();

                console.log("fetched event data", data);

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch event data');
                }

                // Transform API data to match form structure
                const formData: Partial<EventFormValues> = {
                    title: data.title || '',
                    summary: data.summary || '',
                    description: data.description || '',
                    agenda: data.agenda || '',
                    category: data.category || '',
                    event_type: data.event_type || '',
                    start_date: data.start_date ? new Date(data.start_date).toISOString().slice(0, 16) : '',
                    end_date: data.end_date ? new Date(data.end_date).toISOString().slice(0, 16) : '',
                    venue_name: data.venue_name || '',
                    venue_address: data.venue_address || '',
                    venue_details: data.venue_details || '',
                    venue_map_url: data.venue_map_url || '',
                    featured_image: data.featured_image || null,
                    contact_email: data.contact_email || '',
                    contact_phone: data.contact_phone || '',
                    website_url: data.website_url || '',
                    registration_required: data.registration_required || false,
                    registration_url: data.registration_url || '',
                    registration_deadline: data.registration_deadline
                        ? new Date(data.registration_deadline).toISOString().slice(0, 16)
                        : '',
                    max_attendees: data.max_attendees || '',
                    allow_waitlist: data.allow_waitlist || false,
                    registration_instructions: data.registration_instructions || '',
                    price: data.price || '',
                    is_free: data.is_free ?? true,
                };

                setEventData(formData);
            } catch (err) {
                console.error('Error fetching event:', err);
                setError(err instanceof Error ? err.message : 'Failed to load event data');
            } finally {
                setLoading(false);
            }
        };

        if (eventSlug) {
            fetchEventData();
        }
    }, [eventSlug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50">
                <div className="inner-wrapper py-8">
                    <div className="flex items-center justify-center min-h-100">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                            <p className="big-text-4 text-slate-600">Loading event data...</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !eventData) {
        return (
            <main className="min-h-screen bg-slate-50">
                <div className="inner-wrapper py-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h2 className="big-text-4 font-bold text-red-900 mb-2">
                                        Failed to Load Event
                                    </h2>
                                    <p className="normal-text text-red-700 mb-4">
                                        {error || 'Event not found or you do not have permission to edit it.'}
                                    </p>
                                    <button
                                        onClick={() => router.push('/dashboard/my-events')}
                                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                    >
                                        Back to My Events
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="inner-wrapper space-y-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/my-events"
                        className="w-10 h-10 rounded-lg bg-primary hover:bg-primary-100 flex items-center justify-center transition-colors border-2 border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Back to My Events"
                    >
                        <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
                    </Link>
                    <div>
                        <h1 className="big-text-1 font-bold text-slate-900">
                            Edit Event
                        </h1>
                        <p className="normal-text text-slate-600">
                            Update your event details below
                        </p>
                    </div>
                </div>

                {/* Form */}
                <CreateEventForm eventSlug={eventSlug} initialData={eventData} />
            </div>
        </main>
    );
};

export default EditEventPage;