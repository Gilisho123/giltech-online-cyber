interface HowItWorksProps {
    settings: {
        processTitle: string;
        processDescription: string;

        step1Title: string;
        step1Text: string;

        step2Title: string;
        step2Text: string;

        step3Title: string;
        step3Text: string;

        step4Title: string;
        step4Text: string;

    } | null;
}



export default function HowItWorks({
    settings,
}: HowItWorksProps) {


    const data = settings ?? {

        processTitle: "How It Works",

        processDescription:
            "Getting professional digital services has never been easier.",


        step1Title: "Choose a Service",

        step1Text:
            "Browse our wide range of professional services and select the one you need.",



        step2Title: "Submit Your Request",

        step2Text:
            "Fill in the service request form and upload any required documents.",



        step3Title: "Make Payment",

        step3Text:
            "Pay securely using M-Pesa or any other supported payment method.",



        step4Title: "Receive Your Service",

        step4Text:
            "Our team processes your request and delivers the completed service promptly.",

    };



    const steps = [

        {
            number: "01",
            title: data.step1Title,
            description: data.step1Text,
        },

        {
            number: "02",
            title: data.step2Title,
            description: data.step2Text,
        },

        {
            number: "03",
            title: data.step3Title,
            description: data.step3Text,
        },

        {
            number: "04",
            title: data.step4Title,
            description: data.step4Text,
        },

    ];



    return (

        <section className="bg-[#081225] py-24">


            <div className="mx-auto max-w-7xl px-6">


                <div className="text-center">


                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">

                        Process

                    </span>



                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">

                        {data.processTitle}

                    </h2>




                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">

                        {data.processDescription}

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