'use client';

import React from 'react';
import { useFormikContext } from 'formik';
import { EventFormValues } from '@/data/eventSchema';
import { ImageUpload } from '@/components';

const EventMediaSection = () => {
    const { setFieldValue, values } = useFormikContext<EventFormValues>();

    const handleImageChange = (base64Image: string | null) => {
        // Convert base64 to File object for form submission
        if (base64Image) {
            fetch(base64Image)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'featured-image.jpg', { type: 'image/jpeg' });
                    setFieldValue('featured_image', file);
                });
        } else {
            setFieldValue('featured_image', null);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="big-text-4 font-bold text-slate-900 mb-1">Event Media</h2>
                <p className="small-text text-slate-600">
                    Upload an eye-catching featured image for your event
                </p>
            </div>

            <ImageUpload
                label="Featured Image"
                name="featured_image"
                onImageChange={handleImageChange}
                currentImage={
                    values.featured_image
                        ? typeof values.featured_image === 'string'
                            ? values.featured_image
                            : URL.createObjectURL(values.featured_image)
                        : null
                }
                helperText="Recommended size: 1200x675px (16:9 ratio). Max file size: 5MB"
                required
            />
        </div>
    );
};

export default EventMediaSection;

