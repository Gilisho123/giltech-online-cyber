"use client";

import { useEffect, useState } from "react";

interface WhyChoose {
    id: number;
    title: string;
    description: string;
    icon: string;
    order: number;
    active: boolean;
}

const emptyForm = {
    title: "",
    description: "",
    icon: "🚀",
    order: 0,
    active: true,
};

export default function WhyChoosePage() {

    const [items, setItems] = useState<WhyChoose[]>([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {

        const res = await fetch("/api/why-choose");
        const data = await res.json();

        setItems(data);

        setLoading(false);

    }

    async function saveItem() {

        if (!form.title || !form.description) {
            return alert("Please complete all fields.");
        }

        if (editingId) {

            await fetch(`/api/why-choose/${editingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

        } else {

            await fetch("/api/why-choose", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

        }

        setEditingId(null);
        setForm(emptyForm);

        loadItems();

    }

    async function deleteItem(id: number) {

        if (!confirm("Delete this card?")) return;

        await fetch(`/api/why-choose/${id}`, {
            method: "DELETE",
        });

        loadItems();

    }

    if (loading) {

        return <div>Loading...</div>;

    }

    return (

        <main className="space-y-8">

            <div>

                <h1 className="text-4xl font-black">
                    Why Choose Us
                </h1>

                <p className="text-slate-500">
                    Manage homepage feature cards.
                </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow space-y-4">

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value,
                        })
                    }
                />

                <textarea
                    rows={4}
                    className="w-full rounded-xl border p-3"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Icon (🚀)"
                    value={form.icon}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            icon: e.target.value,
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

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        checked={form.active}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                active: e.target.checked,
                            })
                        }
                    />

                    Active

                </label>

                <button
                    onClick={saveItem}
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white"
                >
                    {editingId ? "Update Card" : "Add Card"}
                </button>

            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4">Icon</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Description</th>
                            <th className="p-4">Order</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t"
                            >

                                <td className="p-4 text-3xl">
                                    {item.icon}
                                </td>

                                <td className="p-4">
                                    {item.title}
                                </td>

                                <td className="p-4">
                                    {item.description}
                                </td>

                                <td className="p-4 text-center">
                                    {item.order}
                                </td>

                                <td className="p-4 text-center">

                                    {item.active
                                        ? "✅"
                                        : "❌"}

                                </td>

                                <td className="p-4 flex gap-4">

                                    <button
                                        className="text-blue-600"
                                        onClick={() => {

                                            setEditingId(item.id);

                                            setForm({
                                                title: item.title,
                                                description: item.description,
                                                icon: item.icon,
                                                order: item.order,
                                                active: item.active,
                                            });

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="text-red-600"
                                        onClick={() =>
                                            deleteItem(item.id)
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