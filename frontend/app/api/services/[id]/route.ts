import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

// GET SINGLE SERVICE
export async function GET(
    req: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;

        const service = await prisma.service.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!service) {
            return NextResponse.json(
                { message: "Service not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(service);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to load service." },
            { status: 500 }
        );
    }
}

// UPDATE SERVICE
export async function PUT(
    req: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;

        const body = await req.json();

        const updated = await prisma.service.update({
            where: {
                id: Number(id),
            },
            data: {
                title: body.title,
                category: body.category,
                description: body.description,
                featured: body.featured,
            },
        });

        return NextResponse.json(updated);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update service." },
            { status: 500 }
        );
    }
}

// DELETE SERVICE
export async function DELETE(
    req: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;

        await prisma.service.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({
            message: "Service deleted successfully.",
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete service." },
            { status: 500 }
        );
    }
}