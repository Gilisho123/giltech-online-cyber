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

        const item = await prisma.whyChoose.update({
            where: {
                id: Number(id),
            },
            data: body,
        });

        return NextResponse.json(item);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Update failed." },
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

        await prisma.whyChoose.delete({
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
            { message: "Delete failed." },
            { status: 500 }
        );

    }

}