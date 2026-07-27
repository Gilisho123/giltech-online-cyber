"use client";

import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;

    variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "outline";
}

export default function AdminActionButton({
    children,
    icon,
    onClick,
    type = "button",
    disabled = false,
    className = "",
    variant = "primary",
}: Props) {

    let styles =
        "bg-cyan-600 text-white hover:bg-cyan-700";

    switch (variant) {

        case "secondary":
            styles =
                "bg-slate-600 text-white hover:bg-slate-700";
            break;

        case "success":
            styles =
                "bg-green-600 text-white hover:bg-green-700";
            break;

        case "danger":
            styles =
                "bg-red-600 text-white hover:bg-red-700";
            break;

        case "outline":
            styles =
                "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100";
            break;
    }

    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-5
                py-3
                font-semibold
                transition-all
                duration-200
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${styles}
                ${className}
            `}
        >

            {icon}

            {children}

        </button>

    );
}