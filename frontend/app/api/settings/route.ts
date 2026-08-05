import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET() {

    try {


        let settings = await prisma.siteSettings.findUnique({

            where: {
                id: 1,
            },

        });



        if (!settings) {


            settings = await prisma.siteSettings.create({

                data: {

                    id: 1,


                    companyName:
                        "Giltech Online Cyber",


                    tagline:
                        "Kenya's Digital Business Hub",



                    // HERO

                    heroTitle:
                        "Digital Solutions For Modern Businesses",


                    heroSubtitle:
                        "Government services, tax consultancy, data analytics, AI solutions, software development and digital transformation.",



                    heroButtonText:
                        "Request Service",


                    heroButtonLink:
                        "/contact",



                    heroImage:
                        "/images/hero.png",




                    // HERO CARDS

                    heroCard1Title:
                        "Data Analytics",


                    heroCard1Text:
                        "Power BI • Python • Excel • SPSS",



                    heroCard2Title:
                        "AI Solutions",


                    heroCard2Text:
                        "Automation • ChatGPT • AI Training",





                    // ABOUT

                    aboutTitle:
                        "About Giltech",



                    aboutDescription:
                        "Giltech Online Cyber provides professional digital solutions including government services, tax consultancy, software development, data analytics and AI solutions.",






                    // CONTACT

                    phone:
                        "+254 758 220 554",


                    email:
                        "giltechonlinecyber@gmail.com",


                    address:
                        "Nakuru, Kenya",





                    // SOCIAL

                    facebook:
                        "",


                    twitter:
                        "",


                    linkedin:
                        "",


                    instagram:
                        "",


                    github:
                        "",





                    footerText:
                        "© 2026 Giltech Online Cyber. All rights reserved.",


                },

            });

        }



        return NextResponse.json(settings);



    } catch (error) {


        console.error(error);



        return NextResponse.json(

            {
                message:
                    "Failed to load settings.",
            },

            {
                status: 500,
            }

        );


    }

}







export async function PATCH(
    req: NextRequest
) {


    try {


        const body = await req.json();




        const settings =
            await prisma.siteSettings.upsert({

                where: {

                    id: 1,

                },


                update: {

                    ...body,

                },


                create: {

                    id: 1,

                    ...body,

                },


            });





        return NextResponse.json(settings);





    } catch (error) {


        console.error(error);



        return NextResponse.json(

            {
                message:
                    "Failed to update settings.",
            },

            {
                status: 500,
            }

        );


    }

}