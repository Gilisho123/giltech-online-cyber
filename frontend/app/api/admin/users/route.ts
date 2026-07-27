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

                name: true,

                email: true,

                role: true,

                active: true,

                lastLogin: true,

                createdAt: true,

            },

        });

        return NextResponse.json(users);

    }

    catch (error) {

        console.error(error);

        return NextResponse.json(

            {

                message: "Failed to load users.",

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

        const hashedPassword = await bcrypt.hash(

            body.password,

            10

        );

        const user = await prisma.admin.create({

            data: {

                name: body.name,

                email: body.email,

                password: hashedPassword,

                role: body.role,

                active: body.active,

            },

        });

        return NextResponse.json(user);

    }

    catch (error) {

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

        const user = await prisma.admin.update({

            where: {

                id: body.id,

            },

            data: {

                name: body.name,

                email: body.email,

                role: body.role,

                active: body.active,

            },

        });

        return NextResponse.json(user);

    }

    catch (error) {

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