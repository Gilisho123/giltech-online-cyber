"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Shield,
    User,
    UserPlus,
    Search,
} from "lucide-react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminActionButton from "@/components/admin/AdminActionButton";
import AdminTable from "@/components/admin/AdminTable";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface AdminUser {

    id: number;

    name: string;

    email: string;

    role: string;

    active: boolean;

    lastLogin: string | null;

    createdAt: string;

}

export default function UsersPage() {

    const [users, setUsers] = useState<AdminUser[]>([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] =
        useState("All");

    const [selectedUser, setSelectedUser] =
        useState<AdminUser | null>(null);

    const [showUserModal, setShowUserModal] =
        useState(false);

    const [showPasswordModal, setShowPasswordModal] =
        useState(false);

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        try {

            const res = await fetch("/api/admin/users");

            const data = await res.json();

            setUsers(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                user.name.toLowerCase().includes(keyword)

                ||

                user.email.toLowerCase().includes(keyword);

            const matchesRole =

                roleFilter === "All"

                ||

                user.role === roleFilter;

            return matchesSearch && matchesRole;

        });

    }, [

        users,

        search,

        roleFilter,

    ]);

    const totalUsers = users.length;

    const activeUsers =
        users.filter(user => user.active).length;

    const inactiveUsers =
        users.filter(user => !user.active).length;

    const superAdmins =
        users.filter(
            user => user.role === "Super Admin"
        ).length;

    if (loading) {

        return (

            <AdminLoading

                cards={4}

                rows={6}

            />

        );

    }

    const columns = [

        {

            key: "name",

            label: "Administrator",

        },

        {

            key: "role",

            label: "Role",

        },

        {

            key: "status",

            label: "Status",

        },

        {

            key: "lastLogin",

            label: "Last Login",

        },

        {

            key: "actions",

            label: "Actions",

        },

    ];

    return (

        <div className="space-y-8">

            <AdminPageHeader

                badge="USER MANAGEMENT"

                title="Administrators"

                description="Manage administrators that can access the Giltech Admin Panel."

            />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <AdminStatCard

                    title="Total Users"

                    value={totalUsers}

                    icon={<User size={28} />}

                />

                <AdminStatCard

                    title="Super Admins"

                    value={superAdmins}

                    icon={<Shield size={28} />}

                    color="bg-purple-100 text-purple-600"

                />

                <AdminStatCard

                    title="Active"

                    value={activeUsers}

                    icon={<UserPlus size={28} />}

                    color="bg-green-100 text-green-600"

                />

                <AdminStatCard

                    title="Inactive"

                    value={inactiveUsers}

                    icon={<User size={28} />}

                    color="bg-red-100 text-red-600"

                />

            </div>

            <AdminSearch

                search={search}

                onSearch={setSearch}

                placeholder="Search administrators..."

                filterValue={roleFilter}

                onFilterChange={setRoleFilter}

                filterOptions={[

                    "All",

                    "Super Admin",

                    "Administrator",

                    "Editor",

                    "Manager",

                ]}

                actions={

                    <AdminActionButton

                        icon={<UserPlus size={18} />}

                        onClick={() => {

                            setSelectedUser(null);

                            setShowUserModal(true);

                        }}

                    >

                        Add Administrator

                    </AdminActionButton>

                }

            />
            {filteredUsers.length === 0 ? (

                <AdminEmptyState
                    icon={<User size={42} />}
                    title="No Administrators Found"
                    description="Create your first administrator to manage the system."
                    action={

                        <AdminActionButton
                            icon={<UserPlus size={18} />}
                            onClick={() => {

                                setSelectedUser(null);

                                setShowUserModal(true);

                            }}
                        >

                            Add Administrator

                        </AdminActionButton>

                    }
                />

            ) : (

                <AdminTable

                    columns={columns}

                    data={filteredUsers}

                    renderRow={(user) => (

                        <tr
                            key={user.id}
                            className="border-b border-slate-100 hover:bg-slate-50 transition"
                        >

                            {/* Administrator */}

                            <td className="px-6 py-5">

                                <div>

                                    <h3 className="font-bold text-slate-800">

                                        {user.name}

                                    </h3>

                                    <p className="text-sm text-slate-500">

                                        {user.email}

                                    </p>

                                </div>

                            </td>

                            {/* Role */}

                            <td className="px-6 py-5">

                                <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">

                                    {user.role}

                                </span>

                            </td>

                            {/* Status */}

                            <td className="px-6 py-5">

                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${user.active
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >

                                    {user.active ? "Active" : "Inactive"}

                                </span>

                            </td>

                            {/* Last Login */}

                            <td className="px-6 py-5 text-slate-500">

                                {user.lastLogin
                                    ? new Date(user.lastLogin).toLocaleString()
                                    : "Never"}

                            </td>

                            {/* Actions */}

                            <td className="px-6 py-5">

                                <div className="flex flex-wrap gap-2">

                                    <AdminActionButton

                                        variant="outline"

                                        onClick={() => {

                                            setSelectedUser(user);

                                            setShowUserModal(true);

                                        }}

                                    >

                                        Edit

                                    </AdminActionButton>

                                    <AdminActionButton

                                        variant="outline"

                                        onClick={() => {

                                            setSelectedUser(user);

                                            setShowPasswordModal(true);

                                        }}

                                    >

                                        Password

                                    </AdminActionButton>

                                </div>

                            </td>

                        </tr>

                    )}

                />

            )}

            <UserModal

                open={showUserModal}

                user={selectedUser}

                onClose={() => {

                    setShowUserModal(false);

                    setSelectedUser(null);

                }}

                onSuccess={() => {

                    loadUsers();

                    setShowUserModal(false);

                    setSelectedUser(null);

                }}

            />

            <PasswordModal

                open={showPasswordModal}

                user={selectedUser}

                onClose={() => {

                    setShowPasswordModal(false);

                    setSelectedUser(null);

                }}

                onSuccess={() => {

                    setShowPasswordModal(false);

                    setSelectedUser(null);

                }}

            />

        </div>

    );

}