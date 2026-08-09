import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to load testimonials." },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const testimonial = await prisma.testimonial.create({
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
            { message: "Failed to create testimonial." },
            { status: 500 }
        );
    }
}