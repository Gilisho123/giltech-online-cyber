interface FAQProps {
    faqs: {
        id: number;
        question: string;
        answer: string;
    }[];
}

export default function FAQ({
    faqs,
}: FAQProps) {

    return (

        <section className="bg-[#081225] py-24">

            <div className="mx-auto max-w-5xl px-6">

                {/* Heading */}

                <div className="text-center">

                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">

                        FAQ

                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">

                        Frequently Asked Questions

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">

                        Answers to the most common questions from our clients.

                    </p>

                </div>

                {/* FAQ */}

                <div className="mt-16 space-y-6">

                    {faqs.map((faq) => (

                        <details
                            key={faq.id}
                            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400"
                        >

                            <summary className="cursor-pointer list-none text-xl font-semibold text-white">

                                {faq.question}

                            </summary>

                            <p className="mt-5 leading-8 text-slate-300">

                                {faq.answer}

                            </p>

                        </details>

                    ))}

                </div>

            </div>

        </section>

    );

}