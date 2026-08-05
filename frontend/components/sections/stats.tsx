"use client";

import { useEffect, useState } from "react";

interface Stat {
  id: number;
  value: string;
  label: string;
  order: number;
}

export default function Stats() {

  const [stats, setStats] = useState<Stat[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadStats() {

      try {

        const res = await fetch("/api/stats");

        const data = await res.json();

        setStats(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadStats();

  }, []);

  if (loading) {

    return (
      <section className="bg-[#081225] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-slate-400">
          Loading statistics...
        </div>
      </section>
    );

  }

  return (

    <section className="bg-[#081225] py-20">

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.id}
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