'use client';

import React from 'react';
import { useFormikContext } from 'formik';
import { EventFormValues } from '@/data/eventSchema';
import { AppFormField } from '@/components';

const EventPricingSection = () => {
    const { values, setFieldValue } = useFormikContext<EventFormValues>();

    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Pricing</h2>
                <p className="small-text text-slate-600">
                    Set the ticket price for your event
                </p>
            </div>

            {/* Free Event Toggle */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                <input
                    type="checkbox"
                    id="is_free"
                    name="is_free"
                    checked={values.is_free}
                    onChange={(e) => {
                        const isFree = e.target.checked;
                        setFieldValue('is_free', isFree);
                        if (isFree) {
                            setFieldValue('price', '0.00');
                        }
                    }}
                    className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                />
                <label htmlFor="is_free" className="normal-text font-semibold text-slate-900 cursor-pointer">
                    This is a free event
                </label>
            </div>

            {!values.is_free && (
                <AppFormField
                    name="price"
                    label="Ticket Price (GHS)"
                    placeholder="50.00"
                    type="text"
                    required
                />
            )}

            {values.is_free && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="normal-text text-emerald-700 font-semibold">
                        ✓ Free Event - No payment required
                    </p>
                </div>
            )}
        </div>
    );
};

export default EventPricingSection;
