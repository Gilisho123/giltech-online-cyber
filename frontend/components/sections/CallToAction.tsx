import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CallToAction() {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-24">

            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 px-10 py-20">

                {/* Glow Effects */}
                <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

                <Container>

                    <div className="relative text-center">

                        {/* Badge */}
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                            Let's Work Together
                        </span>

                        {/* Heading */}
                        <h2 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
                            Ready to Transform
                            <span className="block text-cyan-200">
                                Your Business?
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-100">
                            From government online services and tax consultancy
                            to data analytics, AI solutions and custom software
                            development, Giltech Online Cyber is your trusted
                            digital partner.
                        </p>

                        {/* Buttons */}
                        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

                            <Link href="/contact">
                                <Button>
                                    <span className="flex items-center gap-2">
                                        Request a Service
                                        <ArrowRight size={18} />
                                    </span>
                                </Button>
                            </Link>

                            <Link href="/contact">
                                <button className="flex items-center justify-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-slate-900">
                                    <PhoneCall size={18} />
                                    Contact Us
                                </button>
                            </Link>

                        </div>

                        {/* Features */}
                        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">

                            <div className="rounded-xl bg-white/10 p-4 text-center text-sm font-medium text-white backdrop-blur-md">
                                ✓ Fast Turnaround
                            </div>

                            <div className="rounded-xl bg-white/10 p-4 text-center text-sm font-medium text-white backdrop-blur-md">
                                ✓ Secure Payments
                            </div>

                            <div className="rounded-xl bg-white/10 p-4 text-center text-sm font-medium text-white backdrop-blur-md">
                                ✓ Professional Support
                            </div>

                            <div className="rounded-xl bg-white/10 p-4 text-center text-sm font-medium text-white backdrop-blur-md">
                                ✓ Trusted by Businesses
                            </div>

                        </div>

                    </div>

                </Container>

            </div>

        </section>
    );
}