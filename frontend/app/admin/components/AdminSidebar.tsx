"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Mail,
    Briefcase,
    FolderOpen,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

const menuItems = [
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
        icon: Briefcase,
    },
    {
        name: "Portfolio",
        href: "/admin/portfolio",
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

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-72 flex-col border-r border-cyan-500/20 bg-[#081225] text-white">

            {/* Logo */}

            <div className="border-b border-cyan-500/20 p-6">

                <h1 className="text-4xl font-black text-cyan-400">
                    Giltech
                </h1>

                <p className="text-cyan-300">
                    Online Cyber
                </p>

                <p className="mt-2 text-sm text-slate-400">
                    Administration Panel
                </p>

            </div>

            {/* Navigation */}

            <nav className="flex-1 space-y-2 p-5">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    const active =
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/");

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition-all
                            ${active
                                    ? "bg-cyan-500 text-black font-bold"
                                    : "text-slate-300 hover:bg-white/5 hover:text-cyan-400"
                                }`}
                        >
                            <Icon size={22} />

                            {item.name}
                        </Link>
                    );
                })}

            </nav>

            {/* Logout */}

            <div className="border-t border-cyan-500/20 p-5">

                <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700">

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
}