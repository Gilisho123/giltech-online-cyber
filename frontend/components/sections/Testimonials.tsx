const testimonials = [
    {
        name: "Business Owner",
        company: "SME Client",
        message:
            "Giltech helped us file our tax returns accurately and on time. Their professionalism is outstanding.",
    },
    {
        name: "Research Student",
        company: "University Client",
        message:
            "The data analysis support using SPSS and Power BI exceeded my expectations. I highly recommend Giltech.",
    },
    {
        name: "Startup Founder",
        company: "Technology Client",
        message:
            "From company registration to website development, everything was handled efficiently under one roof.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-[#081225] py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                        Testimonials
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                        What Our Clients Say
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
                        We are committed to delivering quality services and building lasting
                        relationships with our clients.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name + testimonial.company}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400"
                        >
                            <p className="italic leading-7 text-slate-300">
                                "{testimonial.message}"
                            </p>

                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-white">
                                    {testimonial.name}
                                </h3>

                                <p className="text-cyan-400">
                                    {testimonial.company}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}