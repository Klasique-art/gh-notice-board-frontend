'use client';

import React from 'react';
import { AppFormField } from '@/components';

const EventBasicInfoSection = () => {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Basic Information</h2>
                <p className="small-text text-slate-600">
                    Provide the essential details about your event
                </p>
            </div>

            <AppFormField
                name="title"
                label="Event Title"
                placeholder="e.g., Ghana Tech Summit 2024"
                required
            />

            <AppFormField
                name="summary"
                label="Short Summary"
                placeholder="Brief description of your event (20-500 characters)"
                multiline
                rows={3}
                required
            />

            <AppFormField
                name="description"
                label="Full Description"
                placeholder="Provide a detailed description of your event..."
                multiline
                rows={6}
                required
            />

            <AppFormField
                name="agenda"
                label="Event Agenda"
                placeholder="9:00 AM - Registration&#10;10:00 AM - Keynote&#10;12:00 PM - Lunch..."
                multiline
                rows={5}
            />
        </div>
    );
};

export default EventBasicInfoSection;
