'use client';

import React from 'react';
import { AppFormField } from '@/components';

const EventDetailsSection = () => {

    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Event Details</h2>
                <p className="small-text text-slate-600">
                    Specify the type and timing of your event
                </p>
            </div>

            <AppFormField
                name="event_type"
                label="Event Type"
                type="select"
                options={[
                    { value: 'in-person', label: 'In-Person' },
                    { value: 'virtual', label: 'Virtual' },
                    { value: 'hybrid', label: 'Hybrid' }
                ]}
                required
                placeholder="Select event type"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AppFormField
                    name="start_date"
                    label="Start Date & Time"
                    type="datetime-local"
                    required
                />

                <AppFormField
                    name="end_date"
                    label="End Date & Time"
                    type="datetime-local"
                    required
                />
            </div>
        </div>
    );
};

export default EventDetailsSection;
