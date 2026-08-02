import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

        const body = await req.json();

        const project = await prisma.portfolio.update({

            where: {

                id: Number(id),

            },

            data: {

                title: body.title,

                category: body.category,

                description: body.description,

                image: body.image,

                technologies: body.technologies,

                projectUrl: body.projectUrl,

                githubUrl: body.githubUrl,

                featured: body.featured,

                active: body.active,

            },

        });

        return NextResponse.json(project);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to update project.",
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

        await prisma.portfolio.delete({

            where: {

                id: Number(id),

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
                    "Failed to delete project.",
            },
            {
                status: 500,
            }
        );

    }

}