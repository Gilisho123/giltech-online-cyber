import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const totalContacts = await prisma.contact.count();

        const newContacts = await prisma.contact.count({
            where: {
                status: "New",
            },
        });

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const todaysContacts = await prisma.contact.count({
            where: {
                createdAt: {
                    gte: today,
                },
            },
        });

        const uniqueClients = await prisma.contact.groupBy({
            by: ["email"],
        });

        return NextResponse.json({
            totalContacts,
            newContacts,
            todaysContacts,
            uniqueClients: uniqueClients.length,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to load dashboard",
            },
            {
                status: 500,
            }
        );
    }
}