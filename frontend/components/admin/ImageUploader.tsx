"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Upload, X } from "lucide-react";

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    folder?: string;
}

export default function ImageUploader({
    value = "",
    onChange,
    folder = "general",
}: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        setError("");

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError("Image must be smaller than 5MB.");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);
            formData.append("folder", folder);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.url) {
                throw new Error(
                    data.message || "Image upload failed."
                );
            }

            onChange(data.url);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Image upload failed."
            );
        } finally {
            setUploading(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }

    function removeImage() {
        onChange("");
        setError("");
    }

    return (
        <div className="space-y-3">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
            />

            {value ? (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <Image
                        src={value}
                        alt="Uploaded preview"
                        width={1200}
                        height={700}
                        className="h-56 w-full object-cover"
                    />

                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow-lg transition hover:bg-red-700"
                    >
                        <X size={18} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-cyan-500 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {uploading ? (
                        <>
                            <Upload
                                size={32}
                                className="animate-bounce text-cyan-600"
                            />

                            <p className="mt-3 font-semibold text-slate-700">
                                Uploading image...
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Please wait...
                            </p>
                        </>
                    ) : (
                        <>
                            <ImageIcon
                                size={32}
                                className="text-slate-400"
                            />

                            <p className="mt-3 font-semibold text-slate-700">
                                Click to upload an image
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                PNG, JPG, JPEG or WEBP • Maximum 5MB
                            </p>
                        </>
                    )}
                </button>
            )}

            {error && (
                <p className="text-sm font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}