"use client";

interface FAQ {
    id: number;
    question: string;
    answer: string;
    order: number;
    featured: boolean;
}

interface FAQTableProps {
    faqs: FAQ[];
    onEdit: (faq: FAQ) => void;
    onDelete: (faq: FAQ) => void;
}

export default function FAQTable({
    faqs,
    onEdit,
    onDelete,
}: FAQTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow">

            <div className="border-b border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    Frequently Asked Questions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {faqs.length} FAQ{faqs.length === 1 ? "" : "s"} found.
                </p>
            </div>

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead className="bg-slate-100">

                        <tr>
                            <th className="p-4 text-center">
                                Order
                            </th>

                            <th className="p-4 text-left">
                                Question
                            </th>

                            <th className="p-4 text-left">
                                Answer
                            </th>

                            <th className="p-4 text-center">
                                Featured
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {faqs.length === 0 ? (

                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-12 text-center text-slate-500"
                                >
                                    No FAQs found.
                                </td>
                            </tr>

                        ) : (

                            faqs.map((faq) => (

                                <tr
                                    key={faq.id}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >

                                    <td className="p-4 text-center">

                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                                            {faq.order}
                                        </span>

                                    </td>

                                    <td className="max-w-xs p-4 font-semibold text-slate-800">
                                        {faq.question}
                                    </td>

                                    <td className="max-w-lg p-4 text-slate-600">
                                        <p className="line-clamp-2">
                                            {faq.answer}
                                        </p>
                                    </td>

                                    <td className="p-4 text-center">

                                        <span
                                            className={
                                                faq.featured
                                                    ? "font-semibold text-green-600"
                                                    : "font-semibold text-slate-400"
                                            }
                                        >
                                            {faq.featured
                                                ? "Yes"
                                                : "No"}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                type="button"
                                                onClick={() => onEdit(faq)}
                                                className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-200"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onDelete(faq)}
                                                className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200"
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