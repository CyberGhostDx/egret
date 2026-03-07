"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlinePlusCircle,
  HiOutlineLogout,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import { Button, Tooltip } from "@heroui/react";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HiOutlineViewGrid,
  },
  {
    name: "Exams Management",
    href: "/admin/exams",
    icon: HiOutlineClipboardList,
  },
  {
    name: "Add Exams",
    href: "/admin/exams/add",
    icon: HiOutlinePlusCircle,
  },
  {
    name: "Users Management",
    href: "/admin/users",
    icon: HiOutlineUsers,
  },
  {
    name: "Reviews Management",
    href: "/admin/reviews",
    icon: HiOutlineChatBubbleLeftRight,
  },
];

export const AdminSidebar = (): React.ReactElement => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    await authClient.signOut();
  };

  return (
    <div
      style={{ width: isCollapsed ? 80 : 280 }}
      className="sticky top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl transition-[width] duration-200"
    >
      {/* Header / Logo */}
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex min-w-0 items-center overflow-hidden">
          <div className="from-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br to-[#3d91a7] text-white shadow-lg">
            <span className="text-xl font-black">E</span>
          </div>

          {!isCollapsed && (
            <div className="ml-2 flex flex-col overflow-hidden whitespace-nowrap transition-opacity duration-200">
              <span className="text-xl leading-none font-black tracking-tight text-slate-800">
                EGRET
              </span>
              <span className="text-primary text-[10px] font-bold tracking-widest uppercase opacity-50">
                Admin Panel
              </span>
            </div>
          )}
        </div>

        <Button
          isIconOnly
          variant="ghost"
          onPress={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-primary/10 shrink-0 border-none text-slate-400 transition-colors"
        >
          {isCollapsed ? (
            <HiOutlineChevronRight className="h-5 w-5" />
          ) : (
            <HiOutlineChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-2 overflow-x-hidden px-4 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Tooltip key={item.href} isDisabled={!isCollapsed} delay={0}>
              <Tooltip.Trigger>
                <Link
                  href={item.href}
                  className={`group relative flex items-center rounded-xl p-3.5 transition-all duration-200 ${
                    isActive
                      ? "bg-primary shadow-primary/20 text-white shadow-lg"
                      : "hover:bg-primary/5 hover:text-primary text-slate-500"
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 shrink-0 ${isActive ? "text-white" : "group-hover:text-primary transition-colors"}`}
                  />

                  {!isCollapsed && (
                    <span className="ml-4 overflow-hidden font-bold tracking-tight whitespace-nowrap transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}

                  {isActive && !isCollapsed && (
                    <div className="absolute right-3 h-2 w-2 rounded-full bg-white/50" />
                  )}
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Content
                placement="right"
                className="border-divider rounded-lg border bg-white px-3 py-2 text-black shadow-xl"
              >
                <span className="text-xs font-bold">{item.name}</span>
              </Tooltip.Content>
            </Tooltip>
          );
        })}
      </div>

      {/* Footer / Actions */}
      <div className="space-y-2 overflow-hidden border-t border-slate-100 p-4">
        <Link
          href="/"
          className="group flex items-center rounded-xl p-3.5 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-800"
        >
          <HiOutlineHome className="h-6 w-6 shrink-0" />
          {!isCollapsed && (
            <span className="ml-4 font-bold tracking-tight whitespace-nowrap">
              Main Website
            </span>
          )}
        </Link>
        <Button
          onPress={handleLogout}
          variant="ghost"
          className="group flex w-full items-center justify-start rounded-xl border-none p-3.5 text-red-500 transition-all hover:bg-red-50 hover:text-red-600"
        >
          <HiOutlineLogout className="h-6 w-6 shrink-0" />
          {!isCollapsed && (
            <span className="ml-4 font-bold tracking-tight whitespace-nowrap">
              Sign Out
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
