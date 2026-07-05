import { ArrowRight, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CallToAction() {
    return (
        <section className="relative overflow-hidden py-24">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700" />

            {/* Decorative Glow */}
            <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <Container>
                <div className="relative text-center">

                    <span className="inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white">
                        Let's Work Together
                    </span>

                    <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-6xl">
                        Ready to Transform
                        <span className="block">Your Business?</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-100">
                        From government online services and tax consultancy to data
                        analytics, AI solutions and custom software development,
                        Giltech Online Cyber is your trusted digital partner.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-5">

                        <Button>
                            <span className="flex items-center gap-2">
                                Request a Service
                                <ArrowRight size={18} />
                            </span>
                        </Button>

                        <button className="flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-slate-900">
                            <PhoneCall size={18} />
                            Contact Us
                        </button>

                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-white/90">

                        <div>✓ Fast Turnaround</div>

                        <div>✓ Secure Payments</div>

                        <div>✓ Professional Support</div>

                        <div>✓ Trusted by Businesses</div>

                    </div>

                </div>
            </Container>
        </section>
    );
}