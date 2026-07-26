import type { ReactNode } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}

            <AdminSidebar />

            {/* Main Content */}

            <div className="flex flex-1 flex-col overflow-hidden">

                <AdminHeader />

                <main className="flex-1 overflow-y-auto p-8">

                    {children}

                </main>

            </div>

        </div>
    );
}