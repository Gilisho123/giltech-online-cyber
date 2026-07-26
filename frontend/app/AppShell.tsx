"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen">
                {children}
            </main>

            <Footer />

            <WhatsAppButton />
        </>
    );
}