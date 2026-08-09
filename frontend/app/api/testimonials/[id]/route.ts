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

        const testimonial = await prisma.testimonial.update({
            where: {
                id: Number(id),
            },
            data: {
                name: body.name,
                position: body.position,
                company: body.company,
                message: body.message,
                rating: body.rating ?? 5,
                image: body.image || "/avatar.png",
                featured: body.featured ?? true,
            },
        });

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update testimonial." },
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

        await prisma.testimonial.delete({
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
            { message: "Failed to delete testimonial." },
            { status: 500 }
        );
    }
}