import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/portfolio";
import Image from "next/image";


export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-[#081225] text-white">

            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 py-24">

                <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                    OUR PORTFOLIO
                </span>

                <h1 className="mt-8 text-5xl font-black">
                    Projects We've Built
                </h1>

                <p className="mt-6 max-w-3xl text-lg text-slate-300">
                    Explore a selection of projects delivered by Giltech Online Cyber,
                    showcasing expertise in software development, data analytics,
                    AI solutions, government digital services, business consultancy,
                    and web design.
                </p>

            </section>
            {/* Featured Projects */}

            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {projects.map((project) => (

                        <Card key={project.id}>

                            <div className="relative h-52 overflow-hidden rounded-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition duration-500 hover:scale-110"
                                />
                            </div>

                            <div className="mt-6">

                                <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
                                    {project.category}
                                </span>

                                <h3 className="mt-4 text-2xl font-bold">
                                    {project.title}
                                </h3>

                                <p className="mt-4 text-slate-300">
                                    {project.description}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-cyan-500/30 px-3 py-1 text-xs text-cyan-400"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <Button>
                                    <span className="flex items-center gap-2">
                                        View Project
                                        <ArrowRight size={18} />
                                    </span>
                                </Button>

                            </div>

                        </Card>

                    ))}

                </div>

            </section>

        </main>
    );
}