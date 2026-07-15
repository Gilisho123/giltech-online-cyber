"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Mail,
    FolderOpen,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-slate-100">

            {/* Sidebar */}
            <aside className="w-72 bg-[#081225] text-white flex flex-col">

                <div className="border-b border-slate-700 p-6">
                    <h1 className="text-2xl font-black text-cyan-400">
                        Giltech Admin
                    </h1>

                    <p className="mt-1 text-sm text-slate-400">
                        Administration Panel
                    </p>
                </div>


                <nav className="flex-1 px-4 py-6 space-y-2">

                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-cyan-600 transition"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>


                    <Link
                        href="/admin/contacts"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-cyan-600 transition"
                    >
                        <Mail size={20} />
                        Contacts
                    </Link>


                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-cyan-600 transition"
                    >
                        <FolderOpen size={20} />
                        Services
                    </Link>


                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-cyan-600 transition"
                    >
                        <Users size={20} />
                        Users
                    </Link>


                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-cyan-600 transition"
                    >
                        <Settings size={20} />
                        Settings
                    </Link>

                </nav>


                {/* Logout */}

                <div className="border-t border-slate-700 p-4">

                    <button
                        onClick={() =>
                            signOut({
                                callbackUrl: "/admin/login",
                            })
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold hover:bg-red-700 transition"
                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>


            </aside>


            {/* Main Content */}

            <div className="flex-1">


                <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">
                            Admin Dashboard
                        </h2>

                        <p className="text-sm text-slate-500">
                            Welcome back, Administrator
                        </p>

                    </div>

                </header>


                <main className="p-8">

                    {children}

                </main>


            </div>


        </div>
    );
}