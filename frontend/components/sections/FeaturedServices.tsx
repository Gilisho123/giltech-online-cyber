interface FeaturedServicesProps {
    services: {
        id: number;
        title: string;
        description: string;
        category: string;
    }[];
}


export default function FeaturedServices({
    services,
}: FeaturedServicesProps) {


    const icons: Record<string, string> = {

        "Online Government Services": "🌐",

        "Tax Consultancy": "🧾",

        "Data Analysis": "📊",

        "Web Development": "💻",

        "AI Solutions": "🤖",

        "Graphic Design": "🎨",

    };



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
                            key={service.id}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400"
                        >


                            <div className="text-5xl">

                                {icons[service.title] ?? "🚀"}

                            </div>




                            <h3 className="mt-6 text-xl font-bold text-white">

                                {service.title}

                            </h3>




                            <p className="mt-3 text-slate-300">

                                {service.description}

                            </p>



                            <span className="mt-5 inline-block rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">

                                {service.category}

                            </span>



                        </div>


                    ))}



                </div>



            </div>



        </section>

    );

}