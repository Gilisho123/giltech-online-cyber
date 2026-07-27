"use client";

interface Props {
    rows?: number;
    cards?: number;
}

export default function AdminLoading({
    rows = 5,
    cards = 4,
}: Props) {
    return (
        <div className="space-y-8 animate-pulse">

            {/* Statistics */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({ length: cards }).map((_, index) => (

                    <div
                        key={index}
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div className="h-14 w-14 rounded-2xl bg-slate-200" />

                            <div className="h-10 w-20 rounded bg-slate-200" />

                        </div>

                        <div className="mt-6 h-4 w-32 rounded bg-slate-200" />

                    </div>

                ))}

            </div>

            {/* Table */}

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                "
            >

                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">

                    <div className="h-5 w-48 rounded bg-slate-200" />

                </div>

                <div className="divide-y divide-slate-100">

                    {Array.from({ length: rows }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                items-center
                                justify-between
                                px-6
                                py-5
                            "
                        >

                            <div className="space-y-3">

                                <div className="h-4 w-48 rounded bg-slate-200" />

                                <div className="h-3 w-64 rounded bg-slate-200" />

                            </div>

                            <div className="h-8 w-20 rounded-full bg-slate-200" />

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}