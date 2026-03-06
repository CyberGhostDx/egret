"use client";

import React from "react";
import { Button, Card, Chip, Avatar } from "@heroui/react";
import { LuShieldAlert, LuShieldCheck, LuUserX, LuUserCheck } from "react-icons/lu";
import { AdminUser } from "@/hooks/useAdminUsers";

interface AdminUsersTableProps {
    users: AdminUser[];
    isLoading: boolean;
    onBan: (id: string) => void;
    onUnban: (id: string) => void;
}

export const AdminUsersTable: React.FC<AdminUsersTableProps> = ({
    users,
    isLoading,
    onBan,
    onUnban,
}) => {
    return (
        <Card className="overflow-hidden border-none bg-white/80 shadow-2xl backdrop-blur-md">
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-primary/5 border-b border-primary/10">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">User</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">Email</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">Role</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-b border-primary/5 animate-pulse">
                                    <td className="p-6"><div className="flex items-center gap-3"><div className="bg-primary/5 h-10 w-10 rounded-full" /><div className="bg-primary/5 h-4 w-32 rounded" /></div></td>
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-40 rounded" /></td>
                                    <td className="p-6"><div className="bg-primary/5 h-6 w-20 rounded-full" /></td>
                                    <td className="p-6"><div className="bg-primary/5 h-6 w-20 rounded-full" /></td>
                                    <td className="p-6 text-center"><div className="bg-primary/5 h-9 w-24 mx-auto rounded-xl" /></td>
                                </tr>
                            ))
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-primary/[0.02] border-b border-primary/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                className="h-10 w-10 text-primary bg-primary/10 font-black text-xs"
                                            >
                                                {(user.name || user.email)[0].toUpperCase()}
                                            </Avatar>
                                            <span className="text-sm font-black text-slate-800">
                                                {user.name || "N/A"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-slate-500">
                                            {user.email}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Chip
                                            variant="soft"
                                            className={`${user.role === "admin"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-blue-100 text-blue-700"
                                                } border-none font-bold text-[10px] uppercase h-6`}
                                        >
                                            <div className="flex items-center gap-1">
                                                {user.role === "admin" && <LuShieldCheck />}
                                                {user.role || "user"}
                                            </div>
                                        </Chip>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Chip
                                            variant="soft"
                                            className={`${user.banned
                                                ? "bg-red-100 text-red-600"
                                                : "bg-emerald-100 text-emerald-600"
                                                } border-none font-bold text-[10px] uppercase h-6`}
                                        >
                                            {user.banned ? "Banned" : "Active"}
                                        </Chip>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {user.role !== "admin" && (
                                            <Button
                                                onPress={() => user.banned ? onUnban(user.id) : onBan(user.id)}
                                                className={`${user.banned
                                                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600"
                                                    : "bg-red-50 text-red-600 hover:bg-red-600"
                                                    } hover:text-white h-9 px-4 rounded-xl transition-all font-bold active:scale-95 shadow-sm border-none flex items-center gap-2`}
                                            >
                                                {user.banned ? <LuUserCheck /> : <LuUserX />}
                                                {user.banned ? "Unban" : "Ban User"}
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                        {!isLoading && users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-20 text-center text-slate-400">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
