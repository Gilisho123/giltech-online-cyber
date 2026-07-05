"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081225]/90 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                >
                    <Image
                        src="/logo.png"
                        alt="Giltech Logo"
                        width={52}
                        height={52}
                        priority
                        className="rounded-xl"
                    />

                    <div>
                        <h1 className="text-xl font-bold text-white">
                            Giltech
                        </h1>

                        <p className="text-xs text-cyan-400">
                            Online Cyber
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}

                <nav className="hidden items-center gap-8 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition duration-300 ${pathname === link.href
                                    ? "font-semibold text-cyan-400"
                                    : "text-slate-300 hover:text-cyan-400"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Button */}

                <Link
                    href="/contact"
                    className="hidden rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400 lg:block"
                >
                    Request Service
                </Link>

                {/* Mobile Toggle */}

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="rounded-lg border border-white/10 p-2 text-white transition hover:border-cyan-500 lg:hidden"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}

            <div
                className={`overflow-hidden bg-[#081225] transition-all duration-300 lg:hidden ${mobileOpen ? "max-h-[450px]" : "max-h-0"
                    }`}
            >
                <nav className="flex flex-col gap-2 px-6 py-6">

                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`rounded-xl px-4 py-3 transition ${pathname === link.href
                                    ? "bg-cyan-500 font-semibold text-black"
                                    : "text-slate-300 hover:bg-white/10 hover:text-cyan-400"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="mt-4 rounded-xl bg-cyan-500 px-4 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
                    >
                        Request Service
                    </Link>

                </nav>
            </div>
        </header>
    );
}