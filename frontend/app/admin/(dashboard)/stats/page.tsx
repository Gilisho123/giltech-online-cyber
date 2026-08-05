"use client";

import { useEffect, useState } from "react";

interface Stat {
    id: number;
    value: string;
    label: string;
    order: number;
}

const emptyStat = {
    value: "",
    label: "",
    order: 0,
};

export default function StatsPage() {

    const [stats, setStats] = useState<Stat[]>([]);

    const [form, setForm] = useState(emptyStat);

    const [editingId, setEditingId] = useState<number | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {

        const res = await fetch("/api/stats");

        const data = await res.json();

        setStats(data);

        setLoading(false);

    }

    async function saveStat() {

        if (!form.value || !form.label) {
            return alert("Fill all fields");
        }

        if (editingId) {

            await fetch(`/api/stats/${editingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

        } else {

            await fetch("/api/stats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

        }

        setForm(emptyStat);

        setEditingId(null);

        loadStats();

    }

    async function deleteStat(id: number) {

        if (!confirm("Delete this statistic?")) return;

        await fetch(`/api/stats/${id}`, {
            method: "DELETE",
        });

        loadStats();

    }

    if (loading) {

        return <div>Loading...</div>;

    }

    return (

        <main className="space-y-8">

            <div>

                <h1 className="text-4xl font-black">
                    Website Statistics
                </h1>

                <p className="text-slate-500">
                    Manage homepage statistics.
                </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow space-y-4">

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Value (170+)"
                    value={form.value}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            value: e.target.value,
                        })
                    }
                />

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Label"
                    value={form.label}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            label: e.target.value,
                        })
                    }
                />

                <input
                    type="number"
                    className="w-full rounded-xl border p-3"
                    placeholder="Order"
                    value={form.order}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            order: Number(e.target.value),
                        })
                    }
                />

                <button
                    onClick={saveStat}
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white"
                >
                    {editingId ? "Update Statistic" : "Add Statistic"}
                </button>

            </div>

            <div className="rounded-3xl bg-white shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Value</th>

                            <th className="p-4 text-left">Label</th>

                            <th className="p-4 text-left">Order</th>

                            <th className="p-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {stats.map((stat) => (

                            <tr
                                key={stat.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {stat.value}
                                </td>

                                <td className="p-4">
                                    {stat.label}
                                </td>

                                <td className="p-4">
                                    {stat.order}
                                </td>

                                <td className="p-4 flex gap-3">

                                    <button
                                        className="text-blue-600"
                                        onClick={() => {

                                            setEditingId(stat.id);

                                            setForm({

                                                value: stat.value,

                                                label: stat.label,

                                                order: stat.order,

                                            });

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="text-red-600"
                                        onClick={() =>
                                            deleteStat(stat.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </main>

    );

}