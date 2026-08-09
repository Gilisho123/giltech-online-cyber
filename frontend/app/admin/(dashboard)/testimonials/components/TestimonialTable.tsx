"use client";

interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    message: string;
    rating: number;
    image: string;
}

interface TestimonialTableProps {
    testimonials: Testimonial[];
    onEdit: (testimonial: Testimonial) => void;
    onDelete: (testimonial: Testimonial) => void;
}

export default function TestimonialTable({
    testimonials,
    onEdit,
    onDelete,
}: TestimonialTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow">

            <div className="border-b border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    Existing Testimonials
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {testimonials.length} testimonial
                    {testimonials.length === 1 ? "" : "s"} found.
                </p>
            </div>

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead className="bg-slate-100">

                        <tr>
                            <th className="p-4 text-left">Client</th>
                            <th className="p-4 text-left">Position</th>
                            <th className="p-4 text-left">Company</th>
                            <th className="p-4 text-left">Message</th>
                            <th className="p-4 text-center">Rating</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {testimonials.length === 0 ? (

                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-12 text-center text-slate-500"
                                >
                                    No testimonials found.
                                </td>
                            </tr>

                        ) : (

                            testimonials.map((testimonial) => (

                                <tr
                                    key={testimonial.id}
                                    className="border-t border-slate-200"
                                >

                                    <td className="p-4">

                                        <div className="flex items-center gap-3">

                                            <img
                                                src={
                                                    testimonial.image ||
                                                    "/avatar.png"
                                                }
                                                alt={testimonial.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />

                                            <span className="font-semibold text-slate-800">
                                                {testimonial.name}
                                            </span>

                                        </div>

                                    </td>

                                    <td className="p-4 text-slate-600">
                                        {testimonial.position}
                                    </td>

                                    <td className="p-4 text-cyan-600">
                                        {testimonial.company}
                                    </td>

                                    <td className="max-w-md p-4 text-slate-600">
                                        <p className="line-clamp-2">
                                            {testimonial.message}
                                        </p>
                                    </td>

                                    <td className="p-4 text-center">

                                        <span className="text-yellow-500">
                                            {"★".repeat(
                                                Math.max(
                                                    0,
                                                    Math.min(
                                                        5,
                                                        testimonial.rating
                                                    )
                                                )
                                            )}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onEdit(testimonial)
                                                }
                                                className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-200"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(testimonial)
                                                }
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