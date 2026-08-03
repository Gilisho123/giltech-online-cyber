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
    } | null;

}



export default function CallToAction({
    settings,
}: CallToActionProps) {


    return (

        <section className="bg-[#081225] py-24">


            <div className="mx-auto max-w-7xl px-6">


                <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 px-10 py-20">


                    {/* Glow Effects */}

                    <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

                    <div className="absolute -bottom-24 -right-24 h-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl" />



                    <Container>


                        <div className="relative z-10 text-center">


                            {/* Badge */}

                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-md">

                                Let's Work Together

                            </span>




                            {/* Heading */}

                            <h2 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">


                                Ready to Transform


                                <span className="block text-cyan-200">

                                    {settings?.companyName || "Your Business?"}

                                </span>


                            </h2>





                            {/* Description */}

                            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-100">


                                {settings?.tagline ||
                                    "From government online services and tax consultancy to data analytics, AI solutions and custom software development, we are your trusted digital partner."
                                }


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






                            {/* Contact Details */}

                            <div className="mt-10 text-sm text-white/90">


                                {settings?.phone && (
                                    <p>
                                        📞 {settings.phone}
                                    </p>
                                )}


                                {settings?.email && (
                                    <p>
                                        ✉ {settings.email}
                                    </p>
                                )}


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


            </div>


        </section>

    );

}