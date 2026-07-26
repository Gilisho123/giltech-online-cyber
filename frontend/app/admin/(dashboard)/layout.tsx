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

            {/* Desktop Header */}

            <header
                className="
    hidden
    md:flex
    h-20
    items-center
    justify-between
    border-b
    border-slate-200
    bg-white
    px-8
    shadow-sm
    sticky
    top-0
    z-30
"
            >

                {/* Left */}

                <div>

                    <h2 className="text-3xl font-black text-slate-800">
                        Giltech Admin
                    </h2>

                    <p className="text-slate-500">
                        Manage your website professionally.
                    </p>

                </div>

                {/* Right */}

                <div className="flex items-center gap-5">

                    <button
                        className="
            relative
            rounded-full
            bg-slate-100
            p-3
            hover:bg-slate-200
            transition
            "
                    >

                        🔔

                        <span
                            className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
                "
                        />

                    </button>

                    <div
                        className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            px-4
            py-2
            "
                    >

                        <div
                            className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-cyan-100
                text-lg
                font-bold
                text-cyan-700
                "
                        >
                            A
                        </div>

                        <div>

                            <h3 className="font-bold text-slate-800">
                                Administrator
                            </h3>

                            <p className="text-sm text-slate-500">
                                Super Admin
                            </p>

                        </div>

                    </div>

                </div>

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