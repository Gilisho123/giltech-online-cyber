"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface Partner {
    id: number;
    name: string;
    logo: string;
    website: string | null;
    featured: boolean;
}

const emptyForm = {
    name: "",
    logo: "",
    website: "",
    featured: true,
};

export default function PartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadPartners();
    }, []);

    async function loadPartners() {
        try {
            const res = await fetch("/api/partners");

            if (!res.ok) {
                throw new Error("Failed to load partners");
            }

            const data = await res.json();
            setPartners(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load partners.");
        } finally {
            setLoading(false);
        }
    }

    function updateForm(
        field: keyof typeof emptyForm,
        value: string | boolean
    ) {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function savePartner() {
        if (!form.name.trim() || !form.logo.trim()) {
            alert("Partner name and logo are required.");
            return;
        }

        setSaving(true);

        try {
            const url = editingId
                ? `/api/partners/${editingId}`
                : "/api/partners";

            const method = editingId ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Failed to save partner");
            }

            await loadPartners();

            setForm(emptyForm);
            setEditingId(null);

            alert(
                editingId
                    ? "Partner updated successfully."
                    : "Partner added successfully."
            );
        } catch (error) {
            console.error(error);
            alert("Failed to save partner.");
        } finally {
            setSaving(false);
        }
    }

    function editPartner(partner: Partner) {
        setEditingId(partner.id);

        setForm({
            name: partner.name,
            logo: partner.logo,
            website: partner.website || "",
            featured: partner.featured,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    async function deletePartner(id: number) {
        if (!confirm("Are you sure you want to delete this partner?")) {
            return;
        }

        try {
            const res = await fetch(`/api/partners/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete partner");
            }

            await loadPartners();

            if (editingId === id) {
                setEditingId(null);
                setForm(emptyForm);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete partner.");
        }
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
    }

    if (loading) {
        return (
            <main className="p-8">
                <div className="rounded-2xl bg-white p-10 text-center shadow">
                    Loading partners...
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8">
            {/* HEADER */}

            <div>
                <h1 className="text-4xl font-black text-slate-800">
                    Partners
                </h1>

                <p className="mt-2 text-slate-500">
                    Manage business partners and logos displayed on the website.
                </p>
            </div>

            {/* FORM */}

            <div className="rounded-3xl bg-white p-8 shadow">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {editingId ? "Edit Partner" : "Add Partner"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Add the partner name, logo and optional website.
                    </p>
                </div>

                <div className="space-y-5">
                    {/* NAME */}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Partner Name
                        </label>

                        <input
                            value={form.name}
                            onChange={(e) =>
                                updateForm("name", e.target.value)
                            }
                            placeholder="Partner name"
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                        />
                    </div>

                    {/* LOGO */}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Partner Logo
                        </label>

                        <ImageUploader
                            value={form.logo}
                            onChange={(url) =>
                                updateForm("logo", url)
                            }
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Upload the partner logo. The image will be stored in
                            Cloudinary automatically.
                        </p>
                    </div>

                    {/* WEBSITE */}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Website
                        </label>

                        <input
                            value={form.website}
                            onChange={(e) =>
                                updateForm("website", e.target.value)
                            }
                            placeholder="https://example.com"
                            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-cyan-500"
                        />
                    </div>

                    {/* FEATURED */}

                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) =>
                                updateForm(
                                    "featured",
                                    e.target.checked
                                )
                            }
                            className="h-5 w-5"
                        />

                        <span className="font-semibold text-slate-700">
                            Show on homepage
                        </span>
                    </label>
                </div>

                {/* BUTTONS */}

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        onClick={savePartner}
                        disabled={saving}
                        className="rounded-xl bg-cyan-600 px-7 py-3 font-bold text-white transition hover:bg-cyan-700 disabled:opacity-50"
                    >
                        {saving
                            ? "Saving..."
                            : editingId
                                ? "Update Partner"
                                : "Add Partner"}
                    </button>

                    {editingId && (
                        <button
                            onClick={cancelEdit}
                            disabled={saving}
                            className="rounded-xl bg-slate-200 px-7 py-3 font-bold text-slate-700 hover:bg-slate-300"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* TABLE */}

            <div className="overflow-hidden rounded-3xl bg-white shadow">
                <div className="border-b border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-slate-800">
                        Existing Partners
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {partners.length} partner
                        {partners.length === 1 ? "" : "s"} found.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-4 text-left">Logo</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Website</th>
                                <th className="p-4 text-center">
                                    Featured
                                </th>
                                <th className="p-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {partners.map((partner) => (
                                <tr
                                    key={partner.id}
                                    className="border-t border-slate-100"
                                >
                                    <td className="p-4">
                                        <img
                                            src={
                                                partner.logo ||
                                                "/avatar.png"
                                            }
                                            alt={partner.name}
                                            className="h-14 w-24 rounded-lg object-contain"
                                        />
                                    </td>

                                    <td className="p-4 font-semibold">
                                        {partner.name}
                                    </td>

                                    <td className="p-4 text-slate-600">
                                        {partner.website || "—"}
                                    </td>

                                    <td className="p-4 text-center">
                                        {partner.featured ? "✅" : "❌"}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() =>
                                                    editPartner(
                                                        partner
                                                    )
                                                }
                                                className="font-semibold text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deletePartner(
                                                        partner.id
                                                    )
                                                }
                                                className="font-semibold text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {partners.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-12 text-center text-slate-500"
                                    >
                                        No partners yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}