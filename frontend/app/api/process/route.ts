import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {

        const steps = await prisma.processStep.findMany({
            orderBy: {
                stepNumber: "asc",
            },
        });

        return NextResponse.json(steps);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Failed to load process steps." },
            { status: 500 }
        );

    }
}

export async function POST(req: NextRequest) {

    try {

        const body = await req.json();

        const step = await prisma.processStep.create({
            data: body,
        });

        return NextResponse.json(step);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Failed to create step." },
            { status: 500 }
        );

    }

}