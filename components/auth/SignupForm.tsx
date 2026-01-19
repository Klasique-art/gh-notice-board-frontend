"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import {
    AppForm,
    AppFormField,
    AppErrorMessage,
    SubmitButton,
    FormLoader,
} from "@/components";
import { SignupValidationSchema, SignupFormValues } from "@/data/validationConstants";
import { currentUser } from "@/data/dummy.general";

const SignupForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSignup = async (values: SignupFormValues) => {
        setLoading(true);
        setError("");

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate validation - check if username/email already exists
        if (values.username === currentUser.username) {
            setError("Username already taken. Please choose another one.");
            setLoading(false);
            return;
        }

        if (values.email === currentUser.email) {
            setError("Email already registered. Please use another email or login.");
            setLoading(false);
            return;
        }

        // Success - Auto-login and redirect to dashboard
        console.log("Signup successful! Auto-logging in...", {
            username: values.username,
            email: values.email,
        });

        // In production, backend would:
        // 1. Create user account
        // 2. Set HttpOnly cookies (auto-login)
        // 3. Return user data

        // Simulate auto-login by redirecting to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="mb-4">

                {/* Welcome Message */}
                <div className="space-y-1">
                    <h2 className="big-text-2 font-bold text-slate-900 leading-tight">
                        Create Account
                    </h2>
                    <p className="normal-text text-slate-600">
                        Join thousands of Ghanaians worldwide. Access news, events,
                        opportunities, and connect with your community.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-slate-200">
                {/* Test Info */}
                <div className="mb-4 p-3 bg-secondary/10 rounded-xl border border-secondary/30">
                    <p className="small-text text-slate-700 font-semibold mb-1">
                        🧪 For Testing:
                    </p>
                    <p className="small-text-2 text-slate-600">
                        Use any credentials <strong>except</strong>:
                    </p>
                    <p className="small-text-2 text-slate-600">
                        Username: <strong>{currentUser.username}</strong> (already taken)
                    </p>
                    <p className="small-text-2 text-slate-600">
                        Email: <strong>{currentUser.email}</strong> (already registered)
                    </p>
                </div>

                <AppErrorMessage visible={!!error} error={error} />

                <AppForm
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={handleSignup}
                    validationSchema={SignupValidationSchema}
                >
                    <FormLoader visible={loading} message="Creating your account..." />

                    <div className="space-y-5">
                        {/* Username */}
                        <AppFormField
                            name="username"
                            placeholder="e.g. nana_asante"
                            label="Username"
                            type="text"
                            required
                        />

                        {/* Email */}
                        <AppFormField
                            name="email"
                            placeholder="you@example.com"
                            label="Email Address"
                            type="email"
                            required
                        />

                        {/* Password & Confirm Password - Grid */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <AppFormField
                                name="password"
                                placeholder="Enter password"
                                label="Password"
                                type={passwordVisible ? "text" : "password"}
                                icon={passwordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setPasswordVisible((prev) => !prev)}
                                iconAria={
                                    passwordVisible ? "Hide password" : "Show password"
                                }
                                required
                            />

                            <AppFormField
                                name="confirmPassword"
                                placeholder="Confirm password"
                                label="Confirm Password"
                                type={confirmPasswordVisible ? "text" : "password"}
                                icon={confirmPasswordVisible ? "eye-slash" : "eye"}
                                iconClick={() => setConfirmPasswordVisible((prev) => !prev)}
                                iconAria={
                                    confirmPasswordVisible ? "Hide password" : "Show password"
                                }
                                required
                            />
                        </div>

                        {/* Terms & Conditions */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="small-text text-slate-600 leading-relaxed">
                                By creating an account, you agree to our{" "}
                                <Link
                                    href="/terms"
                                    className="text-primary hover:text-primary-100 font-semibold hover:underline"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="text-primary hover:text-primary-100 font-semibold hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>

                        <SubmitButton title="Create Account" />

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-slate-200" />
                            </div>
                            <div className="relative flex justify-center normal-text-2">
                                <span className="bg-white px-4 text-slate-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-primary hover:bg-primary text-primary hover:text-white rounded-xl font-semibold normal-text transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                        >
                            Sign In
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </div>
                </AppForm>
            </div>
        </div>
    );
};

export default SignupForm;