'use client';

import React from 'react';
import { useFormikContext } from 'formik';
import { EventFormValues } from '@/data/eventSchema';
import { AppFormField } from '@/components';

const EventVenueSection = () => {
    const { values } = useFormikContext<EventFormValues>();

    // Only show venue fields for in-person or hybrid events
    if (values.event_type !== 'in-person' && values.event_type !== 'hybrid') {
        return null;
    }

    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Venue Information</h2>
                <p className="small-text text-slate-600">
                    Provide details about the event location
                </p>
            </div>

            <AppFormField
                name="venue_name"
                label="Venue Name"
                placeholder="e.g., Accra International Conference Centre"
                required
            />

            <AppFormField
                name="venue_address"
                label="Venue Address"
                placeholder="e.g., Liberation Road, Accra, Ghana"
                required
            />

            <AppFormField
                name="venue_details"
                label="Additional Venue Details"
                placeholder="e.g., Main auditorium, 3rd floor"
                multiline
                rows={3}
            />

            <AppFormField
                name="venue_map_url"
                label="Map URL"
                placeholder="https://maps.google.com/..."
                type="url"
            />
        </div>
    );
};

export default EventVenueSection;
