"use client";

import { useEffect, useState } from "react";

interface AdminUser {
    id: number;
    name: string;
}

interface Props {
    open: boolean;
    user: AdminUser | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PasswordModal({
    open,
    user,
    onClose,
    onSuccess,
}: Props) {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (open) {

            setPassword("");
            setConfirmPassword("");

        }

    }, [open]);

    if (!open || !user) return null;

    const userId = user.id;

    const changePassword = async () => {

        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        setSaving(true);

        try {


            const res = await fetch(`/api/admin/users/${userId}`,

                {

                    method: "PATCH",

                    headers: {

                        "Content-Type": "application/json",

                    },

                    body: JSON.stringify({

                        password,

                    }),

                }

            );

            if (!res.ok) {

                throw new Error();

            }

            alert("Password updated successfully.");

            onSuccess();

        }

        catch (error) {

            console.error(error);

            alert("Failed to update password.");

        }

        finally {

            setSaving(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

                <div className="border-b border-slate-200 px-8 py-6">

                    <h2 className="text-3xl font-black text-slate-800">

                        Change Password

                    </h2>

                    <p className="mt-2 text-slate-500">

                        {user.name}

                    </p>

                </div>

                <div className="space-y-6 p-8">

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">

                            New Password

                        </label>

                        <input

                            type="password"

                            value={password}

                            onChange={(e) =>
                                setPassword(e.target.value)
                            }

                            className="w-full rounded-xl border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"

                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">

                            Confirm Password

                        </label>

                        <input

                            type="password"

                            value={confirmPassword}

                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }

                            className="w-full rounded-xl border border-slate-300 p-3 focus:border-cyan-500 focus:outline-none"

                        />

                    </div>

                </div>

                <div className="flex justify-end gap-4 border-t border-slate-200 px-8 py-6">

                    <button

                        onClick={onClose}

                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"

                    >

                        Cancel

                    </button>

                    <button

                        disabled={saving}

                        onClick={changePassword}

                        className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"

                    >

                        {saving ? "Saving..." : "Update Password"}

                    </button>

                </div>

            </div>

        </div>

    );

}