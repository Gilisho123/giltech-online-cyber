interface HowItWorksProps {
    steps: {
        id: number;
        title: string;
        description: string;
        stepNumber: number;
    }[];
}

export default function HowItWorks({
    steps,
}: HowItWorksProps) {

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
                            key={step.id}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
                        >

                            <div className="text-5xl font-black text-cyan-400">
                                {String(step.stepNumber).padStart(2, "0")}
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