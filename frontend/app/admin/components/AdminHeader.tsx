"use client";

import { Bell, UserCircle } from "lucide-react";

interface Props {
    title?: string;
    subtitle?: string;
}

export default function AdminHeader({
    title = "Admin Dashboard",
    subtitle = "Welcome back, Administrator",
}: Props) {
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

            {/* Left */}

            <div>

                <h1 className="text-3xl font-black text-slate-900">
                    {title}
                </h1>

                <p className="mt-1 text-slate-500">
                    {subtitle}
                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                <button className="relative rounded-full bg-slate-100 p-3 transition hover:bg-slate-200">

                    <Bell size={22} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

                </button>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2">

                    <UserCircle
                        size={42}
                        className="text-cyan-600"
                    />

                    <div>

                        <h3 className="font-bold">
                            Administrator
                        </h3>

                        <p className="text-sm text-slate-500">
                            Super Admin
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}