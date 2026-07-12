import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill in all required fields.",
                },
                { status: 400 }
            );
        }

        // Save to database
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                phone,
                subject,
                message,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Message sent successfully.",
                data: contact,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 }
        );
    }
}
export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error("GET Contacts Error:", error);

        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Unknown error",
            },
            {
                status: 500,
            }
        );
    }
}
export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();

        const contact = await prisma.contact.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });

        return NextResponse.json(contact);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to update contact",
            },
            {
                status: 500,
            }
        );
    }
}