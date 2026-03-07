"use client";

import React from "react";
import { Table, Button, Chip, Avatar, Skeleton, cn } from "@heroui/react";
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
}): React.ReactElement => {
  return (
    <Table className="overflow-hidden rounded-3xl border-none bg-white/80 p-0 shadow-2xl backdrop-blur-md">
      <Table.ScrollContainer>
        <Table.Content aria-label="Admin Users Table" className="min-w-[800px]">
          <Table.Header>
            <Table.Column
              isRowHeader
              className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase"
            >
              USER ID
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              MEMBER
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ROLE
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              STATUS
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-end text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ACTIONS
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <Table.Row
                  key={`loading-${i}`}
                  className="border-b border-slate-50"
                >
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
                    <Skeleton className="ml-auto h-9 w-10 rounded-xl" />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : users.length > 0 ? (
              users.map((user) => (
                <Table.Row
                  key={user.id}
                  className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                >
                  <Table.Cell className="px-6 py-4">
                    <div className="group flex items-center gap-2">
                      <span className="text-primary max-w-24 truncate text-sm font-bold">
                        #{user.id.slice(0, 8)}
                      </span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="h-8 min-w-8 rounded-lg text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <LuCopy className="size-3.5" />
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="sm"
                        className="bg-primary/10 text-primary text-xs font-black"
                      >
                        <Avatar.Fallback>
                          {user.name?.[0] || user.email?.[0]}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">
                          {user.name || "Unknown User"}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="min-w-40 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600 capitalize">
                        {user.role || "User"}
                      </span>
                      {user.role === "admin" && (
                        <LuShieldCheck className="size-3.5 text-amber-500" />
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <Chip
                      size="sm"
                      variant="soft"
                      className={cn(
                        "border-none text-[10px] font-bold uppercase",
                        user.banned
                          ? "bg-red-100 text-red-600"
                          : "bg-emerald-100 text-emerald-600",
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
                          onPress={() =>
                            user.banned ? onUnban(user.id) : onBan(user.id)
                          }
                          variant="ghost"
                          className={cn(
                            "h-9 w-9 min-w-9 rounded-xl border-none shadow-sm transition-all active:scale-95",
                            user.banned
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600"
                              : "bg-red-50 text-red-500 hover:bg-red-600",
                          )}
                        >
                          {user.banned ? (
                            <LuUserCheck className="text-lg" />
                          ) : (
                            <LuUserX className="text-lg" />
                          )}
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell>
                  <span className="block w-full py-20 text-center text-slate-400">
                    No users found.
                  </span>
                </Table.Cell>
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
