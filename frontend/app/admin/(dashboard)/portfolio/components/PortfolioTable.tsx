"use client";

import {
    Pencil,
    Trash2,
    ExternalLink,
    GitBranch,
    Star,
    StarOff,
} from "lucide-react";

export interface PortfolioProject {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    technologies: string;
    projectUrl: string | null;
    githubUrl: string | null;
    featured: boolean;
    active: boolean;
    createdAt: string;
}

interface Props {
    projects: PortfolioProject[];
    onEdit: (project: PortfolioProject) => void;
    onDelete: (project: PortfolioProject) => void;
}

export default function PortfolioTable({
    projects,
    onEdit,
    onDelete,
}: Props) {
    if (projects.length === 0) {
        return (
            <div className="rounded-3xl bg-white p-20 text-center shadow">

                <h2 className="text-3xl font-bold text-slate-700">

                    No Portfolio Projects

                </h2>

                <p className="mt-4 text-slate-500">

                    Click <strong>Add Project</strong> to create your first
                    portfolio project.

                </p>

            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-4 text-left">

                            Title

                        </th>

                        <th className="px-6 py-4 text-left">

                            Category

                        </th>

                        <th className="px-6 py-4 text-center">

                            Featured

                        </th>

                        <th className="px-6 py-4 text-center">

                            Status

                        </th>

                        <th className="px-6 py-4 text-center">

                            Links

                        </th>

                        <th className="px-6 py-4 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {projects.map((project) => (

                        <tr
                            key={project.id}
                            className="border-b hover:bg-slate-50"
                        >

                            <td className="px-6 py-5">

                                <h3 className="font-bold text-slate-800">

                                    {project.title}

                                </h3>

                                <p className="mt-1 line-clamp-2 text-sm text-slate-500">

                                    {project.description}

                                </p>

                            </td>

                            <td className="px-6 py-5">

                                {project.category}

                            </td>

                            <td className="px-6 py-5 text-center">

                                {project.featured ? (

                                    <Star
                                        size={20}
                                        className="mx-auto fill-yellow-400 text-yellow-400"
                                    />

                                ) : (

                                    <StarOff
                                        size={20}
                                        className="mx-auto text-slate-300"
                                    />

                                )}

                            </td>

                            <td className="px-6 py-5 text-center">

                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${project.active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {project.active
                                        ? "Active"
                                        : "Inactive"}
                                </span>

                            </td>

                            <td className="px-6 py-5">

                                <div className="flex justify-center gap-4">

                                    {project.projectUrl && (

                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Live Project"
                                        >

                                            <ExternalLink
                                                size={20}
                                                className="text-cyan-600 hover:scale-110"
                                            />

                                        </a>

                                    )}

                                    {project.githubUrl && (

                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="GitBranch"
                                        >

                                            <GitBranch
                                                size={20}
                                                className="text-slate-700 hover:scale-110"
                                            />

                                        </a>

                                    )}

                                </div>

                            </td>

                            <td className="px-6 py-5">

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() => onEdit(project)}
                                        className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                                    >

                                        <Pencil size={18} />

                                    </button>

                                    <button
                                        onClick={() => onDelete(project)}
                                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                                    >

                                        <Trash2 size={18} />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}