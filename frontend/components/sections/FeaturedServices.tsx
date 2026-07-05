export default function FeaturedServices() {
    const services = [
        {
            title: "Online Government Services",
            description: "eCitizen, NTSA, SHA, Immigration, HELB and more.",
            icon: "🌐",
        },
        {
            title: "Tax Consultancy",
            description: "KRA PIN, Returns, TCC, VAT, PAYE and Tax Advisory.",
            icon: "🧾",
        },
        {
            title: "Data Analysis",
            description: "Power BI, SPSS, Excel, Python and Business Intelligence.",
            icon: "📊",
        },
        {
            title: "Web Development",
            description: "Business websites, portals and custom web systems.",
            icon: "💻",
        },
        {
            title: "AI Solutions",
            description: "AI training, automation and productivity solutions.",
            icon: "🤖",
        },
        {
            title: "Graphic Design",
            description: "Logos, posters, company profiles and branding.",
            icon: "🎨",
        },
    ];

    return (
        <section className="bg-[#081225] py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-white">
                        Featured Services
                    </h2>

                    <p className="mt-4 text-slate-300">
                        Professional digital solutions for businesses and individuals.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400"
                        >
                            <div className="text-5xl">
                                {service.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-white">
                                {service.title}
                            </h3>

                            <p className="mt-3 text-slate-300">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}