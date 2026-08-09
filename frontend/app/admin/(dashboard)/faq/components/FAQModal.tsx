"use client";

interface FAQForm {
    question: string;
    answer: string;
    order: number;
    featured: boolean;
}

interface FAQModalProps {
    open: boolean;
    onClose: () => void;
    form: FAQForm;
    setForm: React.Dispatch<React.SetStateAction<FAQForm>>;
    onSave: () => Promise<void>;
    loading?: boolean;
    editing?: boolean;
}

export default function FAQModal({
    open,
    onClose,
    form,
    setForm,
    onSave,
    loading = false,
    editing = false,
}: FAQModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {editing ? "Edit FAQ" : "Add FAQ"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage frequently asked questions displayed on the website.
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

                    {/* Question */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Question
                        </label>

                        <input
                            value={form.question}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    question: e.target.value,
                                })
                            }
                            placeholder="What services does Giltech offer?"
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                    {/* Answer */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Answer
                        </label>

                        <textarea
                            rows={6}
                            value={form.answer}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    answer: e.target.value,
                                })
                            }
                            placeholder="Enter the answer to this question..."
                            className="w-full resize-none rounded-xl border border-slate-200 p-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                    {/* Order */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Display Order
                        </label>

                        <input
                            type="number"
                            min={0}
                            value={form.order}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    order: Number(e.target.value),
                                })
                            }
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                        <p className="mt-1 text-xs text-slate-400">
                            Lower numbers appear first.
                        </p>

                    </div>

                    {/* Featured */}

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">

                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    featured: e.target.checked,
                                })
                            }
                            className="h-5 w-5"
                        />

                        <div>
                            <p className="font-semibold text-slate-800">
                                Featured
                            </p>

                            <p className="text-sm text-slate-500">
                                Show this FAQ in the homepage FAQ section.
                            </p>
                        </div>

                    </label>

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
                        className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Saving..."
                            : editing
                                ? "Update FAQ"
                                : "Add FAQ"}
                    </button>

                </div>

            </div>

        </div>
    );
}