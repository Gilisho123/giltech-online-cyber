"use client";

interface TestimonialForm {
    name: string;
    position: string;
    company: string;
    message: string;
    rating: number;
    image: string;
}

interface TestimonialModalProps {
    open: boolean;
    onClose: () => void;
    form: TestimonialForm;
    setForm: React.Dispatch<React.SetStateAction<TestimonialForm>>;
    onSave: () => Promise<void>;
    loading?: boolean;
    editing?: boolean;
}

export default function TestimonialModal({
    open,
    onClose,
    form,
    setForm,
    onSave,
    loading = false,
    editing = false,
}: TestimonialModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {editing
                                ? "Edit Testimonial"
                                : "Add Testimonial"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {editing
                                ? "Update this client testimonial."
                                : "Add a new client testimonial."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-full px-3 py-2 text-xl text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>

                </div>

                <div className="space-y-5">

                    {/* Name */}

                    <div>
                        <label className="mb-2 block font-semibold text-slate-700">
                            Client Name
                        </label>

                        <input
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Position + Company */}

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Position
                            </label>

                            <input
                                value={form.position}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        position: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                                placeholder="Business Manager"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Company
                            </label>

                            <input
                                value={form.company}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                                placeholder="ABC Enterprises"
                            />
                        </div>

                    </div>

                    {/* Message */}

                    <div>
                        <label className="mb-2 block font-semibold text-slate-700">
                            Testimonial Message
                        </label>

                        <textarea
                            rows={6}
                            value={form.message}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    message: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                            placeholder="Giltech provided excellent service..."
                        />
                    </div>

                    {/* Rating */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Rating
                        </label>

                        <select
                            value={form.rating}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rating: Number(e.target.value),
                                })
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-cyan-500"
                        >
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={5}>5 Stars</option>
                        </select>

                    </div>

                    {/* Image */}

                    <div>
                        <label className="mb-2 block font-semibold text-slate-700">
                            Image URL
                        </label>

                        <input
                            value={form.image}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    image: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                            placeholder="/avatar.png"
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            Enter an image URL or public image path.
                        </p>
                    </div>

                    {/* Preview */}

                    {form.image && (
                        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">

                            <img
                                src={form.image}
                                alt="Preview"
                                className="h-16 w-16 rounded-full object-cover"
                            />

                            <div>
                                <p className="font-semibold text-slate-800">
                                    {form.name || "Client Name"}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {form.position || "Position"}
                                </p>

                            </div>

                        </div>
                    )}

                </div>

                {/* Buttons */}

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={loading}
                        className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Saving..."
                            : editing
                                ? "Update Testimonial"
                                : "Add Testimonial"}
                    </button>

                </div>

            </div>

        </div>
    );
}