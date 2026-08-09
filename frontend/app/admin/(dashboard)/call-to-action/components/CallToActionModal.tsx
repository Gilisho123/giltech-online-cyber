"use client";

interface CallToActionForm {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    active: boolean;
}

interface CallToActionModalProps {
    open: boolean;
    onClose: () => void;
    form: CallToActionForm;
    setForm: React.Dispatch<React.SetStateAction<CallToActionForm>>;
    onSave: () => Promise<void>;
    loading?: boolean;
}

export default function CallToActionModal({
    open,
    onClose,
    form,
    setForm,
    onSave,
    loading = false,
}: CallToActionModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Edit Call To Action
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage the CTA displayed on your homepage.
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

                    <div>
                        <label className="mb-2 block font-semibold text-slate-700">
                            Title
                        </label>

                        <input
                            value={form.title}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    title: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                            placeholder="Ready to Get Started?"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-semibold text-slate-700">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                            placeholder="Let us help you find the right digital solution."
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Button Text
                            </label>

                            <input
                                value={form.buttonText}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        buttonText: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                                placeholder="Contact Us"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-slate-700">
                                Button Link
                            </label>

                            <input
                                value={form.buttonLink}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        buttonLink: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                                placeholder="/contact"
                            />
                        </div>

                    </div>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

                        <input
                            type="checkbox"
                            checked={form.active}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    active: e.target.checked,
                                })
                            }
                            className="h-5 w-5"
                        />

                        <div>
                            <p className="font-semibold text-slate-800">
                                Active
                            </p>

                            <p className="text-sm text-slate-500">
                                Display this CTA on the homepage.
                            </p>
                        </div>

                    </label>

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={loading}
                        className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </div>

        </div>
    );
}