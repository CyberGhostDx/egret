"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineViewGrid,
    HiOutlineClipboardList,
    HiOutlinePlusCircle,
    HiOutlineLogout,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineHome,
    HiOutlineUsers
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

export const AdminSidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async () => {
        await authClient.signOut();
    };

    return (
        <motion.div
            initial={false}
            animate={{
                width: isCollapsed ? 80 : 280,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1
            }}
            className="sticky top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl"
        >
            {/* Header / Logo */}
            <div className="flex h-20 items-center justify-between px-6">
                <div className="flex items-center min-w-0 overflow-hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-[#3d91a7] text-white shadow-lg">
                        <span className="text-xl font-black">E</span>
                    </div>

                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                                animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col whitespace-nowrap overflow-hidden"
                            >
                                <span className="text-xl font-black tracking-tight text-slate-800 leading-none">
                                    EGRET
                                </span>
                                <span className="text-primary text-[10px] font-bold uppercase tracking-widest opacity-50">
                                    Admin Panel
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Button
                    isIconOnly
                    variant="ghost"
                    onPress={() => setIsCollapsed(!isCollapsed)}
                    className="hover:bg-primary/10 text-slate-400 border-none transition-colors shrink-0"
                >
                    {isCollapsed ? <HiOutlineChevronRight className="h-5 w-5" /> : <HiOutlineChevronLeft className="h-5 w-5" />}
                </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-2 px-4 py-6 overflow-x-hidden">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Tooltip
                            key={item.href}
                            isDisabled={!isCollapsed}
                            delay={0}
                        >
                            <Tooltip.Trigger>
                                <Link
                                    href={item.href}
                                    className={`relative flex items-center rounded-xl p-3.5 transition-all duration-200 group ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-slate-500 hover:bg-primary/5 hover:text-primary"
                                        }`}
                                >
                                    <item.icon className={`h-6 w-6 shrink-0 ${isActive ? "text-white" : "group-hover:text-primary transition-colors"}`} />

                                    <AnimatePresence mode="wait">
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-4 font-bold tracking-tight whitespace-nowrap overflow-hidden"
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {isActive && !isCollapsed && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute right-3 h-2 w-2 rounded-full bg-white/50"
                                        />
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
            <div className="border-t border-slate-100 p-4 space-y-2 overflow-hidden">
                <Link
                    href="/"
                    className="flex items-center rounded-xl p-3.5 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-800 group"
                >
                    <HiOutlineHome className="h-6 w-6 shrink-0" />
                    {!isCollapsed && (
                        <span className="ml-4 font-bold tracking-tight whitespace-nowrap">Main Website</span>
                    )}
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-xl p-3.5 text-red-500 transition-all hover:bg-red-50 group"
                >
                    <HiOutlineLogout className="h-6 w-6 shrink-0" />
                    {!isCollapsed && (
                        <span className="ml-4 font-bold tracking-tight whitespace-nowrap">Sign Out</span>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
