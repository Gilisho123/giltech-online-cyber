"use client";

import { ReactNode } from "react";

interface Column {
    key: string;
    label: string;
    className?: string;
}

interface Props<T> {
    columns: Column[];
    data: T[];
    renderRow: (item: T) => ReactNode;
}

export default function AdminTable<T>({
    columns,
    data,
    renderRow,
}: Props<T>) {

    return (

        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
        >

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead
                        className="
                            bg-slate-50
                            border-b
                            border-slate-200
                        "
                    >

                        <tr>

                            {columns.map((column) => (

                                <th
                                    key={column.key}
                                    className={`
                                        whitespace-nowrap
                                        px-6
                                        py-4
                                        text-left
                                        text-sm
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-slate-600
                                        ${column.className ?? ""}
                                    `}
                                >
                                    {column.label}
                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {data.map((item) => renderRow(item))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}