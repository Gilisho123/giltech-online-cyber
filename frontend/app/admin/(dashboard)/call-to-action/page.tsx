"use client";

import { useEffect, useState } from "react";
import CallToActionModal from "./components/CallToActionModal";
import DeleteCallToActionModal from "./components/DeleteCallToActionModal";

interface CallToAction {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    active: boolean;
}

interface CallToActionForm {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    active: boolean;
}

const emptyForm: CallToActionForm = {
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    active: true,
};

export default function CallToActionPage() {
    const [cta, setCta] = useState<CallToAction | null>(null);
    const [form, setForm] =
        useState<CallToActionForm>(emptyForm);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    useEffect(() => {
        loadCTA();
    }, []);

    async function loadCTA() {
        try {
            const res = await fetch("/api/call-to-action");

            if (!res.ok) {
                throw new Error("Failed to load CTA");
            }

            const data = await res.json();

            setCta(data);

            if (data) {
                setForm({
                    title: data.title ?? "",
                    description: data.description ?? "",
                    buttonText: data.buttonText ?? "",
                    buttonLink: data.buttonLink ?? "",
                    active: data.active ?? true,
                });
            }
        } catch (error) {
            console.error(error);
            alert("Failed to load Call To Action.");
        } finally {
            setLoading(false);
        }
    }

    function openEditModal() {
        if (!cta) {
            setForm(emptyForm);
        } else {
            setForm({
                title: cta.title,
                description: cta.description,
                buttonText: cta.buttonText,
                buttonLink: cta.buttonLink,
                active: cta.active,
            });
        }

        setModalOpen(true);
    }

    function closeModal() {
        if (saving) return;

        setModalOpen(false);
    }

    async function saveCTA() {
        if (
            !form.title.trim() ||
            !form.description.trim() ||
            !form.buttonText.trim() ||
            !form.buttonLink.trim()
        ) {
            alert("Please complete all fields.");
            return;
        }

        setSaving(true);

        try {
            const method = cta ? "PATCH" : "POST";

            const res = await fetch("/api/call-to-action", {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Failed to save CTA");
            }

            const data = await res.json();

            setCta(data);
            setModalOpen(false);

            await loadCTA();
        } catch (error) {
            console.error(error);
            alert("Failed to save Call To Action.");
        } finally {
            setSaving(false);
        }
    }

    function openDeleteModal() {
        if (!cta) return;

        setDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        if (deleting) return;

        setDeleteModalOpen(false);
    }

    async function deleteCTA() {
        if (!cta) return;

        setDeleting(true);

        try {
            const res = await fetch(
                `/api/call-to-action/${cta.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete CTA");
            }

            setCta(null);
            setForm(emptyForm);
            setDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
            alert("Failed to delete Call To Action.");
        } finally {
            setDeleting(false);
        }
    }

    if (loading) {
        return (
            <main className="p-8">
                <div className="rounded-3xl bg-white p-12 text-center shadow">
                    Loading Call To Action...
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-8">

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <h1 className="text-4xl font-black text-slate-800">
                        Call To Action
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage the Call To Action displayed on the homepage.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openEditModal}
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-cyan-700"
                >
                    {cta ? "Edit CTA" : "Create CTA"}
                </button>

            </div>

            {/* CTA Preview */}

            {cta ? (
                <div className="rounded-3xl bg-white p-8 shadow">

                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

                        <div className="max-w-3xl">

                            <div className="mb-4">

                                <span
                                    className={
                                        cta.active
                                            ? "rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700"
                                            : "rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700"
                                    }
                                >
                                    {cta.active
                                        ? "Active"
                                        : "Inactive"}
                                </span>

                            </div>

                            <h2 className="text-3xl font-black text-slate-800">
                                {cta.title}
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                {cta.description}
                            </p>

                            <div className="mt-6">

                                <span className="inline-block rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white">
                                    {cta.buttonText}
                                </span>

                            </div>

                            <p className="mt-4 text-sm text-slate-400">
                                Link: {cta.buttonLink}
                            </p>

                        </div>

                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={openEditModal}
                                className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={openDeleteModal}
                                className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            ) : (
                <div className="rounded-3xl bg-white p-12 text-center shadow">

                    <div className="text-5xl">
                        📢
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-slate-800">
                        No Call To Action Found
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Create a CTA to display it on your homepage.
                    </p>

                    <button
                        type="button"
                        onClick={openEditModal}
                        className="mt-6 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700"
                    >
                        Create CTA
                    </button>

                </div>
            )}

            {/* Edit Modal */}

            <CallToActionModal
                open={modalOpen}
                onClose={closeModal}
                form={form}
                setForm={setForm}
                onSave={saveCTA}
                loading={saving}
            />

            {/* Delete Confirmation */}

            <DeleteCallToActionModal
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={deleteCTA}
                loading={deleting}
            />

        </main>
    );
}