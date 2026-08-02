import { prisma } from "@/lib/prisma";

export async function getPortfolioProjects() {
    return await prisma.portfolio.findMany({
        where: {
            active: true,
        },
        orderBy: {
            featured: "desc",
        },
    });
}