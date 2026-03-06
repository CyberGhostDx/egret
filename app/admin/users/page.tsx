"use client";

import React, { useMemo, useState } from "react";
import { AdminUsersTable } from "@/components/admin/users/AdminUsersTable";
import { Input } from "@heroui/react";
import { LuSearch, LuUsers } from "react-icons/lu";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { motion } from "framer-motion";

const AdminUsersPage = () => {
  const { users, isLoading, banUser, unbanUser } = useAdminUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;

    return users.filter(user =>
      (user.name?.toLowerCase().includes(query)) ||
      (user.email.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 px-6 py-10 md:px-12">
      {/* Background elements for premium feel */}
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-teal-50/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <LuUsers className="text-primary text-3xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Users Management
              </h1>
            </div>
            <p className="text-slate-400 text-lg font-medium ml-1">
              Manage system users and accessibility status
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex w-full flex-col gap-4 sm:flex-row md:w-auto"
          >
            <div className="relative w-full sm:w-80">
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/80 border-slate-200 h-12 w-full rounded-2xl border px-10 text-sm font-bold shadow-sm transition-all focus:border-primary/30"
              />
              <LuSearch className="text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
            </div>
          </motion.div>
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AdminUsersTable
            users={filteredUsers}
            isLoading={isLoading}
            onBan={banUser}
            onUnban={unbanUser}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
