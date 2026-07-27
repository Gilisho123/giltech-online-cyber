"use client";

import { ReactNode } from "react";

interface Props {
    title: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

export default function AdminEmptyState({
    title,
    description,
    icon,
    action,
}: Props) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-8
                py-16
                text-center
                shadow-sm
            "
        >
            {icon && (
                <div
                    className="
                        mx-auto
                        mb-6
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-cyan-100
                        text-cyan-600
                    "
                >
                    {icon}
                </div>
            )}

            <h2 className="text-2xl font-bold text-slate-800">
                {title}
            </h2>

            {description && (
                <p className="mx-auto mt-3 max-w-md text-slate-500">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-8 flex justify-center">
                    {action}
                </div>
            )}
        </div>
    );
}