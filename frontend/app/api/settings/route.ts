import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: {
                id: 1,
            },
        });

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    id: 1,
                    companyName: "Giltech Online Cyber",
                    tagline: "Empowering Businesses Through Digital Innovation",

                    heroTitle:
                        "Empowering Businesses Through Digital Innovation",

                    heroSubtitle:
                        "Professional KRA Services, Software Development, Data Analytics, AI Solutions and Digital Transformation.",

                    heroButtonText: "Explore Services",

                    heroButtonLink: "/services",

                    heroImage: "",

                    aboutTitle: "About Giltech",

                    aboutDescription:
                        "Giltech Online Cyber provides professional digital solutions including software development, tax consultancy, data analytics, AI solutions, and business support.",

                    phone: "+254 758 220 554",

                    email: "giltechonlinecyber@gmail.com",

                    address: "Nakuru, Kenya",

                    facebook: "",

                    twitter: "",

                    linkedin: "",

                    instagram: "",

                    github: "",

                    footerText:
                        "© 2026 Giltech Online Cyber. All rights reserved.",
                },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to load settings.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();

        const settings = await prisma.siteSettings.upsert({
            where: {
                id: 1,
            },
            update: {
                ...body,
            },
            create: {
                id: 1,
                ...body,
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to update settings.",
            },
            {
                status: 500,
            }
        );
    }
}