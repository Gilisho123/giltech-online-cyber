import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// GET ALL STATS

export async function GET() {

    try {

        const stats = await prisma.siteStats.findMany({

            orderBy: {
                order: "asc",
            },

        });


        return NextResponse.json(stats);


    } catch (error) {

        console.error(error);


        return NextResponse.json(

            {
                message: "Failed to fetch stats",
            },

            {
                status: 500,
            }

        );

    }

}





// CREATE STAT

export async function POST(
    req: NextRequest
) {

    try {


        const body = await req.json();


        const stat = await prisma.siteStats.create({

            data: {

                value: body.value,

                label: body.label,

                order: body.order ?? 0,

            },

        });



        return NextResponse.json(stat);



    } catch (error) {


        console.error(error);


        return NextResponse.json(

            {
                message: "Failed to create stat",
            },

            {
                status: 500,
            }

        );


    }

}