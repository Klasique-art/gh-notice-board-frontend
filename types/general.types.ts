import { ReactElement } from "react";
import { LucideIcon } from "lucide-react";

export interface NavLink {
    id: number;
    name: string;
    url: string;
    icon: ReactElement;
}

export interface EventCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    event_count: number;
}

export interface UserProfile {
    occupation: string;
    company: string;
    skills: string[];
    interests: string[];
    show_email: boolean;
    show_location: boolean;
    allow_messages: boolean;
    theme: 'light' | 'dark' | 'auto';
    language: 'en' | 'tw' | 'ga' | 'ee';
    created_at: string;
    updated_at: string;
}

export interface CurrentUser {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    display_name: string;
    bio: string;
    location: string;
    website: string;
    twitter_username: string;
    linkedin_url: string;
    github_username: string;
    avatar: string | null;
    cover_image: string | null;
    is_public: boolean;
    email_notifications: boolean;
    push_notifications: boolean;
    followers_count: number;
    following_count: number;
    posts_count: number;
    is_verified: boolean;
    verification_badge: string;
    user_type: 'regular' | 'journalist' | 'organization' | 'government' | 'verified';
    is_following: boolean;
    created_at: string;
    updated_at: string;
    last_seen: string | null;
    profile: UserProfile;
}


export interface ProfileMenuItem {
    label: string;
    icon: ReactElement;
    link: string | null;
    isLogout?: boolean;
}

export type DashboardSideLink = {
    id: number;
    title: string;
    link: string;
    icon: ReactElement;
}

export interface PolicySection {
    id: number;
    title: string;
    content: string[];
}

export interface TermSection {
    id: number;
    title: string;
    content: string[];
    subsections?: {
        title: string;
        content: string[];
    }[];
}

export type Category = {
    id: number;
    name: string;
    slug: string;
    icon: LucideIcon;
    description?: string;
    color?: string;
    textColor?: string;
};
