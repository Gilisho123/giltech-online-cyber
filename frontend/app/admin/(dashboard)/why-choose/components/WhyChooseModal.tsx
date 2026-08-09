"use client";

import { useEffect, useState } from "react";

interface WhyChooseForm {
    title: string;
    description: string;
    icon: string;
    order: number;
    active: boolean;
}

interface WhyChooseModalProps {
    open: boolean;
    onClose: () => void;
    form: WhyChooseForm;
    setForm: React.Dispatch<React.SetStateAction<WhyChooseForm>>;
    onSave: () => Promise<void>;
    loading?: boolean;
    editing: boolean;
}

export default function WhyChooseModal({
    open,
    onClose,
    form,
    setForm,
    onSave,
    loading = false,
    editing,
}: WhyChooseModalProps) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">
                            {editing
                                ? "Edit Why Choose Card"
                                : "Add Why Choose Card"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage the feature displayed on the homepage.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full px-3 py-2 text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800"
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
                            placeholder="Trusted Expertise"
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Professional experience and reliable solutions."
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-semibold text-slate-700">
                                Icon
                            </label>

                            <input
                                value={form.icon}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        icon: e.target.value,
                                    })
                                }
                                placeholder="🚀"
                                className="w-full rounded-xl border border-slate-200 p-3 text-2xl outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold text-slate-700">
                                Display Order
                            </label>

                            <input
                                type="number"
                                value={form.order}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        order: Number(e.target.value),
                                    })
                                }
                                className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
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
                                Show this card on the homepage.
                            </p>

                        </div>

                    </label>

                </div>

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
                                ? "Update Card"
                                : "Add Card"}
                    </button>

                </div>

            </div>

        </div>
    );
}