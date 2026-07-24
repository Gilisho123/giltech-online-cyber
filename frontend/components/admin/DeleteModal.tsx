"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

interface Props {
    open: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => Promise<void> | void;
}

export default function DeleteModal({
    open,
    title,
    message,
    onCancel,
    onConfirm,
}: Props) {

    const [loading, setLoading] = useState(false);

    async function handleDelete() {

        setLoading(true);

        try {

            await onConfirm();

        } finally {

            setLoading(false);

        }

    }

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

            <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-[#101c33] shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-red-500/20 p-8">

                    <div className="flex items-center gap-4">

                        <div className="rounded-2xl bg-red-500/10 p-4">

                            <AlertTriangle
                                size={34}
                                className="text-red-400"
                            />

                        </div>

                        <div>

                            <h2 className="text-3xl font-black text-red-400">

                                {title}

                            </h2>

                            <p className="mt-2 text-slate-400">

                                This action is permanent.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl p-2 transition hover:bg-red-500/10 disabled:opacity-50"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-5 p-8">

                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

                        <p className="leading-7 text-slate-300">

                            {message}

                        </p>

                    </div>

                    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

                        <p className="font-semibold text-yellow-300">

                            ⚠ Warning

                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-300">

                            Once deleted, this service cannot be recovered.

                        </p>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex items-center justify-end gap-4 border-t border-red-500/20 p-8">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-500 px-6 py-3 font-semibold transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex min-w-[170px] items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-800 disabled:text-slate-300"
                    >

                        {loading ? (
                            <>
                                <Loader2
                                    size={20}
                                    className="animate-spin"
                                />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={18} />
                                Delete Service
                            </>
                        )}

                    </button>

                </div>

            </div>

        </div>

    );
}