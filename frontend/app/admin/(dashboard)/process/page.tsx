"use client";

import { useEffect, useState } from "react";

interface ProcessStep {
    id: number;
    title: string;
    description: string;
    stepNumber: number;
    active: boolean;
}

const emptyForm = {
    title: "",
    description: "",
    stepNumber: 1,
    active: true,
};

export default function ProcessPage() {

    const [steps, setSteps] = useState<ProcessStep[]>([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSteps();
    }, []);

    async function loadSteps() {

        const res = await fetch("/api/process");
        const data = await res.json();

        setSteps(data);
        setLoading(false);

    }

    async function saveStep() {

        if (!form.title || !form.description) {
            return alert("Complete all fields.");
        }

        if (editingId) {

            await fetch(`/api/process/${editingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

        } else {

            await fetch("/api/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

        }

        setEditingId(null);
        setForm(emptyForm);

        loadSteps();

    }

    async function deleteStep(id: number) {

        if (!confirm("Delete this step?")) return;

        await fetch(`/api/process/${id}`, {
            method: "DELETE",
        });

        loadSteps();

    }

    if (loading) {

        return <div>Loading...</div>;

    }

    return (

        <main className="space-y-8">

            <div>

                <h1 className="text-4xl font-black">
                    How It Works
                </h1>

                <p className="text-slate-500">
                    Manage homepage process steps.
                </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow space-y-4">

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Step Title"
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
                    type="number"
                    className="w-full rounded-xl border p-3"
                    placeholder="Step Number"
                    value={form.stepNumber}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            stepNumber: Number(e.target.value),
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
                    onClick={saveStep}
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white"
                >
                    {editingId ? "Update Step" : "Add Step"}
                </button>

            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4">Step</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Description</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {steps.map((step) => (

                            <tr
                                key={step.id}
                                className="border-t"
                            >

                                <td className="p-4 text-center">
                                    {step.stepNumber}
                                </td>

                                <td className="p-4">
                                    {step.title}
                                </td>

                                <td className="p-4">
                                    {step.description}
                                </td>

                                <td className="p-4 text-center">
                                    {step.active ? "✅" : "❌"}
                                </td>

                                <td className="p-4 flex gap-4">

                                    <button
                                        className="text-blue-600"
                                        onClick={() => {

                                            setEditingId(step.id);

                                            setForm({
                                                title: step.title,
                                                description: step.description,
                                                stepNumber: step.stepNumber,
                                                active: step.active,
                                            });

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="text-red-600"
                                        onClick={() =>
                                            deleteStep(step.id)
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