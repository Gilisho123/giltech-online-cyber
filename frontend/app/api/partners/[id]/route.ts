import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(
    req: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const partner = await prisma.partner.update({
            where: {
                id: Number(id),
            },
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
            { message: "Failed to update partner." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;

        await prisma.partner.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete partner." },
            { status: 500 }
        );
    }
}