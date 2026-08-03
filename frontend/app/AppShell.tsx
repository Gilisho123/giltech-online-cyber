"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";


interface AppShellProps {
    children: React.ReactNode;

    settings: {
        companyName: string;
        tagline: string;

        phone: string;
        email: string;
        address: string;

        facebook: string | null;
        twitter: string | null;
        linkedin: string | null;
        instagram: string | null;
        github: string | null;

        footerText: string;
    } | null;
}


export default function AppShell({
    children,
    settings,
}: AppShellProps) {

    const pathname = usePathname();

    const isAdmin = pathname.startsWith("/admin");


    if (isAdmin) {
        return <>{children}</>;
    }


    const navbarSettings = settings
        ? {
            companyName: settings.companyName,
            tagline: settings.tagline,
        }
        : null;


    return (
        <>
            <Navbar settings={navbarSettings} />


            <main className="min-h-screen">
                {children}
            </main>


            <Footer settings={settings} />


            <WhatsAppButton />
        </>
    );
}