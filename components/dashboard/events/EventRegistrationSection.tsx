'use client';

import React from 'react';
import { useFormikContext } from 'formik';
import { EventFormValues } from '@/data/eventSchema';
import { AppFormField, DateInput } from '@/components';

const EventRegistrationSection = () => {
    const { values, setFieldValue } = useFormikContext<EventFormValues>();

    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Registration Settings</h2>
                <p className="small-text text-slate-600">
                    Configure how attendees can register for your event
                </p>
            </div>

            {/* Registration Required Toggle */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                <input
                    type="checkbox"
                    id="registration_required"
                    name="registration_required"
                    checked={values.registration_required}
                    onChange={(e) => setFieldValue('registration_required', e.target.checked)}
                    className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                />
                <label htmlFor="registration_required" className="normal-text font-semibold text-slate-900 cursor-pointer">
                    Require registration/ ticket purchase for this event
                </label>
            </div>

            {values.registration_required && (
                <>
                    <AppFormField
                        name="registration_url"
                        label="Registration URL"
                        placeholder="https://cafatickets.com/..."
                        type="url"
                    />

                    <AppFormField
                        name="registration_deadline"
                        label="Registration Deadline"
                        type="datetime-local"
                    />

                    <AppFormField
                        name="max_attendees"
                        label="Maximum Attendees"
                        placeholder="0 for unlimited"
                        type="number"
                    />

                    {/* Allow Waitlist Toggle */}
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                        <input
                            type="checkbox"
                            id="allow_waitlist"
                            name="allow_waitlist"
                            checked={values.allow_waitlist}
                            onChange={(e) => setFieldValue('allow_waitlist', e.target.checked)}
                            className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                        />
                        <label htmlFor="allow_waitlist" className="normal-text font-semibold text-slate-900 cursor-pointer">
                            Allow waitlist when event is full
                        </label>
                    </div>

                    <AppFormField
                        name="registration_instructions"
                        label="Registration Instructions"
                        placeholder="Please bring ID for check-in..."
                        multiline
                        rows={4}
                    />
                </>
            )}
        </div>
    );
};

export default EventRegistrationSection;
