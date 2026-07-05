export default function Stats() {
  const stats = [
    {
      value: "100+",
      label: "Professional Services",
    },
    {
      value: "500+",
      label: "Clients Assisted",
    },
    {
      value: "24/7",
      label: "Online Support",
    },
    {
      value: "99%",
      label: "Client Satisfaction",
    },
  ];

  return (
    <section className="bg-[#081225] py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400"
          >
            <h2 className="text-4xl font-black text-cyan-400">
              {item.value}
            </h2>

            <p className="mt-3 text-slate-300">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}