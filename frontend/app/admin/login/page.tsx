"use client";

import { useState } from "react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        // Backend login will be connected next
        console.log({
            email,
            password,
        });

        setLoading(false);
    }

    return (
        <main className="min-h-screen bg-[#081225] flex items-center justify-center px-6">

            <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-white/5 p-10">

                <h1 className="text-center text-4xl font-black text-white">
                    Admin Login
                </h1>

                <p className="mt-3 text-center text-slate-400">
                    Giltech Online Cyber Administration
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 text-white outline-none focus:border-cyan-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 text-white outline-none focus:border-cyan-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

            </div>

        </main>
    );
}