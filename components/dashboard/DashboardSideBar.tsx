"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, AlertTriangle, Star } from "lucide-react";

import { dashboardSideLinks } from "@/data/static.general";
import { AppButton, Modal } from "@/components";

const DashboardSideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const activeLink = dashboardSideLinks
        .filter((link) => pathname === link.link || pathname.startsWith(link.link + "/"))
        .sort((a, b) => b.link.length - a.link.length)[0];

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                console.log("Logged out successfully");
                router.push("/login");
            } else {
                console.error("Logout failed:", response.status);
                alert("Failed to logout. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    return (
        <>
            <nav
                className="w-60 fixed h-[calc(100vh-2rem)] bg-white rounded-2xl hidden p-2 overflow-hidden md:flex flex-col justify-between shadow-xl border-2 border-slate-200"
                role="navigation"
                aria-label="Dashboard sidebar"
            >
                <div className="flex flex-col gap-2">
                    {/* Ghana Notice Board Branding */}
                    <div className="px-2 py-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-md">
                                <Star className="w-3.5 h-3.5 text-black" />
                            </div>
                            <div>
                                <h2 className="small-text font-bold text-slate-900 leading-tight">
                                    Ghana Notice
                                </h2>
                                <p className="small-text-2 text-slate-500 -mt-0.5">Dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-0.5 flex-1 overflow-y-auto">
                        {dashboardSideLinks.map((link, index) => {
                            const isActive = link.link === activeLink?.link;

                            return (
                                <Link
                                    key={index}
                                    href={link.link}
                                    className={`flex items-center rounded-lg gap-2 px-3 py-2 transition-all duration-300 relative group ${
                                        isActive
                                            ? "bg-linear-to-r from-primary to-primary-100 text-white shadow-md shadow-primary/20"
                                            : "text-slate-700 hover:bg-slate-50 hover:text-primary hover:pl-4"
                                    }`}
                                    aria-current={isActive ? "page" : undefined}
                                    aria-label={`Go to ${link.title}${
                                        isActive ? " (current page)" : ""
                                    }`}
                                >
                                    {/* Active indicator - Ghana flag gold accent */}
                                    {isActive && (
                                        <div
                                            className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-6 bg-secondary rounded-r-full"
                                            aria-hidden="true"
                                        />
                                    )}

                                    <span
                                        className={`text-lg shrink-0 ${
                                            isActive
                                                ? "text-white"
                                                : "text-primary group-hover:text-primary group-hover:scale-110"
                                        } transition-all duration-300`}
                                        aria-hidden="true"
                                    >
                                        {link.icon}
                                    </span>
                                    <span
                                        className={`small-text font-semibold ${
                                            isActive ? "text-white" : "group-hover:text-primary"
                                        }`}
                                    >
                                        {link.title}
                                    </span>

                                    {isActive && <span className="sr-only"> (current page)</span>}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer section - logout with Ghana colors */}
                <div className="border-t border-slate-100 pt-2 mt-2">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent hover:bg-accent-100 text-white font-semibold small-text transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                        aria-label="Logout from dashboard"
                        title="Logout"
                        type="button"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Confirm Logout"
                size="sm"
                footer={
                    <>
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            disabled={isLoggingOut}
                            className="px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-100 transition-all duration-300 font-semibold small-text disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-100 text-white transition-all duration-300 font-semibold small-text disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
                            type="button"
                        >
                            {isLoggingOut ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Logging out...
                                </>
                            ) : (
                                <>
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </>
                            )}
                        </button>
                    </>
                }
            >
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="big-text-5 text-slate-900 font-semibold mb-1">
                            Are you sure you want to logout?
                        </p>
                        <p className="small-text text-slate-600">
                            You will need to login again to access your dashboard.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DashboardSideBar;