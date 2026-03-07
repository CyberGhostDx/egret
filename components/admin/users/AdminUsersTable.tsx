"use client";

import React from "react";
import {
  Table,
  Button,
  Chip,
  Avatar,
  Skeleton,
  cn,
  toast,
} from "@heroui/react";
import {
  LuShieldCheck,
  LuUserX,
  LuUserCheck,
  LuCopy,
  LuCheck,
} from "react-icons/lu";
import { AdminUser } from "@/hooks/useAdminUsers";
import { useState, useMemo } from "react";
import { BanUserModal } from "./BanUserModal";
import { Pagination } from "@heroui/react";

interface AdminUsersTableProps {
  users: AdminUser[];
  isLoading: boolean;
  onBan: (id: string, reason?: string, expires?: number) => Promise<boolean>;
  onUnban: (id: string) => void;
  showNames?: boolean;
}

const ROWS_PER_PAGE = 5;

export const AdminUsersTable: React.FC<AdminUsersTableProps> = ({
  users,
  isLoading,
  onBan,
  onUnban,
  showNames = false,
}): React.ReactElement => {
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState<AdminUser | null>(null);

  const totalPages = Math.ceil((users?.length || 0) / ROWS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return users.slice(start, start + ROWS_PER_PAGE);
  }, [users, page]);

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, totalPages]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, users?.length || 0);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("User ID copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenBanModal = (user: AdminUser) => {
    setTargetUser(user);
    setBanModalOpen(true);
  };

  return (
    <>
      <Table className="overflow-hidden rounded-3xl border-none bg-white/80 p-0 shadow-2xl backdrop-blur-md">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Admin Users Table"
            className="min-w-[800px]"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase"
              >
                USER ID
              </Table.Column>
              <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase">
                MEMBER
              </Table.Column>
              <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase">
                ROLE
              </Table.Column>
              <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase">
                STATUS
              </Table.Column>
              <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-end text-xs font-bold tracking-wider text-slate-400 uppercase">
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
              ) : paginatedItems.length > 0 ? (
                paginatedItems.map((user) => (
                  <Table.Row
                    key={user.id}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                  >
                    <Table.Cell className="px-6 py-4">
                      <div className="group flex items-center gap-2">
                        <span className="text-primary max-w-24 truncate text-sm font-bold">
                          {user.id}
                        </span>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          onPress={() => handleCopy(user.id)}
                          className={`h-8 min-w-8 rounded-lg text-slate-400 ${copiedId == user.id ? "opacity-100" : "opacity-0"} transition-opacity group-hover:opacity-100`}
                        >
                          {copiedId === user.id ? (
                            <LuCheck className="size-3.5 text-emerald-500" />
                          ) : (
                            <LuCopy className="size-3.5" />
                          )}
                        </Button>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          size="sm"
                          className="bg-primary/10 text-primary text-xs font-black"
                        >
                          <Avatar.Image
                            src={
                              showNames || user.role === "admin"
                                ? (user.image ?? undefined)
                                : undefined
                            }
                          />
                          <Avatar.Fallback>
                            {showNames || user.role === "admin"
                              ? user.name?.[0] || user.email?.[0]
                              : "?"}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800">
                            {showNames || user.role === "admin"
                              ? user.name || "Unknown User"
                              : "••••••••"}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {showNames || user.role === "admin"
                              ? user.email
                              : "••••••••@••••.•••"}
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
                              user.banned
                                ? onUnban(user.id)
                                : handleOpenBanModal(user)
                            }
                            variant="ghost"
                            className={cn(
                              "h-9 w-9 min-w-9 rounded-xl border-none shadow-sm transition-all active:scale-95",
                              user.banned
                                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                                : "bg-red-50 text-red-500 hover:bg-red-600 hover:text-white",
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
        {totalPages > 1 && (
          <Table.Footer>
            <Pagination size="sm">
              <Pagination.Summary>
                {start} to {end} of {users?.length || 0} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <Pagination.PreviousIcon />
                    Prev
                  </Pagination.Previous>
                </Pagination.Item>
                {visiblePages.map((p) => (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </Table.Footer>
        )}
      </Table>

      <BanUserModal
        isOpen={banModalOpen}
        user={targetUser}
        onClose={() => setBanModalOpen(false)}
        onConfirm={onBan}
        showNames={showNames}
      />
    </>
  );
};
