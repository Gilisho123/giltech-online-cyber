"use client";

import { useEffect, useState } from "react";

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchContacts();
    }, []);

    async function fetchContacts() {
        try {
            const res = await fetch("/api/contact");

            if (!res.ok) {
                throw new Error("Failed to fetch contacts");
            }

            const data = await res.json();
            setContacts(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load contacts.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#081225] text-white p-8">

            <h1 className="text-4xl font-bold mb-8">
                Contact Messages
            </h1>

            {loading && (
                <p className="text-cyan-400">
                    Loading contacts...
                </p>
            )}

            {error && (
                <p className="text-red-400">
                    {error}
                </p>
            )}

            {!loading && !error && (

                <div className="overflow-x-auto rounded-2xl border border-cyan-500/20">

                    <table className="min-w-full">

                        <thead className="bg-cyan-700">

                            <tr>

                                <th className="px-4 py-3 text-left">Name</th>

                                <th className="px-4 py-3 text-left">Email</th>

                                <th className="px-4 py-3 text-left">Phone</th>

                                <th className="px-4 py-3 text-left">Subject</th>

                                <th className="px-4 py-3 text-left">Status</th>

                                <th className="px-4 py-3 text-left">Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {contacts.map((contact) => (

                                <tr
                                    key={contact.id}
                                    className="border-b border-slate-700 hover:bg-slate-800"
                                >

                                    <td className="px-4 py-4">
                                        {contact.name}
                                    </td>

                                    <td className="px-4 py-4">
                                        {contact.email}
                                    </td>

                                    <td className="px-4 py-4">
                                        {contact.phone}
                                    </td>

                                    <td className="px-4 py-4">
                                        {contact.subject}
                                    </td>

                                    <td className="px-4 py-4">

                                        <span className="rounded-full bg-cyan-600 px-3 py-1 text-sm">
                                            {contact.status}
                                        </span>

                                    </td>

                                    <td className="px-4 py-4">
                                        {new Date(contact.createdAt).toLocaleString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </main>
    );
}