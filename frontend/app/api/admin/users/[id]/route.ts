import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(
    req: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;
        const adminId = Number(id);

        const body = await req.json();

        const existing = await prisma.admin.findUnique({
            where: {
                id: adminId,
            },
        });

        if (!existing) {
            return NextResponse.json(
                {
                    message: "Administrator not found.",
                },
                {
                    status: 404,
                }
            );
        }

        if (body.username) {
            const usernameExists =
                await prisma.admin.findFirst({
                    where: {
                        username: body.username,
                        NOT: {
                            id: adminId,
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
        }

        if (body.email) {
            const emailExists =
                await prisma.admin.findFirst({
                    where: {
                        email: body.email,
                        NOT: {
                            id: adminId,
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
        }

        const data: {
            username?: string;
            name?: string;
            email?: string;
            role?: string;
            active?: boolean;
            password?: string;
        } = {};

        if (body.username !== undefined)
            data.username = body.username;

        if (body.name !== undefined)
            data.name = body.name;

        if (body.email !== undefined)
            data.email = body.email;

        if (body.role !== undefined)
            data.role = body.role;

        if (body.active !== undefined)
            data.active = body.active;

        if (body.password) {
            data.password = await bcrypt.hash(
                body.password,
                10
            );
        }

        const updated =
            await prisma.admin.update({
                where: {
                    id: adminId,
                },
                data,
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

export async function DELETE(
    req: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;
        const adminId = Number(id);

        const existing =
            await prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });

        if (!existing) {
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
                id: adminId,
            },
        });

        return NextResponse.json({
            success: true,
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