"use client";

interface StatItem {
  id: number;
  value: string;
  label: string;
}

interface StatsProps {
  stats: StatItem[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="bg-[#081225] py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-[820px] rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm sm:p-5 lg:p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl sm:p-7 lg:p-8"
              >
                <h3 className="text-4xl font-black text-cyan-600 sm:text-5xl">
                  {stat.value}
                </h3>

                <p className="mt-4 text-base font-medium text-slate-600 sm:text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}