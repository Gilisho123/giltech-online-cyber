"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PortfolioProject } from "./PortfolioTable";

interface Props {
    open: boolean;
    project: PortfolioProject | null;
    onClose: () => void;
    onSuccess: () => void;
}

const emptyForm = {
    title: "",
    category: "",
    description: "",
    image: "",
    technologies: "",
    projectUrl: "",
    githubUrl: "",
    featured: false,
    active: true,
};

export default function PortfolioModal({
    open,
    project,
    onClose,
    onSuccess,
}: Props) {

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {

        if (project) {

            setForm({

                title: project.title,
                category: project.category,
                description: project.description,
                image: project.image,
                technologies: project.technologies,
                projectUrl: project.projectUrl ?? "",
                githubUrl: project.githubUrl ?? "",
                featured: project.featured,
                active: project.active,

            });

        } else {

            setForm(emptyForm);

        }

    }, [project, open]);

    if (!open) return null;

    function update(
        field: keyof typeof form,
        value: string | boolean
    ) {

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

    }

    async function uploadImage(file: File) {

        setUploading(true);

        try {

            const formData = new FormData();

            formData.append("file", file);

            const res = await fetch("/api/upload", {

                method: "POST",

                body: formData,

            });

            const data = await res.json();

            if (!res.ok) {

                alert(data.message || "Image upload failed.");

                return;

            }

            setForm((prev) => ({

                ...prev,

                image: data.url,

            }));

        }

        catch (error) {

            console.error(error);

            alert("Image upload failed.");

        }

        finally {

            setUploading(false);

        }

    }

    async function saveProject() {

        if (
            !form.title.trim() ||
            !form.category.trim() ||
            !form.description.trim()
        ) {

            alert("Title, Category and Description are required.");

            return;

        }

        setSaving(true);

        try {

            const editing = project !== null;

            const url = editing
                ? `/api/portfolio/${project!.id}`
                : "/api/portfolio";

            const method = editing ? "PATCH" : "POST";

            const res = await fetch(url, {

                method,

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(form),

            });

            const data = await res.json();

            if (!res.ok) {

                alert(data.message || "Failed to save project.");

                return;

            }

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }

        finally {

            setSaving(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

                <div className="border-b px-8 py-6">

                    <h2 className="text-3xl font-black text-slate-800">

                        {project ? "Edit Project" : "Add Project"}

                    </h2>

                </div>

                <div className="space-y-6 p-8">

                    <div>

                        <label className="mb-2 block font-semibold">

                            Project Title

                        </label>

                        <input
                            value={form.title}
                            onChange={(e) =>
                                update("title", e.target.value)
                            }
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Category

                        </label>

                        <input
                            value={form.category}
                            onChange={(e) =>
                                update("category", e.target.value)
                            }
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Description

                        </label>

                        <textarea
                            rows={5}
                            value={form.description}
                            onChange={(e) =>
                                update("description", e.target.value)
                            }
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Project Image

                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {

                                const file = e.target.files?.[0];

                                if (file) {

                                    uploadImage(file);

                                }

                            }}
                            className="w-full rounded-xl border p-3"
                        />

                        {uploading && (

                            <p className="mt-3 text-cyan-600">

                                Uploading image...

                            </p>

                        )}

                        {form.image && (

                            <div className="relative mt-5 h-52 w-full overflow-hidden rounded-xl border">

                                <Image
                                    src={form.image}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />

                            </div>

                        )}

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Technologies

                        </label>

                        <input
                            value={form.technologies}
                            onChange={(e) =>
                                update("technologies", e.target.value)
                            }
                            placeholder="React, Next.js, Prisma"
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Live Project URL

                        </label>

                        <input
                            value={form.projectUrl}
                            onChange={(e) =>
                                update("projectUrl", e.target.value)
                            }
                            placeholder="https://..."
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            GitBranch URL

                        </label>

                        <input
                            value={form.githubUrl}
                            onChange={(e) =>
                                update("githubUrl", e.target.value)
                            }
                            placeholder="https://..."
                            className="w-full rounded-xl border p-3"
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={(e) =>
                                    update("featured", e.target.checked)
                                }
                            />

                            Featured Project

                        </label>

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                checked={form.active}
                                onChange={(e) =>
                                    update("active", e.target.checked)
                                }
                            />

                            Active

                        </label>

                    </div>

                </div>

                <div className="flex justify-end gap-4 border-t px-8 py-6">

                    <button
                        onClick={onClose}
                        className="rounded-xl border px-6 py-3"
                    >

                        Cancel

                    </button>

                    <button
                        disabled={saving || uploading}
                        onClick={saveProject}
                        className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700 disabled:opacity-50"
                    >

                        {saving
                            ? "Saving..."
                            : project
                                ? "Update Project"
                                : "Create Project"}

                    </button>

                </div>

            </div>

        </div>

    );

}