"use client";

import { useEffect, useState } from "react";

interface SiteSettings {
    companyName: string;
    tagline: string;

    heroTitle: string;
    heroSubtitle: string;

    heroButtonText: string;
    heroButtonLink: string;

    heroImage: string;

    aboutTitle: string;
    aboutDescription: string;

    phone: string;
    email: string;
    address: string;

    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    github: string;

    footerText: string;
}

const emptySettings: SiteSettings = {
    companyName: "",
    tagline: "",

    heroTitle: "",
    heroSubtitle: "",

    heroButtonText: "",
    heroButtonLink: "",

    heroImage: "",

    aboutTitle: "",
    aboutDescription: "",

    phone: "",
    email: "",
    address: "",

    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    github: "",

    footerText: "",
};

export default function SettingsPage() {
    const [settings, setSettings] =
        useState<SiteSettings>(emptySettings);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();

            setSettings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function update(
        field: keyof SiteSettings,
        value: string
    ) {
        setSettings((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function saveSettings() {
        setSaving(true);

        try {
            const res = await fetch("/api/settings", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(settings),
            });

            if (!res.ok) {
                alert("Failed to save settings.");
                return;
            }

            alert("Settings updated successfully.");
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
                Loading Settings...
            </div>
        );
    }

    return (
        <main className="space-y-8">

            <div>
                <h1 className="text-4xl font-black text-slate-800">
                    Website Settings
                </h1>

                <p className="mt-2 text-slate-500">
                    Manage your entire website from one place.
                </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow space-y-8">

                <h2 className="text-2xl font-bold">
                    Company Information
                </h2>

                <input
                    value={settings.companyName}
                    onChange={(e) =>
                        update("companyName", e.target.value)
                    }
                    placeholder="Company Name"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.tagline}
                    onChange={(e) =>
                        update("tagline", e.target.value)
                    }
                    placeholder="Tagline"
                    className="w-full rounded-xl border p-3"
                />

                <h2 className="text-2xl font-bold">
                    Hero Section
                </h2>

                <input
                    value={settings.heroTitle}
                    onChange={(e) =>
                        update("heroTitle", e.target.value)
                    }
                    placeholder="Hero Title"
                    className="w-full rounded-xl border p-3"
                />

                <textarea
                    rows={4}
                    value={settings.heroSubtitle}
                    onChange={(e) =>
                        update("heroSubtitle", e.target.value)
                    }
                    placeholder="Hero Subtitle"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.heroButtonText}
                    onChange={(e) =>
                        update(
                            "heroButtonText",
                            e.target.value
                        )
                    }
                    placeholder="Hero Button Text"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.heroButtonLink}
                    onChange={(e) =>
                        update(
                            "heroButtonLink",
                            e.target.value
                        )
                    }
                    placeholder="/services"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.heroImage}
                    onChange={(e) =>
                        update("heroImage", e.target.value)
                    }
                    placeholder="Hero Image URL"
                    className="w-full rounded-xl border p-3"
                />

                <h2 className="text-2xl font-bold">
                    About
                </h2>

                <input
                    value={settings.aboutTitle}
                    onChange={(e) =>
                        update("aboutTitle", e.target.value)
                    }
                    placeholder="About Title"
                    className="w-full rounded-xl border p-3"
                />

                <textarea
                    rows={5}
                    value={settings.aboutDescription}
                    onChange={(e) =>
                        update(
                            "aboutDescription",
                            e.target.value
                        )
                    }
                    placeholder="About Description"
                    className="w-full rounded-xl border p-3"
                />

                <h2 className="text-2xl font-bold">
                    Contact
                </h2>

                <input
                    value={settings.phone}
                    onChange={(e) =>
                        update("phone", e.target.value)
                    }
                    placeholder="Phone"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.email}
                    onChange={(e) =>
                        update("email", e.target.value)
                    }
                    placeholder="Email"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.address}
                    onChange={(e) =>
                        update("address", e.target.value)
                    }
                    placeholder="Address"
                    className="w-full rounded-xl border p-3"
                />

                <h2 className="text-2xl font-bold">
                    Social Media
                </h2>

                <input
                    value={settings.facebook}
                    onChange={(e) =>
                        update("facebook", e.target.value)
                    }
                    placeholder="Facebook"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.twitter}
                    onChange={(e) =>
                        update("twitter", e.target.value)
                    }
                    placeholder="Twitter"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.linkedin}
                    onChange={(e) =>
                        update("linkedin", e.target.value)
                    }
                    placeholder="LinkedIn"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.instagram}
                    onChange={(e) =>
                        update("instagram", e.target.value)
                    }
                    placeholder="Instagram"
                    className="w-full rounded-xl border p-3"
                />

                <input
                    value={settings.github}
                    onChange={(e) =>
                        update("github", e.target.value)
                    }
                    placeholder="GitBranch"
                    className="w-full rounded-xl border p-3"
                />

                <h2 className="text-2xl font-bold">
                    Footer
                </h2>

                <textarea
                    rows={3}
                    value={settings.footerText}
                    onChange={(e) =>
                        update("footerText", e.target.value)
                    }
                    placeholder="Footer Text"
                    className="w-full rounded-xl border p-3"
                />

                <button
                    disabled={saving}
                    onClick={saveSettings}
                    className="rounded-xl bg-cyan-600 px-8 py-3 font-bold text-white hover:bg-cyan-700 disabled:opacity-50"
                >
                    {saving
                        ? "Saving..."
                        : "Save Settings"}
                </button>

            </div>

        </main>
    );
}