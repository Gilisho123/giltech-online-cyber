"use client";

import { useEffect, useState } from "react";

interface CallToAction {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    phone: string;
    email: string;
    active: boolean;
}

const emptyCTA: CallToAction = {
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    phone: "",
    email: "",
    active: true,
};

export default function CallToActionPage() {

    const [cta, setCTA] = useState<CallToAction>(emptyCTA);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadCTA();
    }, []);

    async function loadCTA() {

        try {

            const res = await fetch("/api/call-to-action");

            const data = await res.json();

            setCTA(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    function update(
        field: keyof CallToAction,
        value: string | boolean
    ) {

        setCTA((prev) => ({
            ...prev,
            [field]: value,
        }));

    }

    async function saveCTA() {

        setSaving(true);

        try {

            const res = await fetch("/api/call-to-action", {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(cta),

            });

            if (!res.ok) {

                alert("Failed to save.");

                return;

            }

            alert("Call To Action updated successfully.");

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        } finally {

            setSaving(false);

        }

    }

    if (loading) {

        return (

            <div className="p-20 text-center">

                Loading...

            </div>

        );

    }

    return (

        <main className="space-y-8">

            <div>

                <h1 className="text-4xl font-black text-slate-800">

                    Call To Action

                </h1>

                <p className="mt-2 text-slate-500">

                    Manage the homepage call-to-action section.

                </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow space-y-6">

                <h2 className="text-2xl font-bold">

                    CTA Content

                </h2>

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Title"
                    value={cta.title}
                    onChange={(e) =>
                        update("title", e.target.value)
                    }
                />

                <textarea
                    rows={4}
                    className="w-full rounded-xl border p-3"
                    placeholder="Subtitle"
                    value={cta.subtitle}
                    onChange={(e) =>
                        update("subtitle", e.target.value)
                    }
                />

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Button Text"
                    value={cta.buttonText}
                    onChange={(e) =>
                        update("buttonText", e.target.value)
                    }
                />

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="/contact"
                    value={cta.buttonLink}
                    onChange={(e) =>
                        update("buttonLink", e.target.value)
                    }
                />

                <h2 className="text-2xl font-bold">

                    Contact Information

                </h2>

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Phone"
                    value={cta.phone}
                    onChange={(e) =>
                        update("phone", e.target.value)
                    }
                />

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Email"
                    value={cta.email}
                    onChange={(e) =>
                        update("email", e.target.value)
                    }
                />

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        checked={cta.active}
                        onChange={(e) =>
                            update("active", e.target.checked)
                        }
                    />

                    Active

                </label>

                <button
                    disabled={saving}
                    onClick={saveCTA}
                    className="rounded-xl bg-cyan-600 px-8 py-3 font-bold text-white hover:bg-cyan-700 disabled:opacity-50"
                >
                    {saving
                        ? "Saving..."
                        : "Save CTA"}
                </button>

            </div>

        </main>

    );

}