import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CreateEventForm } from '@/components';

export const metadata = {
    title: 'Create Event | Ghana Notice Board',
    description: 'Create and publish your event on Ghana Notice Board',
};

const CreateEventPage = () => {
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
                            Create New Event
                        </h1>
                        <p className="normal-text text-slate-600">
                            Fill in the details below to create your event
                        </p>
                    </div>
                </div>

                {/* Form */}
                <CreateEventForm />
            </div>
        </main>
    );
};

export default CreateEventPage;
