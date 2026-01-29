"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
    AppForm,
    AppFormField,
    AppErrorMessage,
    SubmitButton,
    FormLoader,
} from "@/components";
import { LoginValidationSchema, LoginFormValues } from "@/data/validationConstants";

const LoginForm = () => {
    const router = useRouter();
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: LoginFormValues) => { 
        setLoading(true);
        setLoginError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: values.emailOrUsername,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle error from backend
                setLoginError(data.error || data.message || "Invalid email/username or password. Please try again.");
                setLoading(false);
                return;
            }

            // Success - tokens are stored in HttpOnly cookies by the API route
            console.log("Login successful!", data.user);
            
            // Redirect to dashboard/home
            router.push("/");
            
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("An error occurred during login. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-20">
            {/* Header */}
            <div className="mt-24">
                {/* Welcome Message */}
                <div className="space-y-1">
                    <h2 className="massive-text font-bold text-slate-900 leading-tight">
                        Welcome Back!
                    </h2>
                    <p className="big-text-5 text-slate-600">
                        Sign in to access news, events, opportunities, and connect with the
                        Ghanaian community.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-slate-200">
                <AppErrorMessage visible={!!loginError} error={loginError} />

                <AppForm
                    initialValues={{ emailOrUsername: "", password: "" }}
                    onSubmit={handleLogin}
                    validationSchema={LoginValidationSchema}
                >
                    <FormLoader visible={loading} message="Signing you in..." />

                    <div className="space-y-5">
                        <AppFormField
                            name="emailOrUsername"
                            placeholder="Enter email or username"
                            label="Email or Username"
                            type="text"
                            required
                        />

                        <AppFormField
                            name="password"
                            placeholder="Enter your password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            icon={showPassword ? "eye-slash" : "eye"}
                            iconClick={() => setShowPassword((prev) => !prev)}
                            iconAria={showPassword ? "Hide Password" : "Show Password"}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <Link
                                href="/forgot-password"
                                className="small-text text-primary hover:text-primary-100 font-semibold transition-colors hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <SubmitButton title="Sign In" />

                        {/* Divider */}
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-slate-200" />
                            </div>
                            <div className="relative flex justify-center normal-text-2">
                                <span className="bg-white px-4 text-slate-500">
                                    New to Ghana Notice Board?
                                </span>
                            </div>
                        </div>

                        {/* Signup Link */}
                        <Link
                            href="/signup"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-primary hover:bg-primary text-primary hover:text-white rounded-xl font-semibold normal-text transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                        >
                            Create Account
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </div>
                </AppForm>
            </div>
        </div>
    );
};

export default LoginForm;