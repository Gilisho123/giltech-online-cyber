"use client";

interface Props {
    open: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({
    open,
    title,
    message,
    onCancel,
    onConfirm,
}: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl bg-[#101c33] p-8">

                <h2 className="text-2xl font-black text-red-400">
                    {title}
                </h2>

                <p className="mt-4 text-slate-300">
                    {message}
                </p>

                <div className="mt-8 flex justify-end gap-4">

                    <button
                        onClick={onCancel}
                        className="rounded-xl border border-slate-500 px-5 py-3"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}