const features = [
  {
    title: "Trusted Expertise",
    description:
      "Professional experience in tax consultancy, government services, software development and data analytics.",
    icon: "🎓",
  },
  {
    title: "Fast Turnaround",
    description:
      "Most online services are completed quickly without compromising quality.",
    icon: "⚡",
  },
  {
    title: "Secure & Confidential",
    description:
      "We handle your documents and information with the highest level of confidentiality.",
    icon: "🔒",
  },
  {
    title: "100+ Digital Services",
    description:
      "Access a wide range of government, business and technology services under one roof.",
    icon: "🌐",
  },
  {
    title: "Business Focused",
    description:
      "Helping entrepreneurs, SMEs and organizations embrace digital transformation.",
    icon: "📈",
  },
  {
    title: "Dedicated Support",
    description:
      "Friendly support before, during and after every service request.",
    icon: "💬",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#081225] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Why Businesses Trust Giltech
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            We combine technology, expertise and customer care to deliver
            reliable digital solutions for individuals, businesses and
            organizations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}