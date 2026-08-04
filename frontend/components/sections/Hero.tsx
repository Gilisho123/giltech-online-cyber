import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Glow from "@/components/ui/Glow";


interface HeroProps {
    settings: {
        companyName: string;
        tagline: string;

        heroTitle: string;
        heroSubtitle: string;

        heroButtonText: string;
        heroButtonLink: string;

        heroImage: string;

        heroCard1Title: string;
        heroCard1Text: string;

        heroCard2Title: string;
        heroCard2Text: string;

    } | null;
}



export default function Hero({ settings }: HeroProps) {


    const data = settings ?? {

        companyName: "Giltech Online Cyber",

        tagline: "Kenya's Digital Business Hub",

        heroTitle: "Digital Solutions For Modern Businesses",

        heroSubtitle:
            "Government services, tax consultancy, data analytics, AI solutions, software development and digital transformation.",

        heroButtonText: "Request Service",

        heroButtonLink: "/contact",

        heroImage: "/images/hero.png",

        heroCard1Title: "Experience",

        heroCard1Text: "170+ Professional Services",

        heroCard2Title: "Technology",

        heroCard2Text: "AI • Software • Data",

    };



    return (

        <section className="relative overflow-hidden bg-[#081225] py-24 text-white">


            <Glow position="left" />

            <Glow position="right" />


            <Container>


                <div className="grid items-center gap-16 lg:grid-cols-2">



                    {/* LEFT CONTENT */}


                    <div>


                        <Badge>

                            {data.tagline}

                        </Badge>



                        <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">


                            {data.companyName}


                            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                                {data.heroTitle}

                            </span>


                        </h1>



                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">


                            {data.heroSubtitle}


                        </p>




                        <div className="mt-10 flex flex-wrap gap-5">



                            <Link href={data.heroButtonLink}>


                                <Button>

                                    {data.heroButtonText}

                                </Button>


                            </Link>




                            <Link href="/portfolio">


                                <Button variant="secondary">


                                    View Portfolio


                                </Button>


                            </Link>



                        </div>





                        {/* TRUST BADGES */}


                        <div className="mt-12 flex flex-wrap gap-4">


                            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm">

                                ✓ 170+ Professional Services

                            </div>



                            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm">

                                ✓ AI Powered Solutions

                            </div>



                            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm">

                                ✓ Trusted Across Kenya

                            </div>



                        </div>



                    </div>






                    {/* RIGHT IMAGE */}



                    <div className="relative flex justify-center">



                        <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />




                        <div className="relative">


                            <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">


                                <Image

                                    src={data.heroImage || "/images/hero.png"}

                                    alt={data.companyName}

                                    width={700}

                                    height={700}

                                    priority

                                    className="rounded-[32px] object-cover transition duration-500 hover:scale-105"

                                />


                            </div>





                            {/* CARD 1 */}


                            <div className="absolute -left-8 top-10 rounded-2xl border border-white/10 bg-[#081225]/90 p-5 backdrop-blur-xl">


                                <p className="text-xs uppercase tracking-widest text-cyan-400">

                                    {data.heroCard1Title}

                                </p>


                                <h3 className="mt-2 font-bold">

                                    {data.heroCard1Text}

                                </h3>


                            </div>






                            {/* CARD 2 */}


                            <div className="absolute -right-8 bottom-10 rounded-2xl border border-white/10 bg-[#081225]/90 p-5 backdrop-blur-xl">


                                <p className="text-xs uppercase tracking-widest text-cyan-400">

                                    {data.heroCard2Title}

                                </p>


                                <h3 className="mt-2 font-bold">

                                    {data.heroCard2Text}

                                </h3>


                            </div>



                        </div>



                    </div>



                </div>



            </Container>



        </section>

    );

}