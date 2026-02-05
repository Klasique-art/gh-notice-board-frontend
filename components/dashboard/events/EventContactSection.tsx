'use client';

import React from 'react';
import { AppFormField } from '@/components';

const EventContactSection = () => {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Contact Information</h2>
                <p className="small-text text-slate-600">
                    How can attendees reach you for questions?
                </p>
            </div>

            <AppFormField
                name="contact_email"
                label="Contact Email"
                placeholder="events@example.com"
                type="email"
                required
            />

            <AppFormField
                name="contact_phone"
                label="Contact Phone"
                placeholder="+233 24 123 4567"
                type="tel"
            />

            <AppFormField
                name="website_url"
                label="Event Website"
                placeholder="https://example.com"
                type="url"
            />
        </div>
    );
};

export default EventContactSection;
