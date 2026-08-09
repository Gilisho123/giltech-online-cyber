"use client";

interface WhyChoose {
    id: number;
    title: string;
    description: string;
    icon: string;
    order: number;
    active: boolean;
}

interface WhyChooseTableProps {
    items: WhyChoose[];
    onEdit: (item: WhyChoose) => void;
    onDelete: (id: number) => void;
}

export default function WhyChooseTable({
    items,
    onEdit,
    onDelete,
}: WhyChooseTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[800px]">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-center">
                                Icon
                            </th>

                            <th className="p-4 text-left">
                                Title
                            </th>

                            <th className="p-4 text-left">
                                Description
                            </th>

                            <th className="p-4 text-center">
                                Order
                            </th>

                            <th className="p-4 text-center">
                                Status
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="p-12 text-center text-slate-500"
                                >
                                    No Why Choose items found.
                                </td>

                            </tr>

                        ) : (

                            items.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-t border-slate-100 hover:bg-slate-50"
                                >

                                    <td className="p-4 text-center text-3xl">
                                        {item.icon}
                                    </td>

                                    <td className="p-4 font-semibold text-slate-800">
                                        {item.title}
                                    </td>

                                    <td className="max-w-md p-4 text-slate-600">
                                        {item.description}
                                    </td>

                                    <td className="p-4 text-center text-slate-600">
                                        {item.order}
                                    </td>

                                    <td className="p-4 text-center">

                                        <span
                                            className={
                                                item.active
                                                    ? "font-semibold text-green-600"
                                                    : "font-semibold text-red-600"
                                            }
                                        >
                                            {item.active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-4">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onEdit(item)
                                                }
                                                className="font-semibold text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(item.id)
                                                }
                                                className="font-semibold text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}