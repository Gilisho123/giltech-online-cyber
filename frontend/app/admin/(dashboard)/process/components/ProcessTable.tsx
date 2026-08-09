"use client";

interface ProcessStep {
    id: number;
    stepNumber: number;
    title: string;
    description: string;
    icon: string;
    active: boolean;
}

interface ProcessTableProps {
    steps: ProcessStep[];
    onEdit: (step: ProcessStep) => void;
    onDelete: (id: number) => void;
}

export default function ProcessTable({
    steps,
    onEdit,
    onDelete,
}: ProcessTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-center">
                                Step
                            </th>

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
                                Status
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {steps.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="p-12 text-center text-slate-500"
                                >
                                    No process steps found.
                                </td>

                            </tr>

                        ) : (

                            steps.map((step) => (

                                <tr
                                    key={step.id}
                                    className="border-t border-slate-100 hover:bg-slate-50"
                                >

                                    <td className="p-4 text-center">

                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                                            {step.stepNumber}
                                        </span>

                                    </td>

                                    <td className="p-4 text-center text-2xl">
                                        {step.icon}
                                    </td>

                                    <td className="p-4 font-semibold text-slate-800">
                                        {step.title}
                                    </td>

                                    <td className="max-w-md p-4 text-slate-600">
                                        {step.description}
                                    </td>

                                    <td className="p-4 text-center">

                                        <span
                                            className={
                                                step.active
                                                    ? "font-semibold text-green-600"
                                                    : "font-semibold text-red-600"
                                            }
                                        >
                                            {step.active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-4">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onEdit(step)
                                                }
                                                className="font-semibold text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(step.id)
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