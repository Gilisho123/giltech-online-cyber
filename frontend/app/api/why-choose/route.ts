import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {

        const items = await prisma.whyChoose.findMany({
            orderBy: {
                order: "asc",
            },
        });

        return NextResponse.json(items);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Failed to load items." },
            { status: 500 }
        );

    }
}

export async function POST(req: NextRequest) {

    try {

        const body = await req.json();

        const item = await prisma.whyChoose.create({
            data: body,
        });

        return NextResponse.json(item);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Failed to create item." },
            { status: 500 }
        );

    }

}