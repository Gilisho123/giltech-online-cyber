import Image from "next/image";
export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#081225] text-white">

            <section className="mx-auto max-w-6xl px-6 py-24">

                <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                    ABOUT GILTECH
                </span>

                <h1 className="mt-8 text-5xl font-black">
                    Empowering Businesses Through Technology
                </h1>

                <p className="mt-8 text-lg leading-8 text-slate-300">
                    Giltech Online Cyber is a modern digital service company
                    delivering online government services, tax consultancy,
                    data analytics, AI solutions, software development,
                    web development and business consultancy for individuals
                    and organizations.
                </p>

            </section>
            {/* Company Story */}

            <section className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-2 lg:items-center">

                <div>

                    <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                        Our Story
                    </span>

                    <h2 className="mt-4 text-4xl font-bold">
                        Building Digital Solutions That Make Life Easier
                    </h2>

                    <p className="mt-6 leading-8 text-slate-300">
                        Giltech Online Cyber was founded with a vision of making
                        digital services more accessible, efficient, and reliable.
                        We provide government online services, tax consultancy,
                        software development, data analytics, AI solutions,
                        business consultancy, and digital transformation services
                        for clients across Kenya.
                    </p>

                    <p className="mt-6 leading-8 text-slate-300">
                        Our approach combines technical expertise with practical
                        business knowledge, enabling us to deliver solutions that
                        solve real-world challenges while maintaining professionalism,
                        transparency, and exceptional customer service.
                    </p>

                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-xl">

                    <h3 className="text-2xl font-bold text-cyan-400">
                        Why Clients Choose Giltech
                    </h3>

                    <ul className="mt-8 space-y-5 text-slate-300">

                        <li>✔ Professional and reliable digital services</li>

                        <li>✔ Expertise in government and tax systems</li>

                        <li>✔ Modern software and AI solutions</li>

                        <li>✔ Data analytics and business intelligence</li>

                        <li>✔ Fast turnaround and dedicated support</li>

                    </ul>

                </div>

            </section>
            {/* Statistics */}

            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl">

                        <h3 className="text-5xl font-black text-cyan-400">
                            170+
                        </h3>

                        <p className="mt-3 text-slate-300">
                            Professional Services
                        </p>

                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl">

                        <h3 className="text-5xl font-black text-cyan-400">
                            50+
                        </h3>

                        <p className="mt-3 text-slate-300">
                            Successful Projects
                        </p>

                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl">

                        <h3 className="text-5xl font-black text-cyan-400">
                            99%
                        </h3>

                        <p className="mt-3 text-slate-300">
                            Client Satisfaction
                        </p>

                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl">

                        <h3 className="text-5xl font-black text-cyan-400">
                            24/7
                        </h3>

                        <p className="mt-3 text-slate-300">
                            Customer Support
                        </p>

                    </div>

                </div>

            </section>
            {/* Mission, Vision & Values */}

            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="mb-14 text-center">

                    <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                        OUR FOUNDATION
                    </span>

                    <h2 className="mt-8 text-4xl font-black">
                        What Drives Us
                    </h2>

                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

                        <h3 className="text-2xl font-bold text-cyan-400">
                            Mission
                        </h3>

                        <p className="mt-5 leading-8 text-slate-300">
                            To provide innovative, reliable and affordable digital
                            solutions that empower individuals, businesses and
                            organizations to thrive in the digital age.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

                        <h3 className="text-2xl font-bold text-cyan-400">
                            Vision
                        </h3>

                        <p className="mt-5 leading-8 text-slate-300">
                            To become Kenya's leading digital consultancy,
                            recognized for innovation, professionalism and
                            outstanding customer service.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

                        <h3 className="text-2xl font-bold text-cyan-400">
                            Core Values
                        </h3>

                        <ul className="mt-5 space-y-3 text-slate-300">

                            <li>✓ Integrity</li>
                            <li>✓ Innovation</li>
                            <li>✓ Professionalism</li>
                            <li>✓ Excellence</li>
                            <li>✓ Customer Focus</li>

                        </ul>

                    </div>

                </div>

                {/* Founder Section */}

                <section className="mx-auto max-w-7xl px-6 py-24">

                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

                        {/* Founder Profile Card */}

                        <div className="flex justify-center">

                            <div className="w-[350px] overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">

                                <div className="relative h-[420px]">

                                    <Image
                                        src="/images/founder/gilisho.jpg"
                                        alt="Gilisho Leteipa"
                                        fill
                                        priority
                                        className="object-cover"
                                    />

                                </div>

                                <div className="p-8 text-center">

                                    <h3 className="text-3xl font-black">
                                        Gilisho Leteipa
                                    </h3>

                                    <p className="mt-2 text-cyan-400 font-semibold">
                                        Founder & Managing Partner
                                    </p>

                                    <div className="mt-8 space-y-3 text-left">

                                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                            <span className="text-slate-400">
                                                Profession
                                            </span>

                                            <span className="font-medium">
                                                Software Engineer
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                            <span className="text-slate-400">
                                                Specialization
                                            </span>

                                            <span className="font-medium">
                                                AI & Data Analytics
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                            <span className="text-slate-400">
                                                Experience
                                            </span>

                                            <span className="font-medium">
                                                Technology & Consultancy
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">
                                                Company
                                            </span>

                                            <span className="font-medium">
                                                Giltech Online Cyber
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Founder Bio */}

                        <div>

                            <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                                MEET THE FOUNDER
                            </span>

                            <h2 className="mt-8 text-5xl font-black leading-tight">
                                Passionate About Building Digital Solutions That Create Real Impact
                            </h2>

                            <p className="mt-8 text-lg leading-8 text-slate-300">

                                Gilisho Leteipa is the Founder of Giltech Online Cyber and a
                                Co-Founder of Data Folks Research & Advisory. He is passionate
                                about using technology to simplify business processes, improve
                                decision-making through data, and deliver innovative digital
                                solutions for individuals, businesses, and organizations.

                            </p>

                            <p className="mt-6 text-lg leading-8 text-slate-300">

                                His areas of expertise include software engineering,
                                artificial intelligence, data analytics, tax consultancy,
                                business systems, digital transformation, and online government
                                services. Through every project, his focus is on delivering
                                practical, reliable, and high-quality solutions that solve
                                real-world challenges.

                            </p>

                            <div className="mt-10 grid grid-cols-2 gap-6">

                                <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 text-center">

                                    <h3 className="text-4xl font-black text-cyan-400">
                                        170+
                                    </h3>

                                    <p className="mt-2 text-slate-400">
                                        Services Offered
                                    </p>

                                </div>

                                <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 text-center">

                                    <h3 className="text-4xl font-black text-cyan-400">
                                        50+
                                    </h3>

                                    <p className="mt-2 text-slate-400">
                                        Projects Completed
                                    </p>

                                </div>

                                <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 text-center">

                                    <h3 className="text-4xl font-black text-cyan-400">
                                        AI
                                    </h3>

                                    <p className="mt-2 text-slate-400">
                                        Innovation
                                    </p>

                                </div>

                                <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 text-center">

                                    <h3 className="text-4xl font-black text-cyan-400">
                                        Data
                                    </h3>

                                    <p className="mt-2 text-slate-400">
                                        Intelligence
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>
            </section>
            {/* Our Expertise */}

            <section className="mx-auto max-w-7xl px-6 py-24">

                <div className="text-center">

                    <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                        OUR EXPERTISE
                    </span>

                    <h2 className="mt-8 text-5xl font-black">
                        What We Do Best
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                        We combine technology, innovation, and professional expertise
                        to deliver solutions that help businesses and individuals
                        achieve their goals.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-cyan-400">
                            💻 Software Development
                        </h3>

                        <p className="mt-5 text-slate-300 leading-8">
                            Custom web applications, business systems,
                            desktop software and scalable digital solutions.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-cyan-400">
                            🌐 Web Design & Development
                        </h3>

                        <p className="mt-5 text-slate-300 leading-8">
                            Modern, responsive websites built for performance,
                            SEO, and an exceptional user experience.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-cyan-400">
                            🤖 Artificial Intelligence
                        </h3>

                        <p className="mt-5 text-slate-300 leading-8">
                            AI-powered automation, intelligent assistants,
                            workflow optimization and innovative digital tools.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-cyan-400">
                            📊 Data Analytics
                        </h3>

                        <p className="mt-5 text-slate-300 leading-8">
                            Data visualization, dashboards, business intelligence
                            and evidence-based decision support.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-cyan-400">
                            🧾 Tax Consultancy
                        </h3>

                        <p className="mt-5 text-slate-300 leading-8">
                            Professional KRA compliance, tax advisory,
                            returns filing, PIN services and iTax support.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-cyan-400">
                            🏛 Government Digital Services
                        </h3>

                        <p className="mt-5 text-slate-300 leading-8">
                            eCitizen, NTSA, HELB, SHA, immigration,
                            business registration and many more online services.
                        </p>
                    </div>

                </div>

            </section>
            {/* Why Choose Us */}

            <section className="mx-auto max-w-7xl px-6 py-24">

                <div className="text-center">

                    <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                        WHY CHOOSE US
                    </span>

                    <h2 className="mt-8 text-5xl font-black">
                        Trusted Technology Partner
                    </h2>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
                        <h3 className="text-xl font-bold text-cyan-400">
                            Professional Excellence
                        </h3>

                        <p className="mt-4 text-slate-300 leading-7">
                            We deliver reliable and high-quality digital solutions tailored to client needs.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
                        <h3 className="text-xl font-bold text-cyan-400">
                            Innovation
                        </h3>

                        <p className="mt-4 text-slate-300 leading-7">
                            We leverage modern technologies including AI and data analytics to create smart solutions.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
                        <h3 className="text-xl font-bold text-cyan-400">
                            Customer Focus
                        </h3>

                        <p className="mt-4 text-slate-300 leading-7">
                            Every project is designed around solving real challenges and delivering measurable value.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">
                        <h3 className="text-xl font-bold text-cyan-400">
                            End-to-End Support
                        </h3>

                        <p className="mt-4 text-slate-300 leading-7">
                            From consultation to implementation and maintenance, we support our clients every step.
                        </p>
                    </div>

                </div>

            </section>
            {/* Technology Stack */}

            <section className="mx-auto max-w-7xl px-6 py-24">

                <div className="text-center">

                    <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                        TECHNOLOGIES
                    </span>

                    <h2 className="mt-8 text-5xl font-black">
                        Technologies We Use
                    </h2>

                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-5">

                    {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "Node.js",
                        "Python",
                        "SQL",
                        "Power BI",
                        "Excel",
                        "Git",
                        "GitHub",
                        "Firebase",
                        "OpenAI",
                        "TensorFlow",
                        "Docker"
                    ].map((tech) => (

                        <div
                            key={tech}
                            className="rounded-full border border-cyan-500/30 bg-white/5 px-6 py-3 font-semibold text-cyan-400"
                        >
                            {tech}
                        </div>

                    ))}

                </div>

            </section>
            {/* Clients */}

            <section className="mx-auto max-w-7xl px-6 py-24">

                <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-12 text-center">

                    <h2 className="text-4xl font-black">
                        Who We Serve
                    </h2>

                    <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">

                        Giltech Online Cyber proudly serves individuals,
                        startups, SMEs, NGOs, educational institutions,
                        government agencies and corporate organizations
                        across Kenya by providing dependable digital solutions
                        and consultancy services.

                    </p>

                </div>

            </section>
            {/* CTA */}

            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="rounded-[40px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 px-12 py-20 text-center">

                    <h2 className="text-5xl font-black text-white">
                        Ready to Work With Giltech?
                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-cyan-100">

                        Whether you need software development,
                        government online services, AI solutions,
                        tax consultancy or business advisory,
                        we're ready to help your business grow.

                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-6">

                        <button className="rounded-xl bg-white px-8 py-4 font-bold text-slate-900 transition hover:scale-105">

                            Request a Service

                        </button>

                        <button className="rounded-xl border border-white px-8 py-4 font-bold text-white transition hover:bg-white hover:text-slate-900">

                            Contact Us

                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}       
