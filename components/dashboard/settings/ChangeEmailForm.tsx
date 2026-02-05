"use client";

import { useState } from "react";
import * as Yup from "yup";
import { Mail, CheckCircle, Info, Eye, EyeOff } from "lucide-react";
import {
    AppForm,
    AppFormField,
    AppErrorMessage,
    SubmitButton,
    FormLoader,
} from "@/components";

const ChangeEmailValidationSchema = Yup.object().shape({
    newEmail: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email address"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

type ChangeEmailFormValues = {
    newEmail: string;
    password: string;
};

interface ChangeEmailFormProps {
    currentEmail: string;
}

const ChangeEmailForm = ({ currentEmail }: ChangeEmailFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [verificationSent, setVerificationSent] = useState(false);
    const [maskedEmail, setMaskedEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (
        values: ChangeEmailFormValues,
        { resetForm }: any
    ) => {
        setLoading(true);
        setError("");
        setVerificationSent(false);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock validation
            if (values.password !== "Password123") {
                throw new Error("Password is incorrect");
            }

            if (values.newEmail === currentEmail) {
                throw new Error("New email must be different from current email");
            }

            console.log("Email change request:", values);

            // Mask email
            const masked = values.newEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3");
            setMaskedEmail(masked);
            setVerificationSent(true);
            resetForm();
        } catch (err: any) {
            setError(
                err.message || "Failed to send verification link. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-4 font-bold text-slate-900">
                        Change Email Address
                    </h2>
                    <p className="small-text text-slate-600">Update your account email</p>
                </div>
            </div>

            {!verificationSent ? (
                <>
                    <AppErrorMessage visible={!!error} error={error} />

                    {/* Current Email Display */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg border-2 border-slate-200">
                        <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-slate-600" aria-hidden="true" />
                            <div>
                                <p className="small-text text-slate-600">Current email:</p>
                                <p className="normal-text-2 font-semibold text-slate-900">
                                    {currentEmail}
                                </p>
                            </div>
                        </div>
                    </div>

                    <AppForm
                        initialValues={{
                            newEmail: "",
                            password: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={ChangeEmailValidationSchema}
                    >
                        <FormLoader visible={loading} message="Sending verification..." />

                        <div className="space-y-4">
                            {/* New Email */}
                            <AppFormField
                                name="newEmail"
                                label="New Email Address"
                                type="email"
                                placeholder="Enter new email address"
                                required
                            />

                            {/* Password */}
                            <div className="relative">
                                <AppFormField
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            <SubmitButton title="Send Verification Email" />
                        </div>
                    </AppForm>
                </>
            ) : (
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-start gap-3">
                        <CheckCircle
                            className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                            aria-hidden="true"
                        />
                        <div>
                            <p className="normal-text font-semibold text-green-900 mb-2">
                                Verification Email Sent!
                            </p>
                            <p className="small-text text-green-800">
                                We&apos;ve sent a verification link to{" "}
                                <strong>{maskedEmail}</strong>. Please check your inbox and
                                click the link to confirm your new email address.
                            </p>
                            <button
                                onClick={() => setVerificationSent(false)}
                                className="mt-3 text-primary hover:text-primary-100 font-medium small-text"
                            >
                                Send to a different email
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeEmailForm;