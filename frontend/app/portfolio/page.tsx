export const dynamic = "force-dynamic";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioProjects } from "@/lib/portfolio";

export default async function PortfolioPage() {

    const projects = await getPortfolioProjects();

    return (

        <main className="min-h-screen bg-[#081225] text-white">

            {/* Hero */}

            <section className="mx-auto max-w-7xl px-6 py-24">

                <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">

                    OUR PORTFOLIO

                </span>

                <h1 className="mt-8 text-5xl font-black">

                    Projects We've Built

                </h1>

                <p className="mt-6 max-w-3xl text-lg text-slate-300">

                    Explore a selection of projects delivered by Giltech Online
                    Cyber, showcasing expertise in software development, data
                    analytics, AI solutions, government digital services,
                    business consultancy and web design.

                </p>

            </section>

            {/* Projects */}

            <section className="mx-auto max-w-7xl px-6 pb-24">

                {projects.length === 0 ? (

                    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-16 text-center">

                        <h2 className="text-3xl font-bold">

                            No Projects Available

                        </h2>

                        <p className="mt-4 text-slate-400">

                            Portfolio projects will appear here once added by
                            the administrator.

                        </p>

                    </div>

                ) : (

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {projects.map((project) => (

                            <Card key={project.id}>

                                <div className="relative h-56 overflow-hidden rounded-2xl">

                                    <Image
                                        src={
                                            project.image ||
                                            "/images/placeholder.jpg"
                                        }
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

                                        {project.technologies
                                            .split(",")
                                            .map((tech) => (

                                                <span
                                                    key={tech.trim()}
                                                    className="rounded-full border border-cyan-500/30 px-3 py-1 text-xs text-cyan-400"
                                                >

                                                    {tech.trim()}

                                                </span>

                                            ))}

                                    </div>

                                    <div className="mt-8 flex items-center gap-3">

                                        {project.projectUrl && (

                                            <Link
                                                href={project.projectUrl}
                                                target="_blank"
                                            >

                                                <Button>

                                                    <span className="flex items-center gap-2">

                                                        View Project

                                                        <ExternalLink size={18} />

                                                    </span>

                                                </Button>

                                            </Link>

                                        )}

                                        {project.githubUrl && (

                                            <Link
                                                href={project.githubUrl}
                                                target="_blank"
                                                className="rounded-xl border border-cyan-500 p-3 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
                                            >

                                                <GitBranch size={20} />

                                            </Link>

                                        )}

                                    </div>

                                </div>

                            </Card>

                        ))}

                    </div>

                )}

            </section>

        </main>

    );

}