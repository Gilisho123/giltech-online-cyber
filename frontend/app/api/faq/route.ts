import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: {
                order: "asc",
            },
        });

        return NextResponse.json(faqs);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to load FAQs." },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const faq = await prisma.fAQ.create({
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
            { message: "Failed to create FAQ." },
            { status: 500 }
        );
    }
}