"use client";

import React, { useMemo, useState } from "react";
import { AdminUsersTable } from "@/components/admin/users/AdminUsersTable";
import { Button, Input } from "@heroui/react";
import { LuSearch, LuUsers, LuEye, LuEyeOff } from "react-icons/lu";
import { useAdminUsers, AdminUser } from "@/hooks/useAdminUsers";

const AdminUsersPage = (): React.ReactElement => {
  const { users, isLoading, banUser, unbanUser } = useAdminUsers();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNames, setShowNames] = useState<boolean>(false);

  const filteredUsers = useMemo((): AdminUser[] => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;

    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [users, searchQuery]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 px-6 py-10 md:px-12">
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-teal-50/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <LuUsers className="text-primary text-3xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Users Management
              </h1>
            </div>
            <p className="ml-1 text-lg font-medium text-slate-400">
              Manage system users and accessibility status
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
            <div className="relative w-full sm:w-80">
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-primary/30 h-12 w-full rounded-2xl border border-slate-200 bg-white/80 px-10 text-sm font-bold shadow-sm transition-all"
              />
              <LuSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            </div>

            <Button
              variant="ghost"
              onPress={() => setShowNames(!showNames)}
              className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-5 font-bold text-slate-600"
            >
              <div className="flex items-center gap-2">
                {showNames ? (
                  <LuEyeOff className="text-lg" />
                ) : (
                  <LuEye className="text-lg" />
                )}
                <span>{showNames ? "Hide Names" : "Show Names"}</span>
              </div>
            </Button>
          </div>
        </div>

        <div>
          <AdminUsersTable
            users={filteredUsers}
            isLoading={isLoading}
            onBan={banUser}
            onUnban={unbanUser}
            showNames={showNames}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
