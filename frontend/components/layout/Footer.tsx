import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaWhatsapp,
    FaXTwitter,
} from "react-icons/fa6";


interface FooterProps {

    settings: {
        companyName: string;
        tagline: string | null;
        phone: string | null;
        email: string | null;
        address: string | null;

        facebook: string | null;
        twitter: string | null;
        linkedin: string | null;
        instagram: string | null;
        github: string | null;

        footerText: string;
    } | null;

}



export default function Footer({
    settings,
}: FooterProps) {


    const year = new Date().getFullYear();


    return (

        <footer className="border-t border-cyan-500/20 bg-[#081225] text-white">


            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">



                {/* Company */}


                <div>


                    <h2 className="text-3xl font-black text-cyan-400">

                        {settings?.companyName || "Giltech Online Cyber"}

                    </h2>


                    <p className="mt-5 leading-8 text-slate-300">

                        {settings?.tagline ||
                            "Empowering businesses and individuals through innovative technology solutions."
                        }

                    </p>


                </div>





                {/* Quick Links */}


                <div>


                    <h3 className="mb-6 text-xl font-bold">

                        Quick Links

                    </h3>



                    <ul className="space-y-4 text-slate-300">


                        <li><Link href="/">Home</Link></li>

                        <li><Link href="/about">About</Link></li>

                        <li><Link href="/services">Services</Link></li>

                        <li><Link href="/portfolio">Portfolio</Link></li>

                        <li><Link href="/contact">Contact</Link></li>


                    </ul>


                </div>






                {/* Services */}


                <div>


                    <h3 className="mb-6 text-xl font-bold">

                        Our Services

                    </h3>



                    <ul className="space-y-4 text-slate-300">


                        <li>Government Services</li>

                        <li>Tax Consultancy</li>

                        <li>Software Development</li>

                        <li>Web Design</li>

                        <li>AI Solutions</li>

                        <li>Data Analytics</li>


                    </ul>


                </div>








                {/* Contact */}


                <div>


                    <h3 className="mb-6 text-xl font-bold">

                        Contact

                    </h3>



                    <div className="space-y-2 text-slate-300">


                        {settings?.phone && (
                            <p>
                                📞 {settings.phone}
                            </p>
                        )}


                        {settings?.email && (
                            <p>
                                ✉ {settings.email}
                            </p>
                        )}


                        {settings?.address && (
                            <p>
                                📍 {settings.address}
                            </p>
                        )}


                    </div>





                    <div className="mt-8 flex gap-4">


                        {settings?.facebook && (

                            <a
                                href={settings.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-cyan-500"
                            >
                                <FaFacebookF size={18} />
                            </a>

                        )}




                        {settings?.instagram && (

                            <a
                                href={settings.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-cyan-500"
                            >
                                <FaInstagram size={18} />
                            </a>

                        )}




                        {settings?.linkedin && (

                            <a
                                href={settings.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-cyan-500"
                            >
                                <FaLinkedinIn size={18} />
                            </a>

                        )}





                        {settings?.github && (

                            <a
                                href={settings.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-cyan-500"
                            >
                                <FaGithub size={18} />
                            </a>

                        )}



                    </div>


                </div>



            </div>







            <div className="border-t border-white/10">


                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-400 md:flex-row">


                    <p>

                        © {year} {settings?.companyName || "Giltech Online Cyber"}.

                        {" "}

                        {settings?.footerText || "All Rights Reserved."}

                    </p>




                    <div className="flex gap-6">


                        <Link href="/privacy-policy">

                            Privacy Policy

                        </Link>



                        <Link href="/terms">

                            Terms of Service

                        </Link>


                    </div>


                </div>


            </div>



        </footer>

    );
}