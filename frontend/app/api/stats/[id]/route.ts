import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}



// UPDATE

export async function PATCH(
    req: NextRequest,
    { params }: RouteContext
) {

    try {

        const { id } = await params;

        const body = await req.json();

        const stat = await prisma.siteStats.update({

            where: {
                id: Number(id),
            },

            data: {

                value: body.value,

                label: body.label,

                order: body.order,

            },

        });

        return NextResponse.json(stat);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to update stat.",
            },
            {
                status: 500,
            }
        );

    }

}



// DELETE

export async function DELETE(
    req: NextRequest,
    { params }: RouteContext
) {

    try {

        const { id } = await params;

        await prisma.siteStats.delete({

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
            {
                message: "Failed to delete stat.",
            },
            {
                status: 500,
            }
        );

    }

}