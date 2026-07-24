import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {

        const settings = await prisma.siteSettings.findUnique({
            where: {
                id: 1,
            },
        });

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

export async function PUT(req: NextRequest) {

    try {

        const body = await req.json();

        const settings = await prisma.siteSettings.upsert({

            where: {
                id: 1,
            },

            update: body,

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
                message: "Failed to save settings.",
            },
            {
                status: 500,
            }
        );

    }
}