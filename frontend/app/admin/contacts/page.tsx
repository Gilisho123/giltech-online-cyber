"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Search, X, Mail, Phone, Calendar } from "lucide-react";

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

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function loadContacts() {
            try {
                const res = await fetch("/api/contact");
                const data = await res.json();
                setContacts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadContacts();
    }, []);
    async function markAsRead(id: number) {
        try {
            const res = await fetch("/api/contact", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    status: "Read",
                }),
            });

            if (!res.ok) {
                throw new Error("Update failed");
            }

            setContacts((previous) =>
                previous.map((contact) =>
                    contact.id === id
                        ? { ...contact, status: "Read" }
                        : contact
                )
            );

            if (selectedContact?.id === id) {
                setSelectedContact({
                    ...selectedContact,
                    status: "Read",
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteContact(id: number) {

        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this contact?"
        );

        if (!confirmed) return;

        try {

            const res = await fetch("/api/contact", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                }),
            });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            setContacts((previous) =>
                previous.filter((contact) => contact.id !== id)
            );

            setShowModal(false);

        } catch (error) {

            console.error(error);

            alert("Failed to delete contact.");

        }
    }

    const filteredContacts = useMemo(() => {
        return contacts.filter((contact) => {
            const keyword = search.toLowerCase();

            return (
                contact.name.toLowerCase().includes(keyword) ||
                contact.email.toLowerCase().includes(keyword) ||
                contact.phone.toLowerCase().includes(keyword) ||
                contact.subject.toLowerCase().includes(keyword)
            );
        });
    }, [contacts, search]);

    const totalContacts = contacts.length;

    const newContacts = contacts.filter(
        (contact) => contact.status === "New"
    ).length;

    const uniqueClients = new Set(
        contacts.map((contact) => contact.email)
    ).size;

    const todaysContacts = contacts.filter((contact) => {
        return (
            new Date(contact.createdAt).toDateString() ===
            new Date().toDateString()
        );
    }).length;

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center text-xl font-bold text-cyan-400">
                Loading contacts...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#081225] text-white">

            {/* Header */}

            <div className="mb-10">

                <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-400">
                    CONTACT MANAGEMENT
                </span>

                <h1 className="mt-6 text-4xl font-black">
                    Customer Contact Messages
                </h1>

                <p className="mt-3 text-slate-400">
                    Manage all enquiries received through Giltech Online Cyber.
                </p>

            </div>

            {/* Statistics */}

            <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6">
                    <p className="text-slate-400">
                        Total Contacts
                    </p>

                    <h2 className="mt-3 text-5xl font-black text-cyan-400">
                        {totalContacts}
                    </h2>
                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6">
                    <p className="text-slate-400">
                        New Messages
                    </p>

                    <h2 className="mt-3 text-5xl font-black text-cyan-400">
                        {newContacts}
                    </h2>
                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6">
                    <p className="text-slate-400">
                        Today's Messages
                    </p>

                    <h2 className="mt-3 text-5xl font-black text-cyan-400">
                        {todaysContacts}
                    </h2>
                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6">
                    <p className="text-slate-400">
                        Unique Clients
                    </p>

                    <h2 className="mt-3 text-5xl font-black text-cyan-400">
                        {uniqueClients}
                    </h2>
                </div>

            </div>

            {/* Search */}

            <div className="relative mb-8">

                <Search
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
                />

                <input
                    type="text"
                    placeholder="Search by name, email, phone or subject..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-2xl border border-cyan-500/20 bg-[#101c33] py-4 pl-14 pr-5 text-white outline-none transition focus:border-cyan-400"
                />

            </div>

            {/* Table */}

            <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="border-b border-cyan-500/20 bg-[#101c33]">

                            <tr>

                                <th className="px-6 py-5 text-left font-semibold text-cyan-400">
                                    Name
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-cyan-400">
                                    Email
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-cyan-400">
                                    Phone
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-cyan-400">
                                    Subject
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-cyan-400">
                                    Status
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-cyan-400">
                                    Date
                                </th>

                                <th className="px-6 py-5 text-center font-semibold text-cyan-400">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredContacts.map((contact) => (

                                <tr
                                    key={contact.id}
                                    className="border-b border-cyan-500/10 transition hover:bg-cyan-500/10"
                                >

                                    <td className="px-6 py-5 font-semibold whitespace-nowrap">
                                        {contact.name}
                                    </td>

                                    <td className="px-6 py-5 text-slate-300 whitespace-nowrap">
                                        {contact.email}
                                    </td>

                                    <td className="px-6 py-5 text-slate-300 whitespace-nowrap">
                                        {contact.phone}
                                    </td>

                                    <td className="px-6 py-5">
                                        {contact.subject}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold border ${contact.status === "New"
                                                ? "border-cyan-500/30 bg-cyan-500/20 text-cyan-300"
                                                : contact.status === "Read"
                                                    ? "border-green-500/30 bg-green-500/20 text-green-300"
                                                    : "border-yellow-500/30 bg-yellow-500/20 text-yellow-300"
                                                }`}
                                        >
                                            {contact.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-slate-400 whitespace-nowrap">
                                        {new Date(
                                            contact.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center">

                                            <button
                                                onClick={() => {
                                                    setSelectedContact(contact);
                                                    setShowModal(true);
                                                }}
                                                className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
                                                title="View Message"
                                            >
                                                <Eye size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                            {filteredContacts.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={7}
                                        className="py-16 text-center text-slate-400"
                                    >
                                        No contacts found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
            {showModal && selectedContact && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                    <div className="w-full max-w-2xl rounded-3xl border border-cyan-500/20 bg-[#101c33] p-8 text-white shadow-2xl">

                        <div className="mb-8 flex items-center justify-between">

                            <h2 className="text-3xl font-black text-cyan-400">
                                Contact Details
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-xl p-2 hover:bg-white/10"
                            >
                                <X />
                            </button>

                        </div>

                        <div className="space-y-6">

                            <div className="flex items-center gap-3">
                                <Mail className="text-cyan-400" />
                                <div>
                                    <p className="text-sm text-slate-400">Email</p>
                                    <p>{selectedContact.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="text-cyan-400" />
                                <div>
                                    <p className="text-sm text-slate-400">Phone</p>
                                    <p>{selectedContact.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar className="text-cyan-400" />
                                <div>
                                    <p className="text-sm text-slate-400">Received</p>
                                    <p>
                                        {new Date(selectedContact.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-slate-400">
                                    Full Name
                                </p>

                                <div className="rounded-xl bg-[#081225] p-4">
                                    {selectedContact.name}
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-slate-400">
                                    Subject
                                </p>

                                <div className="rounded-xl bg-[#081225] p-4">
                                    {selectedContact.subject}
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-slate-400">
                                    Message
                                </p>

                                <div className="min-h-40 rounded-xl bg-[#081225] p-4 whitespace-pre-wrap">
                                    {selectedContact.message}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-4">

                                <button
                                    onClick={() => deleteContact(selectedContact.id)}
                                    className="rounded-xl border border-red-500 bg-red-500/20 px-6 py-3 font-bold text-red-300 transition hover:bg-red-600 hover:text-white"
                                >
                                    Delete
                                </button>

                                {selectedContact.status === "New" && (

                                    <button
                                        onClick={() => markAsRead(selectedContact.id)}
                                        className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
                                    >
                                        Mark as Read
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </main>
    );
}