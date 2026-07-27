"use client";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({
    status,
}: StatusBadgeProps) {

    const normalized = status.toLowerCase();

    let classes =
        "bg-slate-100 text-slate-700";

    switch (normalized) {

        case "new":
            classes = "bg-cyan-100 text-cyan-700";
            break;

        case "read":
            classes = "bg-green-100 text-green-700";
            break;

        case "active":
            classes = "bg-green-100 text-green-700";
            break;

        case "inactive":
            classes = "bg-red-100 text-red-700";
            break;

        case "featured":
            classes = "bg-yellow-100 text-yellow-700";
            break;

        case "published":
            classes = "bg-emerald-100 text-emerald-700";
            break;

        case "draft":
            classes = "bg-orange-100 text-orange-700";
            break;

        case "pending":
            classes = "bg-yellow-100 text-yellow-700";
            break;

        case "approved":
            classes = "bg-green-100 text-green-700";
            break;

        case "rejected":
            classes = "bg-red-100 text-red-700";
            break;

    }

    return (

        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${classes}
            `}
        >
            {status}
        </span>

    );
}