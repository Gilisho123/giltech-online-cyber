"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import PortfolioTable, {
    PortfolioProject,
} from "./components/PortfolioTable";

import PortfolioModal from "./components/PortfolioModal";
import DeletePortfolioModal from "./components/DeletePortfolioModal";

export default function PortfolioAdminPage() {

    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedProject, setSelectedProject] =
        useState<PortfolioProject | null>(null);

    async function loadProjects() {

        try {

            setLoading(true);

            const res = await fetch("/api/portfolio");

            if (!res.ok) {
                throw new Error("Failed to fetch projects");
            }

            const data = await res.json();

            setProjects(data);

        }

        catch (error) {

            console.error(error);

            alert("Failed to load portfolio projects.");

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadProjects();

    }, []);

    function handleAdd() {

        setSelectedProject(null);

        setModalOpen(true);

    }

    function handleEdit(project: PortfolioProject) {

        setSelectedProject(project);

        setModalOpen(true);

    }

    function handleDelete(project: PortfolioProject) {

        setSelectedProject(project);

        setDeleteOpen(true);

    }

    return (

        <main className="space-y-8">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-black text-slate-800">

                        Portfolio Management

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Manage all portfolio projects.

                    </p>

                </div>

                <button
                    onClick={handleAdd}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
                >

                    <Plus size={20} />

                    Add Project

                </button>

            </div>

            {loading ? (

                <div className="rounded-3xl bg-white p-20 text-center shadow">

                    <h2 className="text-2xl font-bold text-slate-700">

                        Loading Portfolio...

                    </h2>

                </div>

            ) : (

                <PortfolioTable

                    projects={projects}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            )}

            <PortfolioModal

                open={modalOpen}

                project={selectedProject}

                onClose={() => {

                    setModalOpen(false);

                    setSelectedProject(null);

                }}

                onSuccess={loadProjects}

            />

            <DeletePortfolioModal

                open={deleteOpen}

                project={selectedProject}

                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedProject(null);

                }}

                onSuccess={loadProjects}

            />

        </main>

    );

}