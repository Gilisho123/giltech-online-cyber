"use client";

import { useEffect, useState } from "react";

interface AdminUser {

    id: number;

    username: string;

    name: string;

    email: string;

    role: string;

    active: boolean;

}

interface Props {

    open: boolean;

    user: AdminUser | null;

    onClose: () => void;

    onSuccess: () => void;

}

export default function UserModal({

    open,

    user,

    onClose,

    onSuccess,

}: Props) {

    const [username, setUsername] =
        useState("");

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [role, setRole] =
        useState("Administrator");

    const [active, setActive] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {

        if (user) {

            setUsername(user.username);

            setName(user.name);

            setEmail(user.email);

            setRole(user.role);

            setActive(user.active);

            setPassword("");

        }

        else {

            setUsername("");

            setName("");

            setEmail("");

            setPassword("");

            setRole("Administrator");

            setActive(true);

        }

    }, [user]);

    if (!open) return null;

    async function saveUser() {

        setSaving(true);

        try {

            const method =
                user ? "PUT" : "POST";

            const body = {

                id: user?.id,

                username,

                name,

                email,

                password,

                role,

                active,

            };

            const res = await fetch(

                "/api/admin/users",

                {

                    method,

                    headers: {

                        "Content-Type":
                            "application/json",

                    },

                    body: JSON.stringify(body),

                }

            );

            if (!res.ok) {

                throw new Error();

            }

            onSuccess();

        }

        catch (error) {

            console.error(error);

            alert("Failed to save administrator.");

        }

        finally {

            setSaving(false);

        }

    }
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="border-b border-slate-200 px-8 py-6">

                    <h2 className="text-3xl font-black text-slate-800">

                        {user

                            ? "Edit Administrator"

                            : "Add Administrator"}

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Fill in the administrator details below.

                    </p>

                </div>

                {/* Form */}

                <div className="space-y-6 p-8">

                    {/* Username */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">

                            Username

                        </label>

                        <input

                            value={username}

                            onChange={(e) =>

                                setUsername(e.target.value)

                            }

                            placeholder="Enter username"

                            className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-cyan-500 focus:outline-none"

                        />

                    </div>

                    {/* Full Name */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">

                            Full Name

                        </label>

                        <input

                            value={name}

                            onChange={(e) =>

                                setName(e.target.value)

                            }

                            placeholder="Enter full name"

                            className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-cyan-500 focus:outline-none"

                        />

                    </div>

                    {/* Email */}

                    <div>

                        <label className="mb-2 block font-semibold text-slate-700">

                            Email Address

                        </label>

                        <input

                            type="email"

                            value={email}

                            onChange={(e) =>

                                setEmail(e.target.value)

                            }

                            placeholder="Enter email"

                            className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-cyan-500 focus:outline-none"

                        />

                    </div>

                    {/* Password */}

                    {!user && (

                        <div>

                            <label className="mb-2 block font-semibold text-slate-700">

                                Password

                            </label>

                            <input

                                type="password"

                                value={password}

                                onChange={(e) =>

                                    setPassword(e.target.value)

                                }

                                placeholder="Minimum 6 characters"

                                className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-cyan-500 focus:outline-none"

                            />

                        </div>

                    )}

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Role */}

                        <div>

                            <label className="mb-2 block font-semibold text-slate-700">

                                Role

                            </label>

                            <select

                                value={role}

                                onChange={(e) =>

                                    setRole(e.target.value)

                                }

                                className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-cyan-500 focus:outline-none"

                            >

                                <option value="Super Admin">

                                    Super Admin

                                </option>

                                <option value="Administrator">

                                    Administrator

                                </option>

                                <option value="Editor">

                                    Editor

                                </option>

                                <option value="Manager">

                                    Manager

                                </option>

                            </select>

                        </div>

                        {/* Status */}

                        <div>

                            <label className="mb-2 block font-semibold text-slate-700">

                                Status

                            </label>

                            <select

                                value={

                                    active

                                        ? "Active"

                                        : "Inactive"

                                }

                                onChange={(e) =>

                                    setActive(

                                        e.target.value === "Active"

                                    )

                                }

                                className="w-full rounded-xl border border-slate-300 p-3 transition focus:border-cyan-500 focus:outline-none"

                            >

                                <option value="Active">

                                    Active

                                </option>

                                <option value="Inactive">

                                    Inactive

                                </option>

                            </select>

                        </div>

                    </div>
                </div>

                {/* Footer */}

                <div className="flex items-center justify-end gap-4 border-t border-slate-200 px-8 py-6">

                    <button

                        type="button"

                        onClick={onClose}

                        disabled={saving}

                        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"

                    >

                        Cancel

                    </button>

                    <button

                        type="button"

                        onClick={saveUser}

                        disabled={saving}

                        className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"

                    >

                        {saving ? "Saving..." : user ? "Update Administrator" : "Create Administrator"}

                    </button>

                </div>

            </div>

        </div>

    );

}