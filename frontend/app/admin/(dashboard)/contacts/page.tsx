"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Eye,
    Mail,
    Phone,
    Calendar,
    X,
} from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminActionButton from "@/components/admin/AdminActionButton";

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

    const [selectedContact, setSelectedContact] =
        useState<Contact | null>(null);

    const [showModal, setShowModal] =
        useState(false);

    useEffect(() => {

        async function loadContacts() {

            try {

                const res = await fetch("/api/contact");

                const data = await res.json();

                if (Array.isArray(data)) {

                    setContacts(data);

                } else {

                    setContacts([]);

                }

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

            if (!res.ok) throw new Error();

            setContacts((previous) =>
                previous.map((contact) =>
                    contact.id === id
                        ? {
                            ...contact,
                            status: "Read",
                        }
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
            "Delete this contact permanently?"
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

            if (!res.ok) throw new Error();

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

                contact.name.toLowerCase().includes(keyword)

                ||

                contact.email.toLowerCase().includes(keyword)

                ||

                contact.phone.toLowerCase().includes(keyword)

                ||

                contact.subject.toLowerCase().includes(keyword)

            );

        });

    }, [contacts, search]);

    const totalContacts = contacts.length;

    const newContacts = contacts.filter(
        (contact) => contact.status === "New"
    ).length;

    const todaysContacts = contacts.filter(
        (contact) =>
            new Date(contact.createdAt).toDateString() ===
            new Date().toDateString()
    ).length;

    const uniqueClients =
        new Set(
            contacts.map((contact) => contact.email)
        ).size;

    if (loading) {

        return (

            <AdminLoading
                cards={4}
                rows={8}
            />

        );

    }

    const columns = [

        {
            key: "name",
            label: "Name",
        },

        {
            key: "email",
            label: "Email",
        },

        {
            key: "phone",
            label: "Phone",
        },

        {
            key: "subject",
            label: "Subject",
        },

        {
            key: "status",
            label: "Status",
        },

        {
            key: "date",
            label: "Date",
        },

        {
            key: "actions",
            label: "Actions",
        },

    ];

    return (

        <div className="space-y-8">

            <AdminPageHeader

                badge="CONTACT MANAGEMENT"

                title="Customer Contact Messages"

                description="Manage all enquiries received through Giltech Online Cyber."

            />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <AdminStatCard

                    title="Total Contacts"

                    value={totalContacts}

                    icon={<Mail size={28} />}

                />

                <AdminStatCard

                    title="New Messages"

                    value={newContacts}

                    icon={<Mail size={28} />}

                    color="bg-cyan-100 text-cyan-600"

                />

                <AdminStatCard

                    title="Today's Messages"

                    value={todaysContacts}

                    icon={<Calendar size={28} />}

                    color="bg-green-100 text-green-600"

                />

                <AdminStatCard

                    title="Unique Clients"

                    value={uniqueClients}

                    icon={<Phone size={28} />}

                    color="bg-purple-100 text-purple-600"

                />

            </div>

            <AdminSearch

                search={search}

                onSearch={setSearch}

                placeholder="Search by name, email, phone or subject..."

            />
            <AdminTable

                columns={columns}

                data={filteredContacts}

                renderRow={(contact) => (

                    <tr
                        key={contact.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                        <td className="px-6 py-5 font-semibold text-slate-800 whitespace-nowrap">
                            {contact.name}
                        </td>

                        <td className="px-6 py-5 text-slate-600 whitespace-nowrap">
                            {contact.email}
                        </td>

                        <td className="px-6 py-5 text-slate-600 whitespace-nowrap">
                            {contact.phone}
                        </td>

                        <td className="px-6 py-5 text-slate-700">
                            {contact.subject}
                        </td>

                        <td className="px-6 py-5">

                            <StatusBadge
                                status={contact.status}
                            />

                        </td>

                        <td className="px-6 py-5 text-slate-500 whitespace-nowrap">

                            {new Date(
                                contact.createdAt
                            ).toLocaleDateString()}

                        </td>

                        <td className="px-6 py-5">

                            <div className="flex justify-center">

                                <AdminActionButton

                                    variant="outline"

                                    icon={<Eye size={16} />}

                                    onClick={() => {

                                        setSelectedContact(contact);

                                        setShowModal(true);

                                    }}

                                >

                                    View

                                </AdminActionButton>

                            </div>

                        </td>

                    </tr>

                )}

            />

            {filteredContacts.length === 0 && (

                <AdminEmptyState

                    icon={<Mail size={38} />}

                    title="No contact messages found"

                    description="Customer enquiries will appear here after someone submits the contact form."

                />

            )}

            {showModal && selectedContact && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

                    <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

                        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

                            <div>

                                <h2 className="text-3xl font-black text-slate-800">
                                    Contact Details
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Customer enquiry information
                                </p>

                            </div>

                            <button

                                onClick={() =>
                                    setShowModal(false)
                                }

                                className="rounded-xl p-2 transition hover:bg-slate-100"

                            >

                                <X />

                            </button>

                        </div>

                        <div className="space-y-6 p-8">

                            <div className="grid gap-6 md:grid-cols-3">

                                <div className="rounded-2xl border border-slate-200 p-5">

                                    <Mail
                                        className="mb-3 text-cyan-600"
                                    />

                                    <p className="text-sm text-slate-500">
                                        Email
                                    </p>

                                    <h3 className="mt-2 font-semibold text-slate-800">
                                        {selectedContact.email}
                                    </h3>

                                </div>

                                <div className="rounded-2xl border border-slate-200 p-5">

                                    <Phone
                                        className="mb-3 text-green-600"
                                    />

                                    <p className="text-sm text-slate-500">
                                        Phone
                                    </p>

                                    <h3 className="mt-2 font-semibold text-slate-800">
                                        {selectedContact.phone}
                                    </h3>

                                </div>

                                <div className="rounded-2xl border border-slate-200 p-5">

                                    <Calendar
                                        className="mb-3 text-purple-600"
                                    />

                                    <p className="text-sm text-slate-500">
                                        Date
                                    </p>

                                    <h3 className="mt-2 font-semibold text-slate-800">
                                        {new Date(
                                            selectedContact.createdAt
                                        ).toLocaleString()}
                                    </h3>

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-slate-700">
                                    Full Name
                                </label>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    {selectedContact.name}
                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-slate-700">
                                    Subject
                                </label>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    {selectedContact.subject}
                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold text-slate-700">
                                    Message
                                </label>

                                <div className="min-h-40 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    {selectedContact.message}
                                </div>

                            </div>
                            <div className="flex flex-wrap justify-end gap-4 border-t border-slate-200 pt-6">

                                {selectedContact.status === "New" && (

                                    <AdminActionButton

                                        variant="success"

                                        onClick={() =>
                                            markAsRead(selectedContact.id)
                                        }

                                    >

                                        Mark as Read

                                    </AdminActionButton>

                                )}

                                <AdminActionButton

                                    variant="danger"

                                    onClick={() =>
                                        deleteContact(selectedContact.id)
                                    }

                                >

                                    Delete

                                </AdminActionButton>

                                <AdminActionButton

                                    variant="outline"

                                    onClick={() =>
                                        setShowModal(false)
                                    }

                                >

                                    Close

                                </AdminActionButton>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}