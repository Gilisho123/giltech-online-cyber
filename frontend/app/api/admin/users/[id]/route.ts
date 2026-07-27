import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

/**
 * Update Administrator
 * - Active / Inactive
 * - Password
 */

export async function PATCH(
    req: NextRequest,
    { params }: RouteContext
) {

    try {

        const { id } = await params;

        const body = await req.json();

        const data: any = {};

        if (body.active !== undefined) {

            data.active = body.active;

        }

        if (body.password) {

            data.password = await bcrypt.hash(
                body.password,
                10
            );

        }

        if (body.role) {

            data.role = body.role;

        }

        if (body.name) {

            data.name = body.name;

        }

        if (body.email) {

            data.email = body.email;

        }

        const user = await prisma.admin.update({

            where: {

                id: Number(id),

            },

            data,

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

/**
 * Delete Administrator
 */

export async function DELETE(
    req: NextRequest,
    { params }: RouteContext
) {

    try {

        const { id } = await params;

        await prisma.admin.delete({

            where: {

                id: Number(id),

            },

        });

        return NextResponse.json({

            success: true,

        });

    }

    catch (error) {

        console.error(error);

        return NextResponse.json(

            {

                message: "Failed to delete administrator.",

            },

            {

                status: 500,

            }

        );

    }

}