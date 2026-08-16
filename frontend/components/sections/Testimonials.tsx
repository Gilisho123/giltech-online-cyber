import Image from "next/image";
interface TestimonialsProps {
    testimonials: {
        id: number;
        name: string;
        position: string;
        company: string;
        message: string;
        rating: number;
        image: string;
    }[];
}

export default function Testimonials({
    testimonials,
}: TestimonialsProps) {

    return (

        <section className="bg-[#081225] py-24">

            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="text-center">

                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                        Testimonials
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                        What Our Clients Say
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
                        Real experiences from satisfied clients and businesses.
                    </p>

                </div>

                {/* Cards */}

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {testimonials.map((testimonial) => (

                        <div
                            key={testimonial.id}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400"
                        >

                            <div className="mb-4 flex text-yellow-400">

                                {Array.from({
                                    length: testimonial.rating,
                                }).map((_, index) => (

                                    <span key={index}>★</span>

                                ))}

                            </div>

                            <p className="leading-8 text-slate-300">
                                "{testimonial.message}"
                            </p>

                            <div className="mt-8 flex items-center gap-4">

                                <Image
                                    src={testimonial.image || "/avatar.png"}
                                    alt={testimonial.name}
                                    width={56}
                                    height={56}
                                    className="rounded-full object-cover"
                                />

                                <div>

                                    <h4 className="font-bold text-white">
                                        {testimonial.name}
                                    </h4>

                                    <p className="text-sm text-slate-400">
                                        {testimonial.position}
                                    </p>

                                    <p className="text-xs text-cyan-400">
                                        {testimonial.company}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}