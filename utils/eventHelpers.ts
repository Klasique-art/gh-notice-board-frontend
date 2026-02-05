// utils/eventHelpers.ts

export function getDaysUntilEvent(startDate: string): number | null {
    const now = new Date();
    const eventStart = new Date(startDate);
    
    if (eventStart <= now) return null;
    
    const diffTime = eventStart.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

export function isUpcoming(startDate: string): boolean {
    return new Date(startDate) > new Date();
}

export function isOngoing(startDate: string, endDate: string): boolean {
    const now = new Date();
    return new Date(startDate) <= now && new Date(endDate) >= now;
}

export function isPast(endDate: string): boolean {
    return new Date(endDate) < new Date();
}