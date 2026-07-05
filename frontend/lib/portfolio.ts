export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    technologies: string[];
    image: string;
    website?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Giltech Online Cyber",
        category: "Business Website",
        description:
            "A modern digital business platform offering government services, tax consultancy, software development, AI solutions and business consultancy.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        image: "/images/projects/giltech.jpg",
    },
    {
        id: 2,
        title: "Data Folks Research & Advisory",
        category: "Corporate Website",
        description:
            "Professional research, consultancy and data analytics platform serving businesses, students and organizations.",
        technologies: ["WordPress", "SEO", "Analytics"],
        image: "/images/projects/datafolks.jpg",
        website: "https://datafolksconsultancy.com",
    },
    {
        id: 3,
        title: "KRA Data Analytics",
        category: "Data Analytics",
        description:
            "Interactive dashboards and analytical reports for tax compliance and decision making.",
        technologies: ["Power BI", "Excel", "Python"],
        image: "/images/projects/dashboard.jpg",
    },
];