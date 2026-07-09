"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
} from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({
        from_name: "",
        from_email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !form.from_name ||
            !form.from_email ||
            !form.subject ||
            !form.message
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);

            // Save to Supabase Database
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.from_name,
                    email: form.from_email,
                    phone: form.phone,
                    subject: form.subject,
                    message: form.message,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            // Send EmailJS Notification
            try {
                await emailjs.send(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                    {
                        from_name: form.from_name,
                        from_email: form.from_email,
                        phone: form.phone,
                        subject: form.subject,
                        message: form.message,
                    },
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                );
            } catch (err) {
                console.error("EmailJS Error:", err);
            }

            alert("✅ Message sent successfully!");

            setForm({
                from_name: "",
                from_email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#081225] text-white">

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 py-24">

                <span className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-400">
                    CONTACT US
                </span>

                <h1 className="mt-8 text-5xl font-black">
                    Let's Build Something Amazing Together
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    Whether you need government online services,
                    software development, AI solutions,
                    tax consultancy, or digital transformation,
                    we're here to help.
                </p>

            </section>

            {/* Contact Cards */}
            <section className="mx-auto max-w-7xl px-6 pb-20">

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center">
                        <Phone className="mx-auto text-cyan-400" size={40} />
                        <h3 className="mt-6 text-xl font-bold">Phone</h3>
                        <p className="mt-3 text-slate-300">
                            +254 758 220 554
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center">
                        <Mail className="mx-auto text-cyan-400" size={40} />
                        <h3 className="mt-6 text-xl font-bold">Email</h3>
                        <p className="mt-3 text-slate-300">
                            giltechonlinecyber@gmail.com
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center">
                        <MapPin className="mx-auto text-cyan-400" size={40} />
                        <h3 className="mt-6 text-xl font-bold">Location</h3>
                        <p className="mt-3 text-slate-300">
                            Nakuru, Kenya
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center">
                        <Clock className="mx-auto text-cyan-400" size={40} />
                        <h3 className="mt-6 text-xl font-bold">
                            Business Hours
                        </h3>
                        <p className="mt-3 text-slate-300">
                            Mon – Sat <br />
                            8:00 AM – 6:00 PM
                        </p>
                    </div>

                </div>

            </section>

            {/* Contact Form */}
            <section className="mx-auto max-w-7xl px-6 pb-24">

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10"
                >

                    <h2 className="text-3xl font-black">
                        Send Us a Message
                    </h2>

                    <div className="mt-10 grid gap-6 md:grid-cols-2">

                        <input
                            type="text"
                            name="from_name"
                            value={form.from_name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 outline-none focus:border-cyan-500"
                        />

                        <input
                            type="email"
                            name="from_email"
                            value={form.from_email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 outline-none focus:border-cyan-500"
                        />

                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 outline-none focus:border-cyan-500"
                        />

                    </div>

                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="mt-6 w-full rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 outline-none focus:border-cyan-500"
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Write your message..."
                        className="mt-6 w-full rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 outline-none focus:border-cyan-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Message"}

                        {!loading && <Send size={18} />}
                    </button>

                </form>

            </section>
            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="rounded-[40px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 px-10 py-20 text-center">

                    <h2 className="text-5xl font-black">
                        Ready to Get Started?
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-cyan-100">
                        Contact Giltech Online Cyber today and let's discuss
                        how we can help transform your ideas into reality.
                    </p>

                    <button
                        type="button"
                        className="mt-10 rounded-xl bg-white px-8 py-4 font-bold text-slate-900 transition hover:scale-105"
                    >
                        Request a Service
                    </button>

                </div>

            </section>

        </main>
    );
}