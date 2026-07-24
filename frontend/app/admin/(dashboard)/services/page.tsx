"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Star,
    Briefcase,
    LayoutGrid,
    Pencil,
    Trash2,
} from "lucide-react";

import ServiceModal from "@/components/admin/ServiceModal";
import DeleteModal from "@/components/admin/DeleteModal";

interface Service {
    id: number;
    title: string;
    category: string;
    description: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function ServicesPage() {

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [showModal, setShowModal] =
        useState(false);

    const [selectedService, setSelectedService] =
        useState<Service | null>(null);

    const [showDelete, setShowDelete] =
        useState(false);

    const [deleteId, setDeleteId] =
        useState<number | null>(null);

    useEffect(() => {
        loadServices();
    }, []);

    async function loadServices() {

        try {

            const res = await fetch("/api/services");

            const data = await res.json();

            if (Array.isArray(data)) {
                setServices(data);
            } else {
                setServices([]);
            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function deleteService() {

        if (!deleteId) return;

        try {

            const res = await fetch(
                `/api/services/${deleteId}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {

                throw new Error();

            }

            await loadServices();

            setShowDelete(false);

            setDeleteId(null);

        } catch (error) {

            console.error(error);

            alert("Failed to delete service.");

        }

    }
    async function toggleFeatured(id: number) {

        try {

            const res = await fetch(
                "/api/services/toggle-featured",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                }
            );

            if (!res.ok) {

                throw new Error();

            }

            await loadServices();

        } catch (error) {

            console.error(error);

            alert("Failed to update featured status.");

        }

    }

    const filteredServices = useMemo(() => {

        return services.filter((service) => {

            const keyword =
                search.toLowerCase();

            const matchesSearch =

                service.title
                    .toLowerCase()
                    .includes(keyword)

                ||

                service.category
                    .toLowerCase()
                    .includes(keyword)

                ||

                service.description
                    .toLowerCase()
                    .includes(keyword);

            const matchesCategory =

                selectedCategory === "All"

                ||

                service.category ===
                selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );

        });

    }, [
        services,
        search,
        selectedCategory,
    ]);

    const totalServices =
        services.length;

    const featuredServices =
        services.filter(
            (service) => service.featured
        ).length;

    const categories =
        new Set(
            services.map(
                (service) =>
                    service.category
            )
        ).size;

    const categoryList = [

        "All",

        ...Array.from(

            new Set(

                services.map(

                    (service) =>
                        service.category

                )

            )

        ),

    ];

    if (loading) {

        return (

            <div className="flex h-[70vh] items-center justify-center text-xl font-bold text-cyan-400">

                Loading services...

            </div>

        );

    }
    return (

        <main className="min-h-screen bg-[#081225] p-6 text-white">

            {/* Header */}

            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-400">
                        SERVICE MANAGEMENT
                    </span>

                    <h1 className="mt-5 text-4xl font-black">
                        Website Services
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Manage all services displayed on the website.
                    </p>

                </div>

                <button
                    onClick={() => {

                        setSelectedService(null);

                        setShowModal(true);

                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
                >

                    <Plus size={20} />

                    Add Service

                </button>

            </div>

            {/* Statistics */}

            <div className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-3xl border border-cyan-500/20 bg-[#101c33] p-6">

                    <LayoutGrid className="mb-4 text-cyan-400" />

                    <p className="text-slate-400">

                        Total Services

                    </p>

                    <h2 className="mt-2 text-5xl font-black text-cyan-400">

                        {totalServices}

                    </h2>

                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-[#101c33] p-6">

                    <Star className="mb-4 text-yellow-400" />

                    <p className="text-slate-400">

                        Featured Services

                    </p>

                    <h2 className="mt-2 text-5xl font-black text-yellow-400">

                        {featuredServices}

                    </h2>

                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-[#101c33] p-6">

                    <Briefcase className="mb-4 text-green-400" />

                    <p className="text-slate-400">

                        Categories

                    </p>

                    <h2 className="mt-2 text-5xl font-black text-green-400">

                        {categories}

                    </h2>

                </div>

            </div>

            {/* Search & Filter */}

            <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_260px]">

                <div className="relative">

                    <Search
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <input
                        type="text"
                        placeholder="Search services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-2xl border border-cyan-500/20 bg-[#101c33] py-4 pl-14 pr-5 text-white outline-none focus:border-cyan-400"
                    />

                </div>

                <select

                    value={selectedCategory}

                    onChange={(e) =>
                        setSelectedCategory(
                            e.target.value
                        )
                    }

                    className="rounded-2xl border border-cyan-500/20 bg-[#101c33] px-5 text-white outline-none focus:border-cyan-400"

                >

                    {categoryList.map((category) => (

                        <option
                            key={category}
                            value={category}
                        >

                            {category}

                        </option>

                    ))}

                </select>

            </div>
            <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#101c33]">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-cyan-500/10">

                            <tr>

                                <th className="px-6 py-5 text-left text-sm font-bold uppercase text-cyan-300">
                                    Title
                                </th>

                                <th className="px-6 py-5 text-left text-sm font-bold uppercase text-cyan-300">
                                    Category
                                </th>

                                <th className="px-6 py-5 text-left text-sm font-bold uppercase text-cyan-300">
                                    Featured
                                </th>

                                <th className="px-6 py-5 text-left text-sm font-bold uppercase text-cyan-300">
                                    Created
                                </th>

                                <th className="px-6 py-5 text-center text-sm font-bold uppercase text-cyan-300">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredServices.map((service) => (

                                <tr
                                    key={service.id}
                                    className="border-b border-cyan-500/10 transition hover:bg-cyan-500/10"
                                >

                                    <td className="px-6 py-5">

                                        <div className="font-bold">

                                            {service.title}

                                        </div>

                                        <div className="mt-1 max-w-md text-sm text-slate-400">

                                            {service.description}

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 whitespace-nowrap">

                                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm">

                                            {service.category}

                                        </span>

                                    </td>

                                    <td className="px-6 py-5 whitespace-nowrap">

                                        <button
                                            onClick={() => toggleFeatured(service.id)}
                                            className={`rounded-full px-4 py-2 text-sm font-bold transition ${service.featured
                                                ? "bg-green-600 text-white hover:bg-green-700"
                                                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                                }`}
                                        >

                                            {service.featured ? "ON" : "OFF"}

                                        </button>

                                    </td>

                                    <td className="px-6 py-5 whitespace-nowrap text-slate-400">

                                        {new Date(
                                            service.createdAt
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center gap-3">

                                            <button

                                                onClick={() => {

                                                    setSelectedService(service);

                                                    setShowModal(true);

                                                }}

                                                className="rounded-xl bg-cyan-600 p-2 transition hover:bg-cyan-700"

                                                title="Edit Service"

                                            >

                                                <Pencil size={18} />

                                            </button>

                                            <button

                                                onClick={() => {

                                                    setDeleteId(service.id);

                                                    setShowDelete(true);

                                                }}

                                                className="rounded-xl bg-red-600 p-2 transition hover:bg-red-700"

                                                title="Delete Service"

                                            >

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                            {filteredServices.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-20 text-center"
                                    >

                                        <LayoutGrid
                                            size={60}
                                            className="mx-auto mb-4 text-slate-600"
                                        />

                                        <h2 className="text-2xl font-bold text-slate-300">

                                            No Services Found

                                        </h2>

                                        <p className="mt-2 text-slate-500">

                                            Try changing your search or category filter.

                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
            <ServiceModal
                open={showModal}
                service={selectedService}
                onClose={() => {
                    setShowModal(false);
                    setSelectedService(null);
                }}
                onSuccess={async () => {
                    await loadServices();
                    setShowModal(false);
                    setSelectedService(null);
                }}
            />

            <DeleteModal
                open={showDelete}
                title="Delete Service"
                message="This action cannot be undone. Do you want to permanently delete this service?"
                onCancel={() => {
                    setShowDelete(false);
                    setDeleteId(null);
                }}
                onConfirm={deleteService}
            />

        </main>
    );
}