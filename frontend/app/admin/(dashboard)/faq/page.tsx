"use client";

import { useEffect, useState } from "react";

import FAQTable from "./components/FAQTable";
import FAQModal from "./components/FAQModal";
import DeleteFAQModal from "./components/DeleteFAQModal";

interface FAQ {
    id: number;
    question: string;
    answer: string;
    order: number;
    featured: boolean;
}

interface FAQForm {
    question: string;
    answer: string;
    order: number;
    featured: boolean;
}

const emptyForm: FAQForm = {
    question: "",
    answer: "",
    order: 0,
    featured: true,
};

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [form, setForm] = useState<FAQForm>(emptyForm);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        loadFAQs();
    }, []);

    async function loadFAQs() {
        try {
            setLoading(true);

            const res = await fetch("/api/faq");

            if (!res.ok) {
                throw new Error("Failed to load FAQs.");
            }

            const data = await res.json();

            setFaqs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            alert("Failed to load FAQs.");
        } finally {
            setLoading(false);
        }
    }

    function openAddModal() {
        setEditingId(null);

        setForm({
            ...emptyForm,
            order: faqs.length,
        });

        setModalOpen(true);
    }

    function openEditModal(faq: FAQ) {
        setEditingId(faq.id);

        setForm({
            question: faq.question,
            answer: faq.answer,
            order: faq.order,
            featured: faq.featured,
        });

        setModalOpen(true);
    }

    function closeModal() {
        if (saving) return;

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    async function saveFAQ() {
        if (!form.question.trim() || !form.answer.trim()) {
            alert("Please complete the question and answer.");
            return;
        }

        if (form.order < 0) {
            alert("Display order cannot be negative.");
            return;
        }

        setSaving(true);

        try {
            const isEditing = editingId !== null;

            const url = isEditing
                ? `/api/faq/${editingId}`
                : "/api/faq";

            const method = isEditing ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Failed to save FAQ.");
            }

            setModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);

            await loadFAQs();
        } catch (error) {
            console.error(error);
            alert("Failed to save FAQ.");
        } finally {
            setSaving(false);
        }
    }

    function openDeleteModal(faq: FAQ) {
        setSelectedFAQ(faq);
        setDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        if (deleting) return;

        setDeleteModalOpen(false);
        setSelectedFAQ(null);
    }

    async function deleteFAQ() {
        if (!selectedFAQ) return;

        setDeleting(true);

        try {
            const res = await fetch(
                `/api/faq/${selectedFAQ.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete FAQ.");
            }

            setDeleteModalOpen(false);
            setSelectedFAQ(null);

            await loadFAQs();
        } catch (error) {
            console.error(error);
            alert("Failed to delete FAQ.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <main className="space-y-8">

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <h1 className="text-4xl font-black text-slate-800">
                        Frequently Asked Questions
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage questions and answers displayed on the website.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-cyan-700"
                >
                    + Add FAQ
                </button>

            </div>

            {/* Statistics */}

            <div className="grid gap-5 md:grid-cols-3">

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-sm font-semibold text-slate-500">
                        Total FAQs
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-800">
                        {faqs.length}
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-sm font-semibold text-slate-500">
                        Featured FAQs
                    </p>

                    <p className="mt-2 text-3xl font-black text-cyan-600">
                        {
                            faqs.filter(
                                (faq) => faq.featured
                            ).length
                        }
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-sm font-semibold text-slate-500">
                        Other FAQs
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-800">
                        {
                            faqs.filter(
                                (faq) => !faq.featured
                            ).length
                        }
                    </p>
                </div>

            </div>

            {/* Table */}

            {loading ? (
                <div className="rounded-3xl bg-white p-12 text-center shadow">
                    <p className="text-slate-500">
                        Loading FAQs...
                    </p>
                </div>
            ) : (
                <FAQTable
                    faqs={faqs}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                />
            )}

            {/* Add / Edit */}

            <FAQModal
                open={modalOpen}
                onClose={closeModal}
                form={form}
                setForm={setForm}
                onSave={saveFAQ}
                loading={saving}
                editing={editingId !== null}
            />

            {/* Delete Confirmation */}

            <DeleteFAQModal
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={deleteFAQ}
                loading={deleting}
                question={selectedFAQ?.question}
            />

        </main>
    );
}