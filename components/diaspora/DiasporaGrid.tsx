"use client";

import { useEffect, useRef } from "react";
import { DiasporaPost } from "@/types/diaspora.types";
import DiasporaCard from "./DiasporaCard";
import { Loader2 } from "lucide-react";

interface DiasporaGridProps {
    posts: DiasporaPost[];
    isLoading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
}

const DiasporaGrid = ({
    posts,
    isLoading = false,
    hasMore = false,
    onLoadMore,
}: DiasporaGridProps) => {
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!observerTarget.current || !onLoadMore || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(observerTarget.current);

        return () => observer.disconnect();
    }, [onLoadMore, hasMore, isLoading]);

    return (
        <div className="space-y-6">
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <DiasporaCard key={post.id} post={post} index={index} />
                ))}
            </div>

            {/* Loading Indicator */}
            {isLoading && (
                <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && !isLoading && <div ref={observerTarget} className="h-4" />}
        </div>
    );
};

export default DiasporaGrid;