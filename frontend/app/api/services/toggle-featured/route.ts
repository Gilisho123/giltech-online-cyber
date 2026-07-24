import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {

    try {

        const { id } = await req.json();

        const service = await prisma.service.findUnique({
            where: {
                id,
            },
        });

        if (!service) {

            return NextResponse.json(
                {
                    message: "Service not found.",
                },
                {
                    status: 404,
                }
            );

        }

        const updated = await prisma.service.update({

            where: {
                id,
            },

            data: {
                featured: !service.featured,
            },

        });

        return NextResponse.json(updated);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to update featured status.",
            },
            {
                status: 500,
            }
        );

    }

}