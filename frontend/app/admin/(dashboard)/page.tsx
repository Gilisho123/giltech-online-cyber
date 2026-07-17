"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Mail,
    Bell,
    Calendar,
    Users,
    Briefcase,
    FolderOpen,
    Shield,
    ArrowRight,
} from "lucide-react";

interface RecentContact {
    id: number;
    name: string;
    subject: string;
    status: string;
    createdAt: string;
}

interface DashboardStats {
    totalContacts: number;
    newContacts: number;
    todaysContacts: number;
    uniqueClients: number;

    totalServices: number;
    totalPortfolio: number;
    totalAdmins: number;

    recentContacts: RecentContact[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalContacts: 0,
        newContacts: 0,
        todaysContacts: 0,
        uniqueClients: 0,

        totalServices: 0,
        totalPortfolio: 0,
        totalAdmins: 0,

        recentContacts: [],
    });

    useEffect(() => {
        async function loadDashboard() {
            try {
                const res = await fetch("/api/admin/dashboard");
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadDashboard();
    }, []);

    const cards = [
        {
            title: "Total Contacts",
            value: stats.totalContacts,
            icon: <Mail size={28} />,
        },
        {
            title: "New Messages",
            value: stats.newContacts,
            icon: <Bell size={28} />,
        },
        {
            title: "Today's Messages",
            value: stats.todaysContacts,
            icon: <Calendar size={28} />,
        },
        {
            title: "Unique Clients",
            value: stats.uniqueClients,
            icon: <Users size={28} />,
        },
        {
            title: "Services",
            value: stats.totalServices,
            icon: <Briefcase size={28} />,
        },
        {
            title: "Portfolio",
            value: stats.totalPortfolio,
            icon: <FolderOpen size={28} />,
        },
        {
            title: "Administrators",
            value: stats.totalAdmins,
            icon: <Shield size={28} />,
        },
    ];

    return (
        <div className="space-y-10">

            {/* Header */}

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-4xl font-black text-slate-800">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Welcome to the Giltech Online Cyber Admin Dashboard.
                    </p>

                </div>

                <Link
                    href="/admin/contacts"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
                >
                    View Contacts
                    <ArrowRight size={18} />
                </Link>

            </div>

            {/* Statistics */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="flex items-center justify-between">

                            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
                                {card.icon}
                            </div>

                            <h2 className="text-4xl font-black text-slate-800">
                                {card.value}
                            </h2>

                        </div>

                        <p className="mt-6 font-semibold text-slate-600">
                            {card.title}
                        </p>

                    </div>

                ))}

            </div>

            {/* Bottom Section */}

            <div className="grid gap-8 xl:grid-cols-3">

                {/* Recent Contacts */}

                <div className="xl:col-span-2 rounded-2xl bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b px-6 py-5">

                        <h2 className="text-xl font-bold text-slate-800">
                            Recent Contacts
                        </h2>

                        <Link
                            href="/admin/contacts"
                            className="text-cyan-600 font-semibold hover:underline"
                        >
                            View All
                        </Link>

                    </div>

                    <div>

                        {stats.recentContacts.length === 0 ? (

                            <div className="p-10 text-center text-slate-500">
                                No contacts yet.
                            </div>

                        ) : (

                            stats.recentContacts.map((contact) => (

                                <div
                                    key={contact.id}
                                    className="flex items-center justify-between border-b px-6 py-5 last:border-none"
                                >

                                    <div>

                                        <h3 className="font-bold text-slate-800">
                                            {contact.name}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {contact.subject}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${contact.status === "New"
                                                    ? "bg-cyan-100 text-cyan-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {contact.status}
                                        </span>

                                        <p className="mt-2 text-xs text-slate-400">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </p>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-xl font-bold text-slate-800">
                        Quick Actions
                    </h2>

                    <div className="space-y-4">

                        <Link
                            href="/admin/contacts"
                            className="block rounded-xl bg-cyan-600 p-4 text-center font-semibold text-white transition hover:bg-cyan-700"
                        >
                            Manage Contacts
                        </Link>

                        <button
                            className="w-full rounded-xl border border-slate-300 p-4 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Add Service
                        </button>

                        <button
                            className="w-full rounded-xl border border-slate-300 p-4 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Add Portfolio Project
                        </button>

                        <button
                            className="w-full rounded-xl border border-slate-300 p-4 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Website Settings
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}