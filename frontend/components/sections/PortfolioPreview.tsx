import Image from "next/image";
const projects = [
  {
    title: "Business Websites",
    category: "Web Development",
    description:
      "Modern, responsive websites for businesses, NGOs, schools and organizations.",
    image: "/projects/business.png",
  },
  {
    title: "Data Analytics Dashboards",
    category: "Data Analysis",
    description:
      "Interactive dashboards built using Power BI, Excel and Python for better decision making.",
    image: "/projects/dash.png",
  },
  {
    title: "Tax & Government Services",
    category: "Tax Consultancy",
    description:
      "Professional support for KRA, eCitizen, NTSA and other government digital services.",
    image: "/projects/tax.jpg",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="bg-[#081225] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
            Our Work
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Projects & Success Stories
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            A glimpse of the professional solutions we deliver to businesses,
            institutions and individuals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="mb-6 h-40 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20"></div>

              <span className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
                {project.category}
              </span>

              <h3 className="mt-3 text-2xl font-bold text-white">
                {project.title}
              </h3>

              <p className="mt-4 text-slate-300">
                {project.description}
              </p>

              <button className="mt-6 text-cyan-400 transition hover:text-cyan-300">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}