"use client";

import React from "react";
import {
    Table,
    Button,
    Chip,
    Avatar,
    Skeleton,
    cn
} from "@heroui/react";
import { LuShieldCheck, LuUserX, LuUserCheck, LuCopy } from "react-icons/lu";
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
        <Table className="shadow-2xl rounded-3xl overflow-hidden border-none bg-white/80 backdrop-blur-md p-0">
            <Table.ScrollContainer>
                <Table.Content aria-label="Admin Users Table" className="min-w-[800px]">
                    <Table.Header>
                        <Table.Column isRowHeader className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">USER ID</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">MEMBER</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">ROLE</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">STATUS</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100 text-end">ACTIONS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <Table.Row key={`loading-${i}`} className="border-b border-slate-50">
                                    <Table.Cell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-16 rounded-lg" />
                                            <Skeleton className="h-8 w-8 rounded-xl" />
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="flex flex-col gap-2">
                                                <Skeleton className="h-4 w-40 rounded-lg" />
                                                <Skeleton className="h-3 w-24 rounded-lg" />
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4 text-end">
                                        <Skeleton className="h-9 w-10 ml-auto rounded-xl" />
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            users.length > 0 ? (
                                users.map((user) => (
                                    <Table.Row key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center gap-2 group">
                                                <span className="text-sm font-bold text-primary max-w-24 truncate">#{user.id.slice(0, 8)}</span>
                                                <Button isIconOnly size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity min-w-8 h-8 rounded-lg text-slate-400">
                                                    <LuCopy className="size-3.5" />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar size="sm" className="bg-primary/10 text-primary font-black text-xs">
                                                    <Avatar.Fallback>{user.name?.[0] || user.email?.[0]}</Avatar.Fallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-800">{user.name || "Unknown User"}</span>
                                                    <span className="text-xs text-slate-400 font-bold">{user.email}</span>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4 min-w-40">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-600 capitalize">{user.role || "User"}</span>
                                                {user.role === "admin" && <LuShieldCheck className="text-amber-500 size-3.5" />}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                className={cn(
                                                    "font-bold text-[10px] uppercase border-none",
                                                    user.banned ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                                                )}
                                            >
                                                {user.banned ? "Banned" : "Active"}
                                            </Chip>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                {user.role !== "admin" && (
                                                    <Button
                                                        isIconOnly
                                                        onPress={() => user.banned ? onUnban(user.id) : onBan(user.id)}
                                                        variant="ghost"
                                                        className={cn(
                                                            "h-9 w-9 min-w-9 rounded-xl transition-all shadow-sm border-none active:scale-95",
                                                            user.banned ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600" : "bg-red-50 text-red-500 hover:bg-red-600"
                                                        )}
                                                    >
                                                        {user.banned ? <LuUserCheck className="text-lg" /> : <LuUserX className="text-lg" />}
                                                    </Button>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell><span className="py-20 text-center text-slate-400 block w-full">No users found.</span></Table.Cell>
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                </Table.Row>
                            )
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};
