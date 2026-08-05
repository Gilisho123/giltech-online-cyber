import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {

        let cta = await prisma.callToAction.findUnique({
            where: {
                id: 1,
            },
        });

        if (!cta) {

            cta = await prisma.callToAction.create({

                data: {

                    id: 1,

                    title: "Ready to Transform Your Business?",

                    subtitle:
                        "From government services to AI, software development and tax consultancy, we're ready to help.",

                    buttonText: "Request Service",

                    buttonLink: "/contact",

                    phone: "+254758220554",

                    email: "giltechonlinecyber@gmail.com",

                },

            });

        }

        return NextResponse.json(cta);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to load CTA.",
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

        const cta = await prisma.callToAction.upsert({

            where: {
                id: 1,
            },

            update: body,

            create: {
                id: 1,
                ...body,
            },

        });

        return NextResponse.json(cta);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to update CTA.",
            },
            {
                status: 500,
            }
        );

    }

}