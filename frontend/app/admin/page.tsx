"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Mail,
    Bell,
    Calendar,
    Users,
} from "lucide-react";

interface DashboardStats {
    totalContacts: number;
    newContacts: number;
    todaysContacts: number;
    uniqueClients: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalContacts: 0,
        newContacts: 0,
        todaysContacts: 0,
        uniqueClients: 0,
    });

    useEffect(() => {
        async function loadDashboard() {
            const res = await fetch("/api/admin/dashboard");
            const data = await res.json();
            setStats(data);
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
    ];

    return (
        <div>
            <div className="flex items-center justify-between">
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
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
                >
                    View Contacts
                </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="rounded-2xl bg-white p-6 shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-cyan-600">
                                {card.icon}
                            </div>

                            <h2 className="text-4xl font-black">
                                {card.value}
                            </h2>
                        </div>

                        <p className="mt-5 text-slate-600 font-medium">
                            {card.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}