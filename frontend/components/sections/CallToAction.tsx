interface CallToActionProps {
    settings: {
        title: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
        phone: string;
        email: string;
    } | null;
}

export default function CallToAction({
    settings,
}: CallToActionProps) {

    const data = settings ?? {
        title: "Ready to Transform Your Business?",
        subtitle:
            "From government services to AI, software development and tax consultancy, we're ready to help.",
        buttonText: "Request Service",
        buttonLink: "/contact",
        phone: "+254758220554",
        email: "giltechonlinecyber@gmail.com",
    };

    return (

        <section className="bg-[#021b2a] py-24">

            <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-16 text-center shadow-xl shadow-cyan-900/20">

                <h2 className="text-4xl font-black text-white md:text-5xl">

                    {data.title}

                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-lg text-cyan-100">

                    {data.subtitle}

                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-5">

                    <a
                        href={data.buttonLink}
                        className="rounded-xl bg-white px-8 py-4 font-bold text-cyan-700 transition hover:scale-105"
                    >
                        {data.buttonText}
                    </a>

                </div>

                <div className="mt-10 space-y-2 text-cyan-100">

                    <p>{data.phone}</p>

                    <p>{data.email}</p>

                </div>

            </div>

        </section>

    );

}