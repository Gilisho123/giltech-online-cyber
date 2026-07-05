import { Mail, Phone, MapPin } from "lucide-react";

import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaGlobe,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
            <div className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Company */}

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Giltech Online Cyber
                        </h2>

                        <p className="mt-5 leading-7">
                            Empowering businesses and individuals through
                            innovative digital services, government solutions,
                            data analytics, AI, software development and business consultancy.
                        </p>
                    </div>

                    {/* Services */}

                    <div>

                        <h3 className="text-xl font-semibold text-white">
                            Services
                        </h3>

                        <ul className="mt-5 space-y-3">

                            <li>Government Online Services</li>
                            <li>Tax Consultancy</li>
                            <li>Data Analytics</li>
                            <li>Software Development</li>
                            <li>Artificial Intelligence</li>

                        </ul>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-xl font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3">

                            <li>About Us</li>
                            <li>Services</li>
                            <li>Portfolio</li>
                            <li>Contact</li>
                            <li>Request Service</li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-xl font-semibold text-white">
                            Contact
                        </h3>

                        <div className="mt-5 space-y-4">

                            <div className="flex items-center gap-3">
                                <Phone size={18} />
                                <span>+254 758 220 554</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                <span>info@giltech.co.ke</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                <span>Nairobi, Kenya</span>
                            </div>

                        </div>

                        <div className="mt-8 flex gap-4">

                            <FaFacebook className="cursor-pointer text-xl hover:text-cyan-400" />
                            <FaInstagram className="cursor-pointer text-xl hover:text-cyan-400" />
                            <FaLinkedin className="cursor-pointer text-xl hover:text-cyan-400" />
                            <FaGlobe className="cursor-pointer text-xl hover:text-cyan-400" />

                        </div>

                    </div>

                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm">

                    © {new Date().getFullYear()} Giltech Online Cyber.
                    All Rights Reserved.

                </div>

            </div>
        </footer>
    );
}