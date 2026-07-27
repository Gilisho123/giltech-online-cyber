"use client";

import { ReactNode } from "react";

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    badge?: string;
    actions?: ReactNode;
}

export default function AdminPageHeader({
    title,
    description,
    badge,
    actions,
}: AdminPageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div>

                {badge && (
                    <span
                        className="
                            inline-flex
                            rounded-full
                            bg-cyan-100
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-cyan-700
                        "
                    >
                        {badge}
                    </span>
                )}

                <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                    {title}
                </h1>

                {description && (
                    <p className="mt-3 max-w-2xl text-slate-500">
                        {description}
                    </p>
                )}

            </div>

            {actions && (
                <div className="flex flex-wrap gap-3">
                    {actions}
                </div>
            )}

        </div>
    );
}