import {
    Building2,
    Landmark,
    BarChart3,
    BrainCircuit,
    Globe,
    Database,
} from "lucide-react";

const partners = [
    {
        name: "Government Digital Services",
        icon: Landmark,
    },
    {
        name: "Business Solutions",
        icon: Building2,
    },
    {
        name: "Data Analytics",
        icon: BarChart3,
    },
    {
        name: "Artificial Intelligence",
        icon: BrainCircuit,
    },
    {
        name: "Web Technologies",
        icon: Globe,
    },
    {
        name: "Database Systems",
        icon: Database,
    },
];

export default function Partners() {
    return (
        <section className="bg-[#081225] py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                        Trusted Technologies
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                        Technologies & Platforms We Work With
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
                        We combine modern technology with professional expertise to deliver
                        reliable digital solutions.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {partners.map((partner) => {
                        const Icon = partner.icon;

                        return (
                            <div
                                key={partner.name}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400"
                            >
                                <Icon
                                    className="mx-auto text-cyan-400"
                                    size={40}
                                />

                                <p className="mt-4 text-sm text-slate-300">
                                    {partner.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}