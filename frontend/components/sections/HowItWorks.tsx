const steps = [
    {
        number: "01",
        title: "Choose a Service",
        description:
            "Browse our wide range of professional services and select the one you need.",
    },
    {
        number: "02",
        title: "Submit Your Request",
        description:
            "Fill in the service request form and upload any required documents.",
    },
    {
        number: "03",
        title: "Make Payment",
        description:
            "Pay securely using M-Pesa or any other supported payment method.",
    },
    {
        number: "04",
        title: "Receive Your Service",
        description:
            "Our team processes your request and delivers the completed service promptly.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-[#081225] py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                        Process
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                        How It Works
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
                        Getting professional digital services has never been easier.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
                        >
                            <div className="text-5xl font-black text-cyan-400">
                                {step.number}
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-white">
                                {step.title}
                            </h3>

                            <p className="mt-4 leading-7 text-slate-300">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}