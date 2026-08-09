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

        const faq = await prisma.fAQ.update({
            where: {
                id: Number(id),
            },
            data: {
                question: body.question,
                answer: body.answer,
                featured: body.featured ?? true,
                order: body.order ?? 0,
            },
        });

        return NextResponse.json(faq);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update FAQ." },
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

        await prisma.fAQ.delete({
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
            { message: "Failed to delete FAQ." },
            { status: 500 }
        );
    }
}