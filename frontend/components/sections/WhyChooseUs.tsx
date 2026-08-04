interface WhyChooseUsProps {
  settings: {
    whyTitle: string;
    whyDescription: string;

    whyCard1Title: string;
    whyCard1Text: string;

    whyCard2Title: string;
    whyCard2Text: string;

    whyCard3Title: string;
    whyCard3Text: string;

    whyCard4Title: string;
    whyCard4Text: string;

    whyCard5Title: string;
    whyCard5Text: string;

    whyCard6Title: string;
    whyCard6Text: string;

  } | null;
}



export default function WhyChooseUs({
  settings,
}: WhyChooseUsProps) {


  const data = settings ?? {

    whyTitle: "Why Businesses Trust Giltech",

    whyDescription:
      "We combine technology, expertise and customer care to deliver reliable digital solutions for individuals, businesses and organizations.",



    whyCard1Title: "Trusted Expertise",

    whyCard1Text:
      "Professional experience in tax consultancy, government services, software development and data analytics.",



    whyCard2Title: "Fast Turnaround",

    whyCard2Text:
      "Most online services are completed quickly without compromising quality.",



    whyCard3Title: "Secure & Confidential",

    whyCard3Text:
      "We handle your documents and information with the highest level of confidentiality.",



    whyCard4Title: "100+ Digital Services",

    whyCard4Text:
      "Access a wide range of government, business and technology services under one roof.",



    whyCard5Title: "Business Focused",

    whyCard5Text:
      "Helping entrepreneurs, SMEs and organizations embrace digital transformation.",



    whyCard6Title: "Dedicated Support",

    whyCard6Text:
      "Friendly support before, during and after every service request.",

  };




  const features = [

    {
      title: data.whyCard1Title,
      description: data.whyCard1Text,
      icon: "🎓",
    },

    {
      title: data.whyCard2Title,
      description: data.whyCard2Text,
      icon: "⚡",
    },

    {
      title: data.whyCard3Title,
      description: data.whyCard3Text,
      icon: "🔒",
    },

    {
      title: data.whyCard4Title,
      description: data.whyCard4Text,
      icon: "🌐",
    },

    {
      title: data.whyCard5Title,
      description: data.whyCard5Text,
      icon: "📈",
    },

    {
      title: data.whyCard6Title,
      description: data.whyCard6Text,
      icon: "💬",
    },

  ];



  return (

    <section className="bg-[#081225] py-24">


      <div className="mx-auto max-w-7xl px-6">


        <div className="text-center">


          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">

            Why Choose Us

          </span>



          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">

            {data.whyTitle}

          </h2>



          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">

            {data.whyDescription}

          </p>


        </div>





        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            >


              <div className="text-5xl">

                {feature.icon}

              </div>



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