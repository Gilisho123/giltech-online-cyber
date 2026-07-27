"use client";

import { ReactNode } from "react";

interface AdminStatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    color?: string;
    subtitle?: string;
}

export default function AdminStatCard({
    title,
    value,
    icon,
    color = "bg-cyan-100 text-cyan-600",
    subtitle,
}: AdminStatCardProps) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
            "
        >
            <div className="flex items-center justify-between">

                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        ${color}
                    `}
                >
                    {icon}
                </div>

                <div className="text-right">

                    <h2 className="text-4xl font-black text-slate-800">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-400">
                            {subtitle}
                        </p>
                    )}

                </div>

            </div>

            <p className="mt-6 font-semibold text-slate-600">
                {title}
            </p>

        </div>
    );
}