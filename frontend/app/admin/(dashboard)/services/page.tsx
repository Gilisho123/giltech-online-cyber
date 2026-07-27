"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Plus,
    Star,
    Briefcase,
    LayoutGrid,
    Pencil,
    Trash2,
} from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminTable from "@/components/admin/AdminTable";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminActionButton from "@/components/admin/AdminActionButton";
import StatusBadge from "@/components/admin/StatusBadge";

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

            if (!res.ok) throw new Error();

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

            if (!res.ok) throw new Error();

            await loadServices();

        } catch (error) {

            console.error(error);

            alert("Failed to update featured status.");

        }

    }

    const filteredServices = useMemo(() => {

        return services.filter((service) => {

            const keyword = search.toLowerCase();

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

                service.category === selectedCategory;

            return matchesSearch && matchesCategory;

        });

    }, [
        services,
        search,
        selectedCategory,
    ]);

    const totalServices = services.length;

    const featuredServices =
        services.filter(
            (service) => service.featured
        ).length;

    const categories =
        new Set(
            services.map(
                (service) => service.category
            )
        ).size;

    const categoryList = [

        "All",

        ...Array.from(

            new Set(

                services.map(
                    (service) => service.category
                )

            )

        ),

    ];

    if (loading) {

        return (
            <AdminLoading
                cards={3}
                rows={8}
            />
        );

    }

    const columns = [

        {
            key: "title",
            label: "Service",
        },

        {
            key: "category",
            label: "Category",
        },

        {
            key: "featured",
            label: "Featured",
        },

        {
            key: "created",
            label: "Created",
        },

        {
            key: "actions",
            label: "Actions",
        },

    ];

    return (

        <div className="space-y-8">

            <AdminPageHeader

                badge="SERVICE MANAGEMENT"

                title="Website Services"

                description="Manage all services displayed on your website."

            />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                <AdminStatCard

                    title="Total Services"

                    value={totalServices}

                    icon={<LayoutGrid size={28} />}

                />

                <AdminStatCard

                    title="Featured Services"

                    value={featuredServices}

                    icon={<Star size={28} />}

                    color="bg-yellow-100 text-yellow-600"

                />

                <AdminStatCard

                    title="Categories"

                    value={categories}

                    icon={<Briefcase size={28} />}

                    color="bg-green-100 text-green-600"

                />

            </div>

            <AdminSearch

                search={search}

                onSearch={setSearch}

                placeholder="Search services..."

                filterValue={selectedCategory}

                onFilterChange={setSelectedCategory}

                filterOptions={categoryList}

                actions={

                    <AdminActionButton

                        icon={<Plus size={18} />}

                        onClick={() => {

                            setSelectedService(null);

                            setShowModal(true);

                        }}

                    >

                        Add Service

                    </AdminActionButton>

                }

            />
            <AdminTable

                columns={columns}

                data={filteredServices}

                renderRow={(service) => (

                    <tr
                        key={service.id}
                        className="
                            border-b
                            border-slate-100
                            transition
                            hover:bg-slate-50
                        "
                    >

                        {/* Service */}

                        <td className="px-6 py-5">

                            <div className="font-bold text-slate-800">

                                {service.title}

                            </div>

                            <div className="mt-2 max-w-xl text-sm text-slate-500">

                                {service.description}

                            </div>

                        </td>

                        {/* Category */}

                        <td className="px-6 py-5 whitespace-nowrap">

                            <span
                                className="
                                    rounded-full
                                    bg-cyan-100
                                    px-3
                                    py-1
                                    text-sm
                                    font-semibold
                                    text-cyan-700
                                "
                            >

                                {service.category}

                            </span>

                        </td>

                        {/* Featured */}

                        <td className="px-6 py-5 whitespace-nowrap">

                            <button

                                onClick={() =>
                                    toggleFeatured(service.id)
                                }

                                className="transition"

                            >

                                <StatusBadge

                                    status={
                                        service.featured
                                            ? "Featured"
                                            : "Normal"
                                    }

                                />

                            </button>

                        </td>

                        {/* Created */}

                        <td className="px-6 py-5 whitespace-nowrap text-slate-500">

                            {new Date(
                                service.createdAt
                            ).toLocaleDateString()}

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                            <div className="flex justify-center gap-3">

                                <AdminActionButton

                                    variant="outline"

                                    icon={<Pencil size={16} />}

                                    onClick={() => {

                                        setSelectedService(service);

                                        setShowModal(true);

                                    }}

                                >

                                    Edit

                                </AdminActionButton>

                                <AdminActionButton

                                    variant="danger"

                                    icon={<Trash2 size={16} />}

                                    onClick={() => {

                                        setDeleteId(service.id);

                                        setShowDelete(true);

                                    }}

                                >

                                    Delete

                                </AdminActionButton>

                            </div>

                        </td>

                    </tr>

                )}

            />

            {filteredServices.length === 0 && (

                <AdminEmptyState

                    icon={<LayoutGrid size={40} />}

                    title="No Services Found"

                    description="There are no services matching your search."

                    action={

                        <AdminActionButton

                            icon={<Plus size={18} />}

                            onClick={() => {

                                setSelectedService(null);

                                setShowModal(true);

                            }}

                        >

                            Add Service

                        </AdminActionButton>

                    }

                />

            )}

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
        </div>

    );

}