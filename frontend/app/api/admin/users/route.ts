import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/*
|--------------------------------------------------------------------------
| GET - Fetch all administrators
|--------------------------------------------------------------------------
*/

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
                updatedAt: true,
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

/*
|--------------------------------------------------------------------------
| POST - Create administrator
|--------------------------------------------------------------------------
*/

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

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

        const usernameExists =
            await prisma.admin.findUnique({
                where: {
                    username: body.username,
                },
            });

        if (usernameExists) {
            return NextResponse.json(
                {
                    message: "Username already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const emailExists =
            await prisma.admin.findUnique({
                where: {
                    email: body.email,
                },
            });

        if (emailExists) {
            return NextResponse.json(
                {
                    message: "Email already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const hashedPassword =
            await bcrypt.hash(body.password, 10);

        const user =
            await prisma.admin.create({
                data: {
                    username: body.username,
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                    role:
                        body.role ||
                        "Administrator",
                    active:
                        body.active ?? true,
                },
            });

        return NextResponse.json(user, {
            status: 201,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to create administrator.",
            },
            {
                status: 500,
            }
        );
    }
}

/*
|--------------------------------------------------------------------------
| PUT - Update administrator
|--------------------------------------------------------------------------
*/

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.id) {
            return NextResponse.json(
                {
                    message:
                        "Administrator ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const usernameExists =
            await prisma.admin.findFirst({
                where: {
                    username: body.username,
                    NOT: {
                        id: body.id,
                    },
                },
            });

        if (usernameExists) {
            return NextResponse.json(
                {
                    message:
                        "Username already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const emailExists =
            await prisma.admin.findFirst({
                where: {
                    email: body.email,
                    NOT: {
                        id: body.id,
                    },
                },
            });

        if (emailExists) {
            return NextResponse.json(
                {
                    message:
                        "Email already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const updated =
            await prisma.admin.update({
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

        return NextResponse.json(updated);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to update administrator.",
            },
            {
                status: 500,
            }
        );
    }
}

/*
|--------------------------------------------------------------------------
| DELETE - Delete administrator
|--------------------------------------------------------------------------
*/

export async function DELETE(req: NextRequest) {
    try {

        const { searchParams } =
            new URL(req.url);

        const id =
            Number(searchParams.get("id"));

        if (!id) {
            return NextResponse.json(
                {
                    message:
                        "Administrator ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const user =
            await prisma.admin.findUnique({
                where: {
                    id,
                },
            });

        if (!user) {
            return NextResponse.json(
                {
                    message:
                        "Administrator not found.",
                },
                {
                    status: 404,
                }
            );
        }

        await prisma.admin.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({
            message:
                "Administrator deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to delete administrator.",
            },
            {
                status: 500,
            }
        );
    }
}