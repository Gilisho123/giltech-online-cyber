"use client";

interface DeleteFAQModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    loading?: boolean;
    question?: string;
}

export default function DeleteFAQModal({
    open,
    onClose,
    onConfirm,
    loading = false,
    question,
}: DeleteFAQModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                <div className="text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                        ⚠️
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-slate-800">
                        Delete FAQ?
                    </h2>

                    <p className="mt-3 leading-6 text-slate-500">
                        Are you sure you want to delete this FAQ?
                    </p>

                    {question && (
                        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                            "{question}"
                        </p>
                    )}

                    <p className="mt-3 text-sm text-red-500">
                        This action cannot be undone.
                    </p>

                </div>

                <div className="mt-8 flex justify-center gap-3">

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
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
}