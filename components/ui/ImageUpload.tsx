"use client";

import { useRef, useState, ChangeEvent } from "react";
import { AlertCircle, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    label: string;
    name: string;
    onImageChange: (base64Image: string | null) => void;
    currentImage?: string | null;
    helperText?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    maxSizeMB?: number;
    acceptedFormats?: string[];
}

const ImageUpload = ({
    label,
    name,
    onImageChange,
    currentImage = null,
    helperText,
    error: externalError,
    required = false,
    disabled = false,
    maxSizeMB = 5,
    acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploadProps) => {
    const [internalError, setInternalError] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadId = `image-upload-${name}-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${uploadId}-error`;
    const helperId = `${uploadId}-helper`;

    const error = externalError || internalError;
    const displayImage = previewUrl || currentImage;

    const handleFileSelect = async (file: File): Promise<string | null> => {
        // Validate file type
        if (!acceptedFormats.includes(file.type)) {
            const formats = acceptedFormats
                .map((f) => f.split("/")[1].toUpperCase())
                .join(", ");
            setInternalError(
                `Please upload a valid image file (${formats})`
            );
            return null;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setInternalError(
                `File "${file.name}" is ${fileSizeMB.toFixed(2)}MB. Maximum size is ${maxSizeMB}MB`
            );
            return null;
        }

        // Convert to base64
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target?.result as string;
                resolve(base64String);
            };
            reader.onerror = () => {
                reject(new Error("Failed to read file"));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSingleFile = async (file: File) => {
        setInternalError("");
        setIsLoading(true);

        try {
            // Create blob URL for immediate preview
            const blobUrl = URL.createObjectURL(file);
            setPreviewUrl(blobUrl);

            // Convert to base64 for storage
            const base64 = await handleFileSelect(file);
            if (base64) {
                onImageChange(base64);
            }
        } catch (err) {
            setInternalError("Failed to read file. Please try again.");
            setPreviewUrl(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        handleSingleFile(files[0]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;
        handleSingleFile(files[0]);
    };

    const handleRemoveImage = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }

        // Revoke blob URL to free memory
        if (previewUrl && previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(null);
        onImageChange(null);
        setInternalError("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleChangeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            handleClick();
        }
    };

    const formatsList = acceptedFormats
        .map((f) => f.split("/")[1].toUpperCase())
        .join(", ");

    const shouldShowImage = displayImage && displayImage.trim() !== "" && !isLoading;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={uploadId}
                    className="block normal-text font-medium text-slate-700 mb-2"
                >
                    {label}
                    {required && <span className="text-accent ml-1">*</span>}
                </label>
            )}

            <div className="space-y-3">
                {/* Upload Area */}
                {!shouldShowImage && (
                    <div
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onKeyDown={handleKeyDown}
                        role="button"
                        tabIndex={disabled ? -1 : 0}
                        aria-label={`Upload image for ${label}`}
                        aria-describedby={`${error ? errorId : ""} ${helperText ? helperId : ""}`.trim()}
                        aria-invalid={!!error}
                        className={`
              relative border-2 border-dashed rounded-xl p-8
              transition-all duration-300 cursor-pointer
              ${disabled
                                ? "bg-slate-100 border-slate-300 cursor-not-allowed opacity-60"
                                : isDragging
                                    ? "border-primary bg-primary/5"
                                    : error
                                        ? "border-accent bg-accent/5"
                                        : "border-slate-300 hover:border-primary hover:bg-slate-50"
                            }
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
                    >
                        <input
                            ref={fileInputRef}
                            id={uploadId}
                            name={name}
                            type="file"
                            accept={acceptedFormats.join(",")}
                            onChange={handleFileInputChange}
                            disabled={disabled}
                            required={required && !currentImage}
                            className="hidden"
                            aria-label={`File input for ${label}`}
                        />

                        <div className="flex flex-col items-center text-center">
                            {isLoading ? (
                                <div className="w-12 h-12 mb-4 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
                            ) : (
                                <div className="w-16 h-16 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Upload
                                        className={`w-8 h-8 ${disabled ? "text-slate-400" : "text-primary"
                                            }`}
                                        aria-hidden="true"
                                    />
                                </div>
                            )}

                            <p className="big-text-5 font-semibold text-slate-900 mb-1">
                                {isLoading
                                    ? "Processing..."
                                    : "Click to upload or drag and drop"}
                            </p>
                            <p className="small-text text-slate-600">
                                {formatsList} up to {maxSizeMB}MB
                            </p>
                        </div>
                    </div>
                )}

                {/* Image Preview */}
                {shouldShowImage && (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-slate-200 hover:border-primary transition-all duration-300">
                        <Image
                            width={1000}
                            height={1000}
                            src={displayImage}
                            alt={`Preview of ${label}`}
                            className="w-full h-48 sm:h-64 object-cover"
                            unoptimized={
                                displayImage.startsWith("blob:") ||
                                displayImage.startsWith("data:")
                            }
                        />

                        {/* Overlay on hover (desktop) */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleChangeClick}
                                    disabled={disabled}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-100 text-white rounded-lg font-semibold normal-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Change image"
                                >
                                    <ImageIcon className="w-4 h-4" aria-hidden="true" />
                                    Change
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    disabled={disabled}
                                    className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-100 text-white rounded-lg font-semibold normal-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
                                    aria-label="Remove image"
                                >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                    Remove
                                </button>
                            </div>
                        </div>

                        {/* Buttons - visible on mobile */}
                        <div className="absolute top-3 right-3 sm:hidden flex gap-2">
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                disabled={disabled}
                                className="p-2 bg-accent hover:bg-accent-100 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
                                aria-label="Remove image"
                            >
                                <X className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Mobile Change button */}
                        <div className="sm:hidden absolute top-3 left-3">
                            <button
                                type="button"
                                onClick={handleChangeClick}
                                disabled={disabled}
                                className="p-2 bg-primary hover:bg-primary-100 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                                aria-label="Change image"
                            >
                                <ImageIcon className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div
                        id={errorId}
                        className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border-2 border-accent/20"
                        role="alert"
                    >
                        <AlertCircle
                            className="w-4 h-4 text-accent shrink-0 mt-0.5"
                            aria-hidden="true"
                        />
                        <p className="small-text text-accent">{error}</p>
                    </div>
                )}

                {/* Helper Text */}
                {helperText && !error && (
                    <p id={helperId} className="small-text text-slate-600">
                        {helperText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;