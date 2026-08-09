"use client";

import { useEffect, useState } from "react";

import TestimonialTable from "./components/TestimonialTable";
import TestimonialModal from "./components/TestimonialModal";
import DeleteTestimonialModal from "./components/DeleteTestimonialModal";

interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    message: string;
    rating: number;
    image: string;
}

interface TestimonialForm {
    name: string;
    position: string;
    company: string;
    message: string;
    rating: number;
    image: string;
}

const emptyForm: TestimonialForm = {
    name: "",
    position: "",
    company: "",
    message: "",
    rating: 5,
    image: "",
};

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    const [form, setForm] =
        useState<TestimonialForm>(emptyForm);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [selectedTestimonial, setSelectedTestimonial] =
        useState<Testimonial | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    useEffect(() => {
        loadTestimonials();
    }, []);

    async function loadTestimonials() {
        try {
            setLoading(true);

            const res = await fetch("/api/testimonials");

            if (!res.ok) {
                throw new Error("Failed to load testimonials.");
            }

            const data = await res.json();

            setTestimonials(
                Array.isArray(data) ? data : []
            );
        } catch (error) {
            console.error(error);

            alert("Failed to load testimonials.");
        } finally {
            setLoading(false);
        }
    }

    function openAddModal() {
        setEditingId(null);
        setForm(emptyForm);
        setModalOpen(true);
    }

    function openEditModal(testimonial: Testimonial) {
        setEditingId(testimonial.id);

        setForm({
            name: testimonial.name,
            position: testimonial.position,
            company: testimonial.company,
            message: testimonial.message,
            rating: testimonial.rating,
            image: testimonial.image,
        });

        setModalOpen(true);
    }

    function closeModal() {
        if (saving) return;

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    async function saveTestimonial() {
        if (
            !form.name.trim() ||
            !form.position.trim() ||
            !form.company.trim() ||
            !form.message.trim()
        ) {
            alert("Please complete all required fields.");
            return;
        }

        if (form.rating < 1 || form.rating > 5) {
            alert("Rating must be between 1 and 5.");
            return;
        }

        setSaving(true);

        try {
            const isEditing = editingId !== null;

            const url = isEditing
                ? `/api/testimonials/${editingId}`
                : "/api/testimonials";

            const method = isEditing
                ? "PATCH"
                : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error(
                    "Failed to save testimonial."
                );
            }

            setModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);

            await loadTestimonials();

        } catch (error) {
            console.error(error);

            alert("Failed to save testimonial.");
        } finally {
            setSaving(false);
        }
    }

    function openDeleteModal(testimonial: Testimonial) {
        setSelectedTestimonial(testimonial);
        setDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        if (deleting) return;

        setDeleteModalOpen(false);
        setSelectedTestimonial(null);
    }

    async function deleteTestimonial() {
        if (!selectedTestimonial) return;

        setDeleting(true);

        try {
            const res = await fetch(
                `/api/testimonials/${selectedTestimonial.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error(
                    "Failed to delete testimonial."
                );
            }

            setDeleteModalOpen(false);
            setSelectedTestimonial(null);

            await loadTestimonials();

        } catch (error) {
            console.error(error);

            alert("Failed to delete testimonial.");
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
                        Testimonials
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage client testimonials displayed on the website.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-cyan-700"
                >
                    + Add Testimonial
                </button>

            </div>

            {/* Statistics */}

            <div className="grid gap-5 md:grid-cols-3">

                <div className="rounded-2xl bg-white p-6 shadow">

                    <p className="text-sm font-semibold text-slate-500">
                        Total Testimonials
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-800">
                        {testimonials.length}
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <p className="text-sm font-semibold text-slate-500">
                        Average Rating
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-800">

                        {testimonials.length > 0
                            ? (
                                testimonials.reduce(
                                    (total, item) =>
                                        total + item.rating,
                                    0
                                ) / testimonials.length
                            ).toFixed(1)
                            : "0.0"}

                        <span className="ml-1 text-lg text-yellow-500">
                            ★
                        </span>

                    </p>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <p className="text-sm font-semibold text-slate-500">
                        Five Star Reviews
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-800">

                        {
                            testimonials.filter(
                                (item) => item.rating === 5
                            ).length
                        }

                    </p>

                </div>

            </div>

            {/* Loading */}

            {loading ? (

                <div className="rounded-3xl bg-white p-12 text-center shadow">

                    <p className="text-slate-500">
                        Loading testimonials...
                    </p>

                </div>

            ) : (

                <TestimonialTable
                    testimonials={testimonials}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                />

            )}

            {/* Add / Edit Modal */}

            <TestimonialModal
                open={modalOpen}
                onClose={closeModal}
                form={form}
                setForm={setForm}
                onSave={saveTestimonial}
                loading={saving}
                editing={editingId !== null}
            />

            {/* Delete Confirmation */}

            <DeleteTestimonialModal
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={deleteTestimonial}
                loading={deleting}
                testimonialName={
                    selectedTestimonial?.name
                }
            />

        </main>
    );
}