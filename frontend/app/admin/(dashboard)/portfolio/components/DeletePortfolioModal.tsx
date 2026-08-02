"use client";

import { PortfolioProject } from "./PortfolioTable";

interface Props {
    open: boolean;
    project: PortfolioProject | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DeletePortfolioModal({
    open,
    project,
    onClose,
    onSuccess,
}: Props) {

    if (!open || !project) return null;

    async function deleteProject() {

        try {

            const res = await fetch(

                `/api/portfolio/${project!.id}`,

                {

                    method: "DELETE",

                }

            );

            const data = await res.json();

            if (!res.ok) {

                alert(data.message || "Failed to delete project.");

                return;

            }

            alert("Project deleted successfully.");

            onSuccess();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

                <div className="border-b border-slate-200 px-8 py-6">

                    <h2 className="text-3xl font-black text-red-600">

                        Delete Project

                    </h2>

                </div>

                <div className="p-8">

                    <p className="text-lg text-slate-700">

                        Are you sure you want to permanently delete this project?

                    </p>

                    <div className="mt-6 rounded-xl bg-slate-100 p-4">

                        <h3 className="text-xl font-bold text-slate-800">

                            {project.title}

                        </h3>

                        <p className="mt-2 text-slate-600">

                            {project.category}

                        </p>

                    </div>

                    <p className="mt-6 text-sm text-red-600">

                        This action cannot be undone.

                    </p>

                </div>

                <div className="flex justify-end gap-4 border-t border-slate-200 px-8 py-6">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={deleteProject}
                        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                    >

                        Delete Project

                    </button>

                </div>

            </div>

        </div>

    );

}