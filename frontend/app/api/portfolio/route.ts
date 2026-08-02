import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {

        const projects = await prisma.portfolio.findMany({

            orderBy: {
                createdAt: "desc",
            },

        });

        return NextResponse.json(projects);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to load portfolio projects.",
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

        if (
            !body.title ||
            !body.category ||
            !body.description
        ) {

            return NextResponse.json(
                {
                    message:
                        "Title, category and description are required.",
                },
                {
                    status: 400,
                }
            );

        }

        const project = await prisma.portfolio.create({

            data: {

                title: body.title,

                category: body.category,

                description: body.description,

                image: body.image || "",

                technologies:
                    body.technologies || "",

                projectUrl:
                    body.projectUrl || null,

                githubUrl:
                    body.githubUrl || null,

                featured:
                    body.featured ?? false,

                active:
                    body.active ?? true,

            },

        });

        return NextResponse.json(project, {

            status: 201,

        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to create portfolio project.",
            },
            {
                status: 500,
            }
        );

    }

}