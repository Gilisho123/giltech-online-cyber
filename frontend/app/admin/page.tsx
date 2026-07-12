import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-black text-slate-800">
                Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
                Welcome to the Giltech Online Cyber Admin Dashboard.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl bg-white p-6 shadow">
                    <h2 className="text-lg font-semibold text-slate-500">
                        Contacts
                    </h2>

                    <p className="mt-3 text-4xl font-black text-cyan-600">
                        --
                    </p>

                    <Link
                        href="/admin/contacts"
                        className="mt-5 inline-block text-cyan-600 hover:underline"
                    >
                        View Contacts →
                    </Link>
                </div>

            </div>
        </div>
    );
}