"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

interface Service {
    id?: number;
    title: string;
    category: string;
    description: string;
    featured: boolean;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    service?: Service | null;
}

export default function ServiceModal({
    open,
    onClose,
    onSuccess,
    service,
}: Props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (service) {
            setTitle(service.title);
            setCategory(service.category);
            setDescription(service.description);
            setFeatured(service.featured);
        } else {
            setTitle("");
            setCategory("");
            setDescription("");
            setFeatured(false);
        }

        setError("");
    }, [service, open]);

    if (!open) return null;

    async function saveService() {
        setError("");

        if (!title.trim()) {
            setError("Service title is required.");
            return;
        }

        if (!category.trim()) {
            setError("Category is required.");
            return;
        }

        if (!description.trim()) {
            setError("Description is required.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                title,
                category,
                description,
                featured,
            };

            const url = service
                ? `/api/services/${service.id}`
                : "/api/services";

            const method = service ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();

                throw new Error(
                    data.message || "Failed to save service."
                );
            }

            onSuccess();
            onClose();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

            <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white text-slate-800 shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-200 p-8">

                    <div>

                        <h2 className="text-3xl font-black text-cyan-700">
                            {service
                                ? `Edit: ${service.title}`
                                : "Add New Service"}
                        </h2>

                        <p className="mt-2 text-slate-500">
                            {service
                                ? "Update the selected service."
                                : "Fill in the details below to create a new service."}
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-6 p-8">

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Title */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Service Title
                            <span className="ml-1 text-red-500">*</span>
                        </label>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter service title..."
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                    {/* Category */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Category
                            <span className="ml-1 text-red-500">*</span>
                        </label>

                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Government Services"
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Description
                            <span className="ml-1 text-red-500">*</span>
                        </label>

                        <textarea
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe this service..."
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                    {/* Featured */}

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">

                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={(e) =>
                                setFeatured(e.target.checked)
                            }
                            className="h-5 w-5 accent-cyan-600"
                        />

                        <div>

                            <p className="font-semibold text-slate-700">
                                Featured Service
                            </p>

                            <p className="text-sm text-slate-500">
                                Display this service in featured sections.
                            </p>

                        </div>

                    </label>

                </div>

                {/* Footer */}

                <div className="flex items-center justify-end gap-4 border-t border-slate-200 p-8">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveService}
                        disabled={loading}
                        className="flex min-w-[170px] items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
                    >

                        {loading ? (
                            <>
                                <Loader2
                                    size={20}
                                    className="animate-spin"
                                />
                                Saving...
                            </>
                        ) : (
                            <>
                                {service
                                    ? "Update Service"
                                    : "Save Service"}
                            </>
                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}