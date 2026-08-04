interface StatsProps {
  settings: {
    stat1Number: string;
    stat1Label: string;

    stat2Number: string;
    stat2Label: string;

    stat3Number: string;
    stat3Label: string;

    stat4Number: string;
    stat4Label: string;
  } | null;
}


export default function Stats({ settings }: StatsProps) {


  const data = settings ?? {
    stat1Number: "170+",
    stat1Label: "Professional Services",

    stat2Number: "500+",
    stat2Label: "Clients Assisted",

    stat3Number: "24/7",
    stat3Label: "Online Support",

    stat4Number: "99%",
    stat4Label: "Client Satisfaction",
  };



  const stats = [
    {
      value: data.stat1Number,
      label: data.stat1Label,
    },

    {
      value: data.stat2Number,
      label: data.stat2Label,
    },

    {
      value: data.stat3Number,
      label: data.stat3Label,
    },

    {
      value: data.stat4Number,
      label: data.stat4Label,
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