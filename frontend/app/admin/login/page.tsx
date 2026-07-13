"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid username or password.");
            return;
        }

        router.push("/admin");
        router.refresh();
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#081225] px-6">

            <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-xl">

                <h1 className="text-center text-4xl font-black text-white">
                    Giltech Admin
                </h1>

                <p className="mt-3 text-center text-slate-400">
                    Sign in to continue
                </p>

                {error && (
                    <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/20 p-4 text-center text-red-300">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 text-white outline-none transition focus:border-cyan-500"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#101c33] p-4 text-white outline-none transition focus:border-cyan-500"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

            </div>

        </main>
    );
}