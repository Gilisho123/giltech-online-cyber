import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";
import AppShell from "./AppShell";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {

  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  authors: [
    {
      name: siteConfig.author.name,
    },
  ],

  creator: siteConfig.author.name,

  applicationName: siteConfig.name,

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const settings = await getSiteSettings();



  const appShellSettings = settings
    ? {
      companyName: settings.companyName,
      tagline: settings.tagline,

      phone: settings.phone,
      email: settings.email,
      address: settings.address,

      facebook: settings.facebook,
      twitter: settings.twitter,
      linkedin: settings.linkedin,
      instagram: settings.instagram,
      github: settings.github,

      footerText: settings.footerText,
    }
    : null;



  return (

    <html lang="en">

      <body className={`${inter.className} bg-[#081225] text-white`}>

        <AppShell settings={appShellSettings}>

          {children}

        </AppShell>


      </body>

    </html>

  );

}