'use client';

import React, { useEffect, useState } from 'react';
import { EventCategory } from '@/types/events.types';
import { AppFormField } from '@/components';

const EventCategorySection = () => {
    const [categories, setCategories] = useState<EventCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories', {
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                const rawCategories = Array.isArray(data) ? data : data.results || [];
                const activeCategories = rawCategories.filter(
                    (cat: EventCategory) => cat.is_active !== false
                );
                setCategories(activeCategories);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Category</h2>
                <p className="small-text text-slate-600">
                    Choose the category that best describes your event
                </p>
            </div>

            {loading ? (
                <div className="p-4 bg-slate-100 rounded-xl text-center">
                    <p className="normal-text text-slate-600">Loading categories...</p>
                </div>
            ) : error ? (
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="normal-text text-red-600">{error}</p>
                </div>
            ) : (
                <AppFormField
                    name="category"
                    label="Event Category"
                    type="select"
                    options={categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))}
                    required
                    placeholder="Select a category"
                />
            )}
        </div>
    );
};

export default EventCategorySection;
