import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

interface CallToActionProps {
    settings: {
        companyName: string;
        tagline: string;
        phone: string;
        email: string;

        ctaTitle: string;
        ctaSubtitle: string;

        ctaButtonText: string;
        ctaButtonLink: string;
    } | null;
}

export default function CallToAction({
    settings,
}: CallToActionProps) {

    const data = settings ?? {

        companyName: "Giltech Online Cyber",

        tagline: "Your Trusted Digital Partner",

        phone: "+254758220554",

        email: "info@giltech.co.ke",

        ctaTitle: "Ready to Transform Your Business?",

        ctaSubtitle:
            "From government services to AI, software development and tax consultancy, we're ready to help you.",

        ctaButtonText: "Request Service",

        ctaButtonLink: "/contact",

    };

    return (

        <section className="bg-[#081225] py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 px-10 py-20">

                    <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

                    <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

                    <Container>

                        <div className="relative z-10 text-center">

                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-md">

                                {data.tagline}

                            </span>

                            <h2 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">

                                {data.ctaTitle}

                            </h2>

                            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-100">

                                {data.ctaSubtitle}

                            </p>

                            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

                                <Link href={data.ctaButtonLink}>

                                    <Button>

                                        <span className="flex items-center gap-2">

                                            {data.ctaButtonText}

                                            <ArrowRight size={18} />

                                        </span>

                                    </Button>

                                </Link>

                                <Link href="/contact">

                                    <button className="flex items-center justify-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900">

                                        <PhoneCall size={18} />

                                        {data.phone}

                                    </button>

                                </Link>

                            </div>

                        </div>

                    </Container>

                </div>

            </div>

        </section>

    );

}