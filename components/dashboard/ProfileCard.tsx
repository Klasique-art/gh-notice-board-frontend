import React from "react";
import Image from "next/image";
import { placeholderImage } from "@/data/constants";
import { CurrentUser } from "@/types/general.types";

type Props = {
    user: CurrentUser | null;
};

const ProfileCard: React.FC<Props> = ({ user }) => {
    return (
        <div
            tabIndex={0}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1 hover:bg-slate-50 transition-all duration-300 cursor-pointer group"
            role="region"
            aria-label={`User profile: ${user?.username}`}
        >
            <div className="relative">
                <Image
                    src={user?.avatar || placeholderImage}
                    alt={`${user?.full_name}'s profile picture`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow-md bg-white group-hover:border-secondary transition-all duration-300"
                    draggable={false}
                />
                {user?.is_verified && (
                    <div
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary flex items-center justify-center border-2 border-white shadow-sm"
                        title="Verified User"
                    >
                        <span className="text-black text-[10px] font-bold">
                            {user.verification_badge}
                        </span>
                    </div>
                )}
            </div>
            <div className="hidden md:block">
                <div className="flex items-center gap-1">
                    <h3 className="small-text font-bold truncate text-slate-900 max-w-30 group-hover:text-primary transition-colors leading-tight">
                        {user?.display_name || user?.full_name}
                    </h3>
                </div>
                <p className="small-text-2 text-slate-500 truncate max-w-30 -mt-0.5">
                    @{user?.username}
                </p>
            </div>
        </div>
    );
};

export default ProfileCard;