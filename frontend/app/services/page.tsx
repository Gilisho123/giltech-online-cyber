"use client";

import { useMemo, useState } from "react";
import {
    ArrowRight,
    Search,
    X,
} from "lucide-react";
import { services } from "@/lib/services";

export default function ServicesPage() {

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(services.map((service) => service.category)),
        ];
    }, []);

    const filteredServices = useMemo(() => {
        return services.filter((service) => {
            const matchesSearch =
                service.title.toLowerCase().includes(search.toLowerCase()) ||
                service.description.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                service.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [search, selectedCategory]);
    return (
        <main className="min-h-screen bg-[#081225] text-white">

            <section className="mx-auto max-w-7xl px-6 py-24">

                <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                    OUR SERVICES
                </span>

                <h1 className="mt-8 text-5xl font-black">
                    Professional Digital Services
                </h1>

                <p className="mt-6 max-w-3xl text-lg text-slate-300">
                    Giltech Online Cyber offers over 170 professional services
                    ranging from government services and tax consultancy
                    to data analytics, AI, software development,
                    business consultancy and digital transformation.
                </p>

            </section>
            {/* Search & Filters */}
            <section className="mx-auto max-w-7xl px-6">

                {/* Search Bar */}
                <div className="mb-8">

                    <div className="relative">

                        <Search
                            size={20}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                            type="text"
                            placeholder="Search for a service..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                    w-full
                    rounded-2xl
                    border
                    border-cyan-500/30
                    bg-[#101c33]
                    py-5
                    pl-14
                    pr-14
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-500
                    focus:border-cyan-500
                    focus:ring-2
                    focus:ring-cyan-500/30
                "
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        rounded-full
                        p-1
                        transition
                        hover:bg-white/10
                    "
                            >
                                <X
                                    size={18}
                                    className="text-slate-500"
                                />
                            </button>
                        )}

                    </div>

                </div>

                {/* Category Buttons */}
                <div className="mb-10 flex flex-wrap gap-4">

                    {categories.map((category) => (

                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${selectedCategory === category
                                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                                    : "border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                                }`}
                        >
                            {category}
                        </button>

                    ))}

                </div>

                {/* Results Counter */}
                <p className="mb-8 text-slate-400">
                    Showing
                    <span className="mx-2 font-bold text-cyan-400">
                        {filteredServices.length}
                    </span>
                    of
                    <span className="mx-2 font-bold text-white">
                        {services.length}
                    </span>
                    services
                </p>

            </section>
        </main>
    );
}