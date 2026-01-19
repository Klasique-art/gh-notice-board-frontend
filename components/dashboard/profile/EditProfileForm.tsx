"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    SubmitButton,
    FormLoader,
    ImageUpload,
    AppFormField,
    AppButton,
} from "@/components";
import { CheckCircle, AlertCircle, User, MapPin, Link2, Briefcase, Image as ImageIcon } from "lucide-react";
import { CurrentUser } from "@/types/general.types";

interface EditProfileFormProps {
    user: CurrentUser;
}

// Validation Schema matching Django backend
const profileEditSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .max(150, "First name must not exceed 150 characters")
        .required("First name is required"),
    last_name: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .max(150, "Last name must not exceed 150 characters")
        .required("Last name is required"),
    bio: Yup.string()
        .max(500, "Bio must not exceed 500 characters")
        .nullable(),
    location: Yup.string()
        .max(100, "Location must not exceed 100 characters")
        .nullable(),
    website: Yup.string()
        .url("Please enter a valid URL")
        .nullable(),
    twitter_username: Yup.string()
        .max(50, "Twitter username must not exceed 50 characters")
        .nullable(),
    linkedin_url: Yup.string()
        .url("Please enter a valid LinkedIn URL")
        .nullable(),
    github_username: Yup.string()
        .max(50, "GitHub username must not exceed 50 characters")
        .nullable(),
    occupation: Yup.string()
        .max(100, "Occupation must not exceed 100 characters")
        .nullable(),
    company: Yup.string()
        .max(100, "Company must not exceed 100 characters")
        .nullable(),
    avatar: Yup.string().nullable(),
    cover_image: Yup.string().nullable(),
});

type ProfileFormValues = Yup.InferType<typeof profileEditSchema>;

const EditProfileForm = ({ user }: EditProfileFormProps) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const initialValues: ProfileFormValues = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        twitter_username: user.twitter_username || "",
        linkedin_url: user.linkedin_url || "",
        github_username: user.github_username || "",
        occupation: user.profile.occupation || "",
        company: user.profile.company || "",
        avatar: user.avatar || null,
        cover_image: user.cover_image || null,
    };

    const handleSubmit = async (
        values: ProfileFormValues,
        { setSubmitting }: any
    ) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // In production, this will call the actual API
            console.log("Updating profile with:", values);

            // Mock success
            setSubmitSuccess(true);

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push("/dashboard/profile");
                router.refresh();
            }, 2000);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setSubmitError(
                error.message || "Failed to update profile. Please try again."
            );
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <Formik
                initialValues={initialValues}
                validationSchema={profileEditSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                    <Form className="space-y-6">
                        <FormLoader
                            visible={isSubmitting}
                            message="Updating your profile..."
                        />

                        {/* Cover Image Section */}
                        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h2 className="big-text-4 font-bold text-slate-900">
                                        Cover Image
                                    </h2>
                                    <p className="small-text text-slate-600">
                                        Update your profile cover (1200x400px recommended)
                                    </p>
                                </div>
                            </div>

                            <ImageUpload
                                label=""
                                name="cover_image"
                                onImageChange={(base64Image) =>
                                    setFieldValue("cover_image", base64Image)
                                }
                                currentImage={values.cover_image}
                                error={
                                    touched.cover_image && errors.cover_image
                                        ? String(errors.cover_image)
                                        : undefined
                                }
                                helperText="Max 5MB, JPG/PNG/WEBP"
                                maxSizeMB={5}
                                acceptedFormats={["image/jpeg", "image/png", "image/webp"]}
                            />
                        </div>

                        {/* Avatar Section */}
                        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="big-text-4 font-bold text-slate-900">
                                        Profile Picture
                                    </h2>
                                    <p className="small-text text-slate-600">
                                        Update your avatar (Square image recommended)
                                    </p>
                                </div>
                            </div>

                            <ImageUpload
                                label=""
                                name="avatar"
                                onImageChange={(base64Image) =>
                                    setFieldValue("avatar", base64Image)
                                }
                                currentImage={values.avatar}
                                error={
                                    touched.avatar && errors.avatar
                                        ? String(errors.avatar)
                                        : undefined
                                }
                                helperText="Max 5MB, JPG/PNG/WEBP. Square image works best."
                                maxSizeMB={5}
                                acceptedFormats={["image/jpeg", "image/png", "image/webp"]}
                            />
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="big-text-4 font-bold text-slate-900">
                                        Personal Information
                                    </h2>
                                    <p className="small-text text-slate-600">
                                        Update your basic details
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <AppFormField
                                        name="first_name"
                                        label="First Name"
                                        placeholder="Enter your first name"
                                        required
                                    />

                                    <AppFormField
                                        name="last_name"
                                        label="Last Name"
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>

                                <div>
                                    <AppFormField
                                        name="bio"
                                        label="Bio"
                                        placeholder="Tell us about yourself..."
                                        multiline
                                        rows={4}
                                    />
                                    <p className="mt-1 small-text text-slate-600">
                                        {(values.bio || "").length}/500 characters
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location & Work */}
                        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="big-text-4 font-bold text-slate-900">
                                        Location & Work
                                    </h2>
                                    <p className="small-text text-slate-600">
                                        Where are you based and what do you do?
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <AppFormField
                                    name="location"
                                    label="Location"
                                    placeholder="e.g., Accra, Ghana"
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <AppFormField
                                        name="occupation"
                                        label="Occupation"
                                        placeholder="e.g., Software Engineer"
                                    />

                                    <AppFormField
                                        name="company"
                                        label="Company"
                                        placeholder="e.g., TechGhana Solutions"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <Link2 className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="big-text-4 font-bold text-slate-900">
                                        Social Links
                                    </h2>
                                    <p className="small-text text-slate-600">
                                        Connect your social media accounts
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <AppFormField
                                    name="website"
                                    label="Website"
                                    placeholder="https://yourwebsite.com"
                                    type="url"
                                />

                                <AppFormField
                                    name="twitter_username"
                                    label="Twitter Username"
                                    placeholder="username (without @)"
                                />

                                <AppFormField
                                    name="linkedin_url"
                                    label="LinkedIn URL"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                    type="url"
                                />

                                <AppFormField
                                    name="github_username"
                                    label="GitHub Username"
                                    placeholder="username"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {submitError && (
                            <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="normal-text font-semibold text-red-900 mb-1">
                                            Error Updating Profile
                                        </p>
                                        <p className="small-text text-red-700">{submitError}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        {submitSuccess && (
                            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="normal-text font-semibold text-green-900 mb-1">
                                            Profile Updated Successfully!
                                        </p>
                                        <p className="small-text text-green-700">
                                            Redirecting to your profile...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                            <AppButton
                                url="/dashboard/profile"
                                title="Cancel"
                                variant="ghost"
                                size="lg"
                                fullWidth
                            />
                            <SubmitButton title="Save Changes"/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfileForm;