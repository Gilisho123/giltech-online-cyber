"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Mail,
    FolderOpen,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [open, setOpen] = useState(false);

    const menu = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Contacts",
            href: "/admin/contacts",
            icon: Mail,
        },
        {
            name: "Services",
            href: "/admin/services",
            icon: FolderOpen,
        },
        {
            name: "Users",
            href: "/admin/users",
            icon: Users,
        },
        {
            name: "Settings",
            href: "/admin/settings",
            icon: Settings,
        },
    ];


    return (

        <div className="min-h-screen bg-slate-100">


            {/* Mobile Header */}

            <header className="flex items-center justify-between bg-[#081225] px-5 py-4 text-white md:hidden">

                <h1 className="text-xl font-black text-cyan-400">
                    Giltech Admin
                </h1>


                <button
                    onClick={() => setOpen(true)}
                    className="rounded-lg p-2 hover:bg-white/10"
                >
                    <Menu />
                </button>

            </header>



            {/* Overlay */}

            {open && (

                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                />

            )}



            {/* Sidebar */}

            <aside
                className={`
                    fixed left-0 top-0 z-50
                    h-screen w-72
                    bg-[#081225]
                    text-white
                    transition-transform duration-300

                    ${open ? "translate-x-0" : "-translate-x-full"}

                    md:translate-x-0
                `}
            >


                <div className="flex items-center justify-between border-b border-slate-700 p-6">


                    <div>

                        <h1 className="text-2xl font-black text-cyan-400">
                            Giltech Admin
                        </h1>

                        <p className="text-sm text-slate-400">
                            Administration Panel
                        </p>

                    </div>


                    <button
                        onClick={() => setOpen(false)}
                        className="md:hidden"
                    >
                        <X />
                    </button>


                </div>



                <nav className="space-y-2 p-4">


                    {menu.map((item) => {

                        const Icon = item.icon;


                        return (

                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="
                                flex items-center gap-3
                                rounded-xl px-4 py-3
                                transition
                                hover:bg-cyan-600
                                "
                            >

                                <Icon size={20} />

                                {item.name}

                            </Link>

                        );

                    })}


                </nav>



                <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">


                    <button
                        onClick={() => signOut({
                            callbackUrl: "/admin/login"
                        })}
                        className="
                        flex w-full
                        items-center justify-center gap-2
                        rounded-xl
                        bg-red-600
                        px-4 py-3
                        font-semibold
                        hover:bg-red-700
                        transition
                        "
                    >

                        <LogOut size={18} />

                        Logout

                    </button>


                </div>


            </aside>




            {/* Main Area */}

            <main className="md:ml-72">


                {/* Desktop Header */}

                <header
                    className="
                    hidden md:flex
                    h-20
                    items-center
                    justify-between
                    border-b
                    bg-white
                    px-8
                    shadow-sm
                    "
                >

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">
                            Admin Dashboard
                        </h2>

                        <p className="text-sm text-slate-500">
                            Welcome back, Administrator
                        </p>

                    </div>


                </header>



                <section className="p-5 md:p-8">

                    {children}

                </section>


            </main>


        </div>

    );
}