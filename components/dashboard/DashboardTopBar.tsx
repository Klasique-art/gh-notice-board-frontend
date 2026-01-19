"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardSideLinks } from "@/data/static.general";
import { CurrentUser } from "@/types/general.types";
import { ProfileCard } from "@/components";

type Props = {
    user: CurrentUser | null;
};

const DashboardTopBar: React.FC<Props> = ({ user }) => {
    const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const activeLink = dashboardSideLinks
        .filter((link) => pathname === link.link || pathname.startsWith(link.link + "/"))
        .sort((a, b) => b.link.length - a.link.length)[0];

    // Close menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShowNavMenu(false);
            }
        };

        if (showNavMenu) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showNavMenu]);

    // Focus trap for mobile menu
    useEffect(() => {
        if (!showNavMenu || !navRef.current) return;

        const focusableElements = navRef.current.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        document.addEventListener("keydown", trapFocus);
        firstEl?.focus();

        return () => {
            document.removeEventListener("keydown", trapFocus);
        };
    }, [showNavMenu]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (showNavMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showNavMenu]);

    return (
        <>
            <nav
                className="w-full md:w-[calc(100%-1rem)] md:ml-4 py-2 px-3 sm:px-4 bg-white rounded-2xl shadow-lg border-2 border-slate-200"
                aria-label="Top navigation"
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button
                            className="md:hidden text-2xl bg-primary hover:bg-primary-100 duration-300 rounded-xl p-2 text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-md hover:shadow-lg transition-all hover:scale-105"
                            onClick={() => setShowNavMenu(true)}
                            aria-label="Open main menu"
                            aria-expanded={showNavMenu}
                            aria-controls="mobile-navigation"
                            type="button"
                        >
                            <Menu className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <div>
                            <h1 className="big-text-5 font-bold text-slate-900 leading-tight">
                                {activeLink?.title || "Dashboard"}
                            </h1>
                            <p className="small-text-2 text-slate-500 -mt-0.5">
                                Welcome back, {user?.first_name}!
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ProfileCard user={user} />
                    </div>
                </div>
            </nav>

            {/* Mobile Nav Menu Overlay */}
            {showNavMenu && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9998"
                    onClick={() => setShowNavMenu(false)}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Nav Menu */}
            <nav
                id="mobile-navigation"
                ref={navRef}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                className={`w-full max-w-sm fixed z-9999 top-0 left-0 h-screen bg-white duration-300 overflow-auto shadow-2xl border-r-2 border-slate-200 ${
                    showNavMenu ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-3 flex justify-between items-center border-b border-slate-100 bg-linear-to-r from-primary/5 to-secondary/5">
                    <div>
                        <h2 className="big-text-5 font-bold text-slate-900 leading-tight">Menu</h2>
                        <p className="small-text-2 text-slate-600 -mt-0.5">Ghana Notice Board</p>
                    </div>
                    <button
                        onClick={() => setShowNavMenu(false)}
                        className="text-2xl text-slate-600 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-xl p-1.5 transition-all duration-300 hover:bg-accent/10"
                        aria-label="Close navigation menu"
                        type="button"
                    >
                        <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>

                <ul className="py-2 px-2 space-y-0.5">
                    {dashboardSideLinks.map((link, index) => {
                        const isActive = link.link === activeLink?.link;

                        return (
                            <li key={index}>
                                <Link
                                    href={link.link}
                                    className={`px-3 py-2 rounded-lg duration-300 flex items-center gap-2 w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all ${
                                        isActive
                                            ? "bg-linear-to-r from-primary to-primary-100 text-white shadow-md"
                                            : "text-slate-700 hover:bg-slate-50 hover:text-primary border border-transparent hover:border-primary/20"
                                    }`}
                                    onClick={() => setShowNavMenu(false)}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <span
                                        className={`text-lg shrink-0 ${
                                            isActive ? "text-white" : "text-primary"
                                        }`}
                                        aria-hidden="true"
                                    >
                                        {link.icon}
                                    </span>
                                    <span className="font-semibold small-text">
                                        {link.title}
                                    </span>
                                    {isActive && <span className="sr-only"> (current page)</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Footer in mobile menu */}
                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-100 bg-linear-to-r from-primary/5 to-secondary/5">
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse delay-75" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse delay-150" />
                    </div>
                    <p className="small-text-2 text-slate-600 font-medium leading-tight">
                        Ghana Notice Board Dashboard
                    </p>
                    <p className="small-text-2 text-slate-500 -mt-0.5">Connecting Ghanaians Worldwide</p>
                </div>
            </nav>
        </>
    );
};

export default DashboardTopBar;