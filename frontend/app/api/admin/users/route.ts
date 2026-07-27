import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const users = await prisma.admin.findMany({
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                role: true,
                active: true,
                lastLogin: true,
                createdAt: true,
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to load administrators.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate required fields
        if (
            !body.username ||
            !body.name ||
            !body.email ||
            !body.password
        ) {
            return NextResponse.json(
                {
                    message:
                        "Username, name, email and password are required.",
                },
                {
                    status: 400,
                }
            );
        }

        // Check duplicate username
        const existingUsername = await prisma.admin.findUnique({
            where: {
                username: body.username,
            },
        });

        if (existingUsername) {
            return NextResponse.json(
                {
                    message: "Username already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        // Check duplicate email
        const existingEmail = await prisma.admin.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existingEmail) {
            return NextResponse.json(
                {
                    message: "Email already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.admin.create({
            data: {
                username: body.username,
                name: body.name,
                email: body.email,
                password: hashedPassword,
                role: body.role || "Administrator",
                active: body.active ?? true,
            },
        });

        return NextResponse.json(user, {
            status: 201,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to create administrator.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.id) {
            return NextResponse.json(
                {
                    message: "Administrator ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const user = await prisma.admin.update({
            where: {
                id: body.id,
            },
            data: {
                username: body.username,
                name: body.name,
                email: body.email,
                role: body.role,
                active: body.active,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to update administrator.",
            },
            {
                status: 500,
            }
        );
    }
}