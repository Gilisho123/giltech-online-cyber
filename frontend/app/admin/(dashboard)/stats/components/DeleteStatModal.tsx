"use client";


interface DeleteStatModalProps {

    open: boolean;

    onClose: () => void;

    onConfirm: () => void;

    loading?: boolean;

}



export default function DeleteStatModal({

    open,

    onClose,

    onConfirm,

    loading = false,

}: DeleteStatModalProps) {



    if (!open) return null;




    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">


            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">



                <h2 className="text-2xl font-black text-red-600">

                    Delete Statistic

                </h2>





                <p className="mt-4 text-slate-600">

                    Are you sure you want to delete this statistic?

                    This action cannot be undone.

                </p>







                <div className="mt-8 flex justify-end gap-4">



                    <button

                        onClick={onClose}

                        className="rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-700"

                    >

                        Cancel

                    </button>







                    <button

                        onClick={onConfirm}

                        disabled={loading}

                        className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white disabled:opacity-50"

                    >

                        {loading
                            ? "Deleting..."
                            : "Delete"}

                    </button>




                </div>




            </div>


        </div>

    );

}