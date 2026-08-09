"use client";

import { useEffect, useState } from "react";
import WhyChooseTable from "./components/WhyChooseTable";
import WhyChooseModal from "./components/WhyChooseModal";
import DeleteWhyChooseModal from "./components/DeleteWhyChooseModal";

interface WhyChoose {
    id: number;
    title: string;
    description: string;
    icon: string;
    order: number;
    active: boolean;
}

interface WhyChooseForm {
    title: string;
    description: string;
    icon: string;
    order: number;
    active: boolean;
}

const emptyForm: WhyChooseForm = {
    title: "",
    description: "",
    icon: "🚀",
    order: 0,
    active: true,
};

export default function WhyChoosePage() {
    const [items, setItems] = useState<WhyChoose[]>([]);
    const [form, setForm] = useState<WhyChooseForm>(emptyForm);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        try {
            const res = await fetch("/api/why-choose");

            if (!res.ok) {
                throw new Error("Failed to load items");
            }

            const data = await res.json();

            setItems(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load Why Choose items.");
        } finally {
            setLoading(false);
        }
    }

    function openAddModal() {
        setEditingId(null);
        setForm(emptyForm);
        setModalOpen(true);
    }

    function openEditModal(item: WhyChoose) {
        setEditingId(item.id);

        setForm({
            title: item.title,
            description: item.description,
            icon: item.icon,
            order: item.order,
            active: item.active,
        });

        setModalOpen(true);
    }

    function closeModal() {
        if (saving) return;

        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    }

    async function saveItem() {
        if (!form.title.trim() || !form.description.trim()) {
            alert("Please complete the title and description.");
            return;
        }

        setSaving(true);

        try {
            const url = editingId
                ? `/api/why-choose/${editingId}`
                : "/api/why-choose";

            const method = editingId ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Failed to save item");
            }

            setModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);

            await loadItems();
        } catch (error) {
            console.error(error);
            alert("Failed to save Why Choose item.");
        } finally {
            setSaving(false);
        }
    }

    function openDeleteModal(id: number) {
        setDeleteId(id);
        setDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        if (deleting) return;

        setDeleteModalOpen(false);
        setDeleteId(null);
    }

    async function deleteItem() {
        if (!deleteId) return;

        setDeleting(true);

        try {
            const res = await fetch(
                `/api/why-choose/${deleteId}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete item");
            }

            setDeleteModalOpen(false);
            setDeleteId(null);

            await loadItems();
        } catch (error) {
            console.error(error);
            alert("Failed to delete Why Choose item.");
        } finally {
            setDeleting(false);
        }
    }

    if (loading) {
        return (
            <main className="p-8">
                <div className="rounded-3xl bg-white p-12 text-center shadow">
                    Loading Why Choose...
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
                        Why Choose Us
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage the feature cards displayed on the homepage.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-cyan-700"
                >
                    + Add Card
                </button>

            </div>

            {/* Statistics */}

            <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-sm font-semibold text-slate-500">
                        Total Cards
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-800">
                        {items.length}
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-sm font-semibold text-slate-500">
                        Active
                    </p>

                    <p className="mt-2 text-3xl font-black text-green-600">
                        {items.filter((item) => item.active).length}
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-sm font-semibold text-slate-500">
                        Inactive
                    </p>

                    <p className="mt-2 text-3xl font-black text-red-600">
                        {items.filter((item) => !item.active).length}
                    </p>
                </div>

            </div>

            {/* Table */}

            <WhyChooseTable
                items={items}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            {/* Add / Edit Modal */}

            <WhyChooseModal
                open={modalOpen}
                onClose={closeModal}
                form={form}
                setForm={setForm}
                onSave={saveItem}
                loading={saving}
                editing={editingId !== null}
            />

            {/* Delete Confirmation */}

            <DeleteWhyChooseModal
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={deleteItem}
                loading={deleting}
            />

        </main>
    );
}