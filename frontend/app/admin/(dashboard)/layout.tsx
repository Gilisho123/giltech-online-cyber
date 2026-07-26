"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    Bell,
} from "lucide-react";

interface Props {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const pathname = usePathname();

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

            {/* Overlay */}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    h-screen
                    w-72
                    bg-[#081225]
                    text-white
                    shadow-2xl
                    transition-transform
                    duration-300

                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                {/* Logo */}

                <div className="flex items-center justify-between border-b border-slate-700 p-6">

                    <div>

                        <h1 className="text-2xl font-black text-cyan-400">
                            Giltech Admin
                        </h1>

                        <p className="mt-1 text-sm text-slate-400">
                            Administration Panel
                        </p>

                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2 transition hover:bg-white/10"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Navigation */}

                <nav className="space-y-2 p-4">

                    {menu.map((item) => {

                        const Icon = item.icon;

                        const active =
                            pathname === item.href;

                        return (

                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`
                                    flex items-center gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    transition

                                    ${active
                                        ? "bg-cyan-600 text-white"
                                        : "hover:bg-cyan-600/40"
                                    }
                                `}
                            >

                                <Icon size={20} />

                                {item.name}

                            </Link>

                        );

                    })}
                </nav>

                {/* Logout */}

                <div className="absolute bottom-0 left-0 w-full border-t border-slate-700 p-4">

                    <button
                        onClick={() =>
                            signOut({
                                callbackUrl: "/admin/login",
                            })
                        }
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-4
                            py-3
                            font-semibold
                            transition
                            hover:bg-red-700
                        "
                    >
                        <LogOut size={18} />

                        Logout
                    </button>

                </div>

            </aside>

            {/* Main Content */}

            <div className="flex min-h-screen flex-1 flex-col">

                {/* Header */}

                <header
                    className="
                        sticky
                        top-0
                        z-30
                        flex
                        h-20
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        bg-white
                        px-5
                        shadow-sm
                        md:px-8
                    "
                >

                    {/* Left */}

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setOpen(true)}
                            className="
                                rounded-xl
                                bg-slate-100
                                p-3
                                transition
                                hover:bg-slate-200
                            "
                        >
                            <Menu size={22} />
                        </button>

                        <div>

                            <h2 className="text-2xl font-black text-slate-800">
                                Giltech Admin
                            </h2>

                            <p className="text-sm text-slate-500">
                                Website Administration
                            </p>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="flex items-center gap-5">

                        <button
                            className="
                                relative
                                rounded-full
                                bg-slate-100
                                p-3
                                transition
                                hover:bg-slate-200
                            "
                        >

                            <Bell size={20} />

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
                                bg-white
                                px-3
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
                                    font-bold
                                    text-cyan-700
                                "
                            >
                                A
                            </div>

                            <div className="hidden sm:block">

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

                {/* Page Content */}

                <main className="flex-1 p-4 md:p-8">
                    {children}

                </main>

            </div>

        </div>
    );
}