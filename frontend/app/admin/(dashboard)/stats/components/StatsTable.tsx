"use client";

interface Stat {

    id: number;

    value: string;

    label: string;

    order: number;

}



interface StatsTableProps {

    stats: Stat[];

    onEdit: (stat: Stat) => void;

    onDelete: (id: number) => void;

}




export default function StatsTable({

    stats,

    onEdit,

    onDelete,

}: StatsTableProps) {


    if (stats.length === 0) {

        return (

            <div className="rounded-3xl bg-white p-10 text-center shadow">

                <h3 className="text-xl font-bold text-slate-700">

                    No statistics found

                </h3>


                <p className="mt-2 text-slate-500">

                    Add your first homepage statistic.

                </p>


            </div>

        );

    }





    return (

        <div className="overflow-hidden rounded-3xl bg-white shadow">


            <div className="overflow-x-auto">


                <table className="w-full">


                    <thead className="bg-slate-100">


                        <tr>


                            <th className="p-4 text-left">

                                Value

                            </th>



                            <th className="p-4 text-left">

                                Label

                            </th>



                            <th className="p-4 text-left">

                                Order

                            </th>



                            <th className="p-4 text-center">

                                Actions

                            </th>


                        </tr>


                    </thead>





                    <tbody>


                        {stats.map((stat) => (


                            <tr

                                key={stat.id}

                                className="border-t hover:bg-slate-50"

                            >



                                <td className="p-4 font-bold text-cyan-600">

                                    {stat.value}

                                </td>




                                <td className="p-4">

                                    {stat.label}

                                </td>





                                <td className="p-4">

                                    {stat.order}

                                </td>





                                <td className="p-4">


                                    <div className="flex justify-center gap-3">



                                        <button

                                            onClick={() =>
                                                onEdit(stat)
                                            }

                                            className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-200"

                                        >

                                            Edit

                                        </button>






                                        <button

                                            onClick={() =>
                                                onDelete(stat.id)
                                            }

                                            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-200"

                                        >

                                            Delete

                                        </button>



                                    </div>


                                </td>



                            </tr>


                        ))}



                    </tbody>



                </table>


            </div>



        </div>

    );

}