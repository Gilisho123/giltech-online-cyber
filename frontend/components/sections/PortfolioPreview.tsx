import Image from "next/image";
import Link from "next/link";


interface PortfolioPreviewProps {

  projects: {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    url?: string | null;
  }[];

}



export default function PortfolioPreview({
  projects,
}: PortfolioPreviewProps) {


  return (

    <section className="bg-[#081225] py-24">


      <div className="mx-auto max-w-7xl px-6">


        {/* Heading */}

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





        {/* Cards */}


        <div className="mt-16 grid gap-8 lg:grid-cols-3">


          {projects.map((project) => (

            <div
              key={project.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            >



              {/* Image */}

              <div className="relative h-56 w-full">


                <Image

                  src={project.image || "/projects/default.png"}

                  alt={project.title}

                  fill

                  className="object-cover"

                />


              </div>





              {/* Content */}


              <div className="p-8">


                <span className="text-sm font-semibold uppercase tracking-wider text-cyan-300">

                  {project.category}

                </span>




                <h3 className="mt-3 text-2xl font-bold text-white">

                  {project.title}

                </h3>





                <p className="mt-4 text-slate-300">

                  {project.description}

                </p>





                <Link

                  href={project.url || "/portfolio"}

                  className="mt-6 inline-block text-cyan-400 transition hover:text-cyan-300"

                >

                  Learn More →

                </Link>



              </div>




            </div>


          ))}


        </div>



      </div>


    </section>

  );

}