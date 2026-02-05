"use client";

import { useState } from "react";
import * as Yup from "yup";
import { Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import {
    AppForm,
    AppFormField,
    AppErrorMessage,
    SubmitButton,
    FormLoader,
} from "@/components";

const ChangePasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Current password is required"),
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain uppercase, lowercase, and number"
        )
        .required("New password is required"),
    confirmPassword: Yup.string()
        .required("Please confirm your new password")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

type ChangePasswordFormValues = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (
        values: ChangePasswordFormValues,
        { resetForm }: any
    ) => {
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock validation
            if (values.currentPassword !== "Password123") {
                throw new Error("Current password is incorrect");
            }

            console.log("Password change:", values);
            setSuccess(true);
            resetForm();
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to change password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-slate-900">
                        Change Password
                    </h2>
                    <p className="small-text text-slate-600">
                        Update your account password
                    </p>
                </div>
            </div>

            <AppErrorMessage visible={!!error} error={error} />

            {success && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-center gap-2">
                        <CheckCircle
                            className="w-4 h-4 text-green-600"
                            aria-hidden="true"
                        />
                        <p className="small-text text-green-800 font-medium">
                            Password changed successfully!
                        </p>
                    </div>
                </div>
            )}

            <AppForm
                initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={ChangePasswordValidationSchema}
            >
                <FormLoader visible={loading} message="Changing password..." />

                <div className="space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                        <AppFormField
                            name="currentPassword"
                            label="Current Password"
                            type={showCurrent ? "text" : "password"}
                            placeholder="Enter current password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600"
                            aria-label={showCurrent ? "Hide password" : "Show password"}
                        >
                            {showCurrent ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <AppFormField
                            name="newPassword"
                            label="New Password"
                            type={showNew ? "text" : "password"}
                            placeholder="Enter new password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600"
                            aria-label={showNew ? "Hide password" : "Show password"}
                        >
                            {showNew ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Confirm New Password */}
                    <div className="relative">
                        <AppFormField
                            name="confirmPassword"
                            label="Confirm New Password"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600"
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                        >
                            {showConfirm ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    <SubmitButton title="Change Password" />
                </div>
            </AppForm>
        </div>
    );
};

export default ChangePasswordForm;