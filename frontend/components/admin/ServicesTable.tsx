"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";

interface Service {
    id: number;
    title: string;
    category: string;
    description: string;
    featured: boolean;
}

export default function ServicesTable() {
    const [services, setServices] = useState<Service[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadServices();
    }, []);

    async function loadServices() {
        try {
            const res = await fetch("/api/services");

            if (!res.ok) return;

            const data = await res.json();
            setServices(data);
        } catch (err) {
            console.error(err);
        }
    }

    const filtered = useMemo(() => {
        return services.filter((service) =>
            (
                service.title +
                service.category +
                service.description
            )
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [services, search]);

    return (
        <div className="mt-8 overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#101c33]">

            <div className="border-b border-cyan-500/20 p-6">

                <input
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-cyan-500/20 bg-[#081225] px-4 py-3 text-white outline-none"
                />

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#081225]">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Title
                            </th>

                            <th className="px-6 py-4 text-left">
                                Category
                            </th>

                            <th className="px-6 py-4 text-left">
                                Featured
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map((service) => (

                            <tr
                                key={service.id}
                                className="border-b border-cyan-500/10 hover:bg-cyan-500/5"
                            >

                                <td className="px-6 py-5 font-semibold">
                                    {service.title}
                                </td>

                                <td className="px-6 py-5">
                                    {service.category}
                                </td>

                                <td className="px-6 py-5">

                                    {service.featured ? (

                                        <Star
                                            size={18}
                                            className="fill-yellow-400 text-yellow-400"
                                        />

                                    ) : (

                                        "-"

                                    )}

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex justify-center gap-3">

                                        <button className="rounded-lg bg-cyan-600 p-2 hover:bg-cyan-700">
                                            <Pencil size={18} />
                                        </button>

                                        <button className="rounded-lg bg-red-600 p-2 hover:bg-red-700">
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                        {filtered.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="py-12 text-center text-slate-400"
                                >
                                    No services found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}