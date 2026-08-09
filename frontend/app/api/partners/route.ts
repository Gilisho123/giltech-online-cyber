import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const partners = await prisma.partner.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(partners);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to load partners." },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const partner = await prisma.partner.create({
            data: {
                name: body.name,
                logo: body.logo,
                website: body.website || null,
                featured: body.featured ?? true,
            },
        });

        return NextResponse.json(partner);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to create partner." },
            { status: 500 }
        );
    }
}