import Image from "next/image";
import { Camera, MapPin, Calendar, Briefcase, Link as LinkIcon } from "lucide-react";
import { CurrentUser } from "@/types/general.types";
import { AppButton } from "@/components";

interface ProfileHeaderProps {
    user: CurrentUser;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-md">
            {/* Cover Image */}
            <div className="relative h-32 sm:h-48 bg-linear-to-r from-primary to-primary-100">
                {user.cover_image ? (
                    <Image
                        src={user.cover_image}
                        alt="Cover"
                        fill
                        className="object-cover"
                    />
                ) : null}

                {/* Edit Cover Button */}
                <button
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors normal-text-2 font-medium"
                    aria-label="Change cover photo"
                >
                    <Camera className="w-4 h-4" />
                    <span className="hidden sm:inline">Change Cover</span>
                </button>
            </div>

            {/* Profile Info */}
            <div className="px-4 sm:px-6 pb-6">
                {/* Avatar */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-16">
                    <div className="flex items-end gap-4">
                        <div className="relative">
                            <Image
                                src={user.avatar || "https://i.pravatar.cc/300"}
                                alt={user.full_name}
                                width={120}
                                height={120}
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                            />
                            {user.is_verified && (
                                <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-4 border-white shadow-md">
                                    <span className="text-black text-sm font-bold">{user.verification_badge}</span>
                                </div>
                            )}

                            {/* Edit Avatar Button */}
                            <button
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-200 hover:border-primary p-2 rounded-full shadow-md transition-colors"
                                aria-label="Change profile photo"
                            >
                                <Camera className="w-4 h-4 text-slate-700" />
                            </button>
                        </div>
                    </div>

                    <AppButton
                        url="/dashboard/profile/edit"
                        title="Edit Profile"
                        variant="primary"
                        size="md"
                    />
                </div>

                {/* User Details */}
                <div className="mt-4 space-y-3">
                    {/* Name & Username */}
                    <div>
                        <h1 className="big-text-3 font-bold text-slate-900 flex items-center gap-2">
                            {user.display_name}
                        </h1>
                        <p className="normal-text text-slate-600">@{user.username}</p>
                    </div>

                    {/* Bio */}
                    {user.bio && (
                        <p className="normal-text text-slate-700 max-w-2xl">
                            {user.bio}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 normal-text-2 text-slate-600">
                        {user.profile.occupation && user.profile.company && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                <span>{user.profile.occupation} at {user.profile.company}</span>
                            </div>
                        )}

                        {user.location && user.profile.show_location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{user.location}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        {user.website && (
                            <a
                                href={user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:text-primary-100 normal-text-2 font-medium"
                            >
                                <LinkIcon className="w-4 h-4" />
                                Website
                            </a>
                        )}
                        {user.twitter_username && (
                            <a
                                href={`https://twitter.com/${user.twitter_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:text-primary-100 normal-text-2 font-medium"
                            >
                                Twitter
                            </a>
                        )}
                        {user.linkedin_url && (
                            <a
                                href={user.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:text-primary-100 normal-text-2 font-medium"
                            >
                                LinkedIn
                            </a>
                        )}
                        {user.github_username && (
                            <a
                                href={`https://github.com/${user.github_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:text-primary-100 normal-text-2 font-medium"
                            >
                                GitHub
                            </a>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 pt-3 border-t border-slate-200">
                        <div>
                            <span className="big-text-5 font-bold text-slate-900">{user.posts_count}</span>
                            <span className="normal-text-2 text-slate-600 ml-1">Posts</span>
                        </div>
                        <div>
                            <span className="big-text-5 font-bold text-slate-900">{user.followers_count.toLocaleString()}</span>
                            <span className="normal-text-2 text-slate-600 ml-1">Followers</span>
                        </div>
                        <div>
                            <span className="big-text-5 font-bold text-slate-900">{user.following_count.toLocaleString()}</span>
                            <span className="normal-text-2 text-slate-600 ml-1">Following</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;