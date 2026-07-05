"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How do I request a service?",
        answer:
            "Browse our services, choose the one you need, and submit your request through our online service request page.",
    },
    {
        question: "Which payment methods do you accept?",
        answer:
            "We support M-Pesa and other payment methods. M-Pesa integration will allow secure online payments.",
    },
    {
        question: "Do you serve clients outside Kenya?",
        answer:
            "Yes. Many of our digital services, including data analysis, web development, AI consulting and research support, are available worldwide.",
    },
    {
        question: "How long does a service take?",
        answer:
            "Delivery depends on the complexity of the service. Simple online services may be completed within hours, while larger projects follow an agreed timeline.",
    },
    {
        question: "Is my information confidential?",
        answer:
            "Absolutely. We treat every client's documents and information with strict confidentiality and professionalism.",
    },
];
export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="bg-[#081225] py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                        FAQ
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-6 text-lg text-slate-300">
                        Find answers to some of the questions our clients ask most often.
                    </p>
                </div>

                <div className="mt-16 space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.question}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
                        >
                            <button
                                onClick={() =>
                                    setOpen(open === index ? null : index)
                                }
                                className="flex w-full items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-semibold text-white">
                                    {faq.question}
                                </span>

                                <ChevronDown
                                    className={`transition ${open === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {open === index && (
                                <div className="border-t border-white/10 px-6 py-5 text-slate-300">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}