"use client";


interface StatForm {

    value: string;

    label: string;

    order: number;

}



interface StatModalProps {

    open: boolean;

    onClose: () => void;

    form: StatForm;

    setForm: React.Dispatch<
        React.SetStateAction<StatForm>
    >;

    onSave: () => void;

    loading: boolean;

    editing: boolean;

}





export default function StatModal({

    open,

    onClose,

    form,

    setForm,

    onSave,

    loading,

    editing,

}: StatModalProps) {



    if (!open) return null;




    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">


            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">



                <h2 className="text-2xl font-black">

                    {editing
                        ? "Edit Statistic"
                        : "Add Statistic"}

                </h2>





                <div className="mt-6 space-y-4">



                    <input

                        className="w-full rounded-xl border p-3"

                        placeholder="Value e.g. 170+"

                        value={form.value}

                        onChange={(e) =>
                            setForm({

                                ...form,

                                value: e.target.value,

                            })
                        }

                    />





                    <input

                        className="w-full rounded-xl border p-3"

                        placeholder="Label e.g Services"

                        value={form.label}

                        onChange={(e) =>
                            setForm({

                                ...form,

                                label: e.target.value,

                            })
                        }

                    />







                    <input

                        type="number"

                        className="w-full rounded-xl border p-3"

                        placeholder="Order"

                        value={form.order}

                        onChange={(e) =>
                            setForm({

                                ...form,

                                order:
                                    Number(e.target.value),

                            })
                        }

                    />



                </div>








                <div className="mt-8 flex justify-end gap-4">



                    <button

                        onClick={onClose}

                        className="rounded-xl bg-slate-200 px-5 py-3 font-bold"

                    >

                        Cancel

                    </button>







                    <button

                        onClick={onSave}

                        disabled={loading}

                        className="rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white disabled:opacity-50"

                    >

                        {loading

                            ? "Saving..."

                            : editing

                                ? "Update"

                                : "Save"}

                    </button>



                </div>




            </div>


        </div>

    );

}