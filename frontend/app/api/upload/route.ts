import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { message: "No file uploaded." },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const extension = file.name.split(".").pop();

        const filename =
            `${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 10)}.${extension}`;

        const uploadDir = path.join(
            process.cwd(),
            "public",
            "uploads",
            "portfolio"
        );

        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/uploads/portfolio/${filename}`,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Image upload failed." },
            { status: 500 }
        );
    }
}