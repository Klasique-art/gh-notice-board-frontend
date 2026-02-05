"use client";

import { useState } from "react";
import * as Yup from "yup";
import { User, CheckCircle, Eye, EyeOff } from "lucide-react";
import {
    AppForm,
    AppFormField,
    AppErrorMessage,
    SubmitButton,
    FormLoader,
} from "@/components";
import { CurrentUser } from "@/types/general.types";

interface ChangeUsernameFormProps {
    currentUser: CurrentUser;
}

const ChangeUsernameValidationSchema = Yup.object().shape({
    newUsername: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must not exceed 30 characters")
        .matches(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        ),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

type ChangeUsernameFormValues = {
    newUsername: string;
    password: string;
};

const ChangeUsernameForm = ({ currentUser }: ChangeUsernameFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (
        values: ChangeUsernameFormValues,
        { resetForm }: any
    ) => {
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock validation
            if (values.password !== "Password123") {
                throw new Error("Password is incorrect");
            }

            if (values.newUsername === currentUser.username) {
                throw new Error("New username must be different from current username");
            }

            console.log("Username change:", values);
            setSuccess(true);
            resetForm();
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to change username. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                </div>
                <div className="flex-1">
                    <h2 className="big-text-4 font-bold text-slate-900">
                        Change Username
                    </h2>
                    <p className="small-text text-slate-600">
                        Current username:{" "}
                        <span className="font-semibold text-slate-900">
                            @{currentUser.username}
                        </span>
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
                            Username changed successfully!
                        </p>
                    </div>
                </div>
            )}

            <AppForm
                initialValues={{
                    newUsername: "",
                    password: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={ChangeUsernameValidationSchema}
            >
                <FormLoader visible={loading} message="Changing username..." />

                <div className="space-y-4">
                    {/* New Username */}
                    <AppFormField
                        name="newUsername"
                        label="New Username"
                        type="text"
                        placeholder="Enter new username"
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

                    <div className="p-3 bg-secondary/20 rounded-lg border-2 border-secondary/30">
                        <p className="small-text text-slate-700">
                            <strong>Note:</strong> Username can only be changed once every 30
                            days
                        </p>
                    </div>

                    <SubmitButton title="Change Username" />
                </div>
            </AppForm>
        </div>
    );
};

export default ChangeUsernameForm;