import Image from "next/image";

interface PartnersProps {
    partners: {
        id: number;
        name: string;
        logo: string;
        website: string | null;
    }[];
}

export default function Partners({
    partners,
}: PartnersProps) {

    return (

        <section className="bg-[#081225] py-24">

            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="text-center">

                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">

                        Trusted Partners

                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">

                        Organizations We Work With

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">

                        Proud to collaborate with institutions, businesses and organizations.

                    </p>

                </div>

                {/* Logos */}

                <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">

                    {partners.map((partner) => (

                        <a
                            key={partner.id}
                            href={partner.website || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-32 items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white/10"
                        >

                            <div className="relative h-16 w-full">

                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />

                            </div>

                        </a>

                    ))}

                </div>

            </div>

        </section>

    );

}