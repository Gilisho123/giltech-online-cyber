"use client";

import { useEffect, useState } from "react";

import StatsTable from "./components/StatsTable";
import StatModal from "./components/StatModal";
import DeleteStatModal from "./components/DeleteStatModal";


interface Stat {

    id: number;

    value: string;

    label: string;

    order: number;

}



const emptyStat = {

    value: "",

    label: "",

    order: 0,

};





export default function StatsPage() {



    const [stats, setStats] = useState<Stat[]>([]);


    const [loading, setLoading] = useState(true);


    const [modalOpen, setModalOpen] = useState(false);


    const [deleteOpen, setDeleteOpen] = useState(false);



    const [editingStat, setEditingStat] = useState<Stat | null>(null);



    const [deleteId, setDeleteId] = useState<number | null>(null);



    const [saving, setSaving] = useState(false);



    const [form, setForm] = useState(emptyStat);






    useEffect(() => {

        loadStats();

    }, []);







    async function loadStats() {


        try {


            const res = await fetch("/api/stats");


            const data = await res.json();


            setStats(data);



        } catch (error) {


            console.error(error);



        } finally {


            setLoading(false);


        }


    }







    function openAdd() {


        setEditingStat(null);


        setForm(emptyStat);


        setModalOpen(true);


    }







    function openEdit(stat: Stat) {


        setEditingStat(stat);



        setForm({

            value: stat.value,

            label: stat.label,

            order: stat.order,

        });



        setModalOpen(true);


    }








    async function saveStat() {



        setSaving(true);



        try {



            if (editingStat) {



                await fetch(
                    `/api/stats/${editingStat.id}`,
                    {

                        method: "PATCH",

                        headers: {

                            "Content-Type":
                                "application/json",

                        },


                        body:
                            JSON.stringify(form),

                    }
                );



            } else {



                await fetch(
                    "/api/stats",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                        },


                        body:
                            JSON.stringify(form),

                    }
                );


            }






            setModalOpen(false);


            loadStats();



        } catch (error) {


            console.error(error);



        } finally {


            setSaving(false);


        }


    }








    function openDelete(id: number) {


        setDeleteId(id);


        setDeleteOpen(true);


    }







    async function deleteStat() {


        if (!deleteId) return;



        await fetch(
            `/api/stats/${deleteId}`,
            {

                method: "DELETE",

            }
        );



        setDeleteOpen(false);


        setDeleteId(null);



        loadStats();


    }







    if (loading) {


        return (

            <div className="p-20 text-center">

                Loading statistics...

            </div>

        );


    }








    return (


        <main className="space-y-8">



            <div className="flex items-center justify-between">


                <div>


                    <h1 className="text-4xl font-black">

                        Website Statistics

                    </h1>



                    <p className="mt-2 text-slate-500">

                        Manage homepage statistics.

                    </p>


                </div>






                <button

                    onClick={openAdd}

                    className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700"

                >

                    + Add Statistic

                </button>



            </div>







            <StatsTable

                stats={stats}

                onEdit={openEdit}

                onDelete={openDelete}

            />








            <StatModal

                open={modalOpen}

                onClose={() => setModalOpen(false)}

                form={form}

                setForm={setForm}

                onSave={saveStat}

                loading={saving}

                editing={!!editingStat}

            />







            <DeleteStatModal

                open={deleteOpen}

                onClose={() => setDeleteOpen(false)}

                onConfirm={deleteStat}

            />





        </main>


    );


}