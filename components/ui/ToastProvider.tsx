"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";

type ToastTone = "success" | "error" | "info";

type ToastInput = {
    title: string;
    description?: string;
    tone?: ToastTone;
    durationMs?: number;
};

type ToastItem = ToastInput & {
    id: number;
    tone: ToastTone;
};

type ToastContextValue = {
    showToast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneStyles: Record<ToastTone, string> = {
    success:
        "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-emerald-900",
    error:
        "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-rose-100 text-rose-900",
    info:
        "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-900",
};

const toneIcon = {
    success: CheckCircle2,
    error: CircleAlert,
    info: Info,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const dismiss = useCallback((id: number) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(
        ({ title, description, tone = "success", durationMs = 4200 }: ToastInput) => {
            const id = Date.now() + Math.floor(Math.random() * 1000);
            const nextToast: ToastItem = {
                id,
                title,
                description,
                tone,
                durationMs,
            };
            setToasts((current) => [...current, nextToast]);

            window.setTimeout(() => {
                dismiss(id);
            }, durationMs);
        },
        [dismiss]
    );

    const value = useMemo(
        () => ({
            showToast,
        }),
        [showToast]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                className="fixed top-4 right-4 z-[100] flex w-[min(92vw,28rem)] flex-col gap-3"
                aria-live="polite"
                aria-relevant="additions text"
            >
                {toasts.map((toast) => {
                    const Icon = toneIcon[toast.tone];
                    return (
                        <div
                            key={toast.id}
                            role={toast.tone === "error" ? "alert" : "status"}
                            className={`rounded-xl border p-4 shadow-lg backdrop-blur-sm ${toneStyles[toast.tone]}`}
                        >
                            <div className="flex items-start gap-3">
                                <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold leading-5">{toast.title}</p>
                                    {toast.description && (
                                        <p className="mt-1 text-sm opacity-90">{toast.description}</p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => dismiss(toast.id)}
                                    className="rounded-md p-1.5 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current"
                                    aria-label="Dismiss notification"
                                >
                                    <X className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextValue {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider.");
    }
    return context;
}
