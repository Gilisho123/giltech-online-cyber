import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL SERVICES
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(services);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to load services.",
            },
            {
                status: 500,
            }
        );
    }
}

// CREATE SERVICE
export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const service = await prisma.service.create({
            data: {
                title: body.title,
                category: body.category,
                description: body.description,
                featured: body.featured ?? false,
            },
        });

        return NextResponse.json(service);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to create service.",
            },
            {
                status: 500,
            }
        );
    }
}