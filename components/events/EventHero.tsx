import { Calendar } from "lucide-react";
import {Section} from "@/components";

const EventHero = () => {
    return (
        <Section
            sectionStyles="relative bg-gradient-to-br !py-16 from-primary/5 via-white to-secondary/5 overflow-hidden"
            containerStyles="opacity-100"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary" />
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-secondary" />
            </div>

            {/* Content */}
            <div className="relative text-center space-y-4 pt-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                    <Calendar className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h1 className="massive-text font-extrabold text-slate-900 leading-tight">
                    Upcoming{" "}
                    <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                        Events
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="big-text-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Discover conferences, workshops, cultural celebrations, and networking
                    opportunities across Ghana and the diaspora
                </p>
            </div>
        </Section>
    );
};

export default EventHero;