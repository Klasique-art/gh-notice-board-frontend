import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    DiasporaContentType,
    DiasporaRegion,
    DiasporaSortOption,
} from "@/types/diaspora.types";

export const useDiasporaFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL params
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [contentTypes, setContentTypes] = useState<DiasporaContentType[]>(
        searchParams.get("types")?.split(",").filter(Boolean) as DiasporaContentType[] || []
    );
    const [region, setRegion] = useState<DiasporaRegion | "">(
        (searchParams.get("region") as DiasporaRegion) || ""
    );
    const [isFeatured, setIsFeatured] = useState(
        searchParams.get("featured") === "true"
    );
    const [isUrgent, setIsUrgent] = useState(
        searchParams.get("urgent") === "true"
    );
    const [sortBy, setSortBy] = useState<DiasporaSortOption>(
        (searchParams.get("sort") as DiasporaSortOption) || "-published_at"
    );

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (contentTypes.length > 0) params.set("types", contentTypes.join(","));
        if (region) params.set("region", region);
        if (isFeatured) params.set("featured", "true");
        if (isUrgent) params.set("urgent", "true");
        if (sortBy !== "-published_at") params.set("sort", sortBy);

        const queryString = params.toString();
        router.replace(queryString ? `/diaspora?${queryString}` : "/diaspora", {
            scroll: false,
        });
    }, [search, contentTypes, region, isFeatured, isUrgent, sortBy, router]);

    const clearFilters = () => {
        setSearch("");
        setContentTypes([]);
        setRegion("");
        setIsFeatured(false);
        setIsUrgent(false);
    };

    const hasActiveFilters = () => {
        return (
            search !== "" ||
            contentTypes.length > 0 ||
            region !== "" ||
            isFeatured ||
            isUrgent
        );
    };

    return {
        search,
        setSearch,
        contentTypes,
        setContentTypes,
        region,
        setRegion,
        isFeatured,
        setIsFeatured,
        isUrgent,
        setIsUrgent,
        sortBy,
        setSortBy,
        clearFilters,
        hasActiveFilters,
    };
};