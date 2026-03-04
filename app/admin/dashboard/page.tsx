"use client";

import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { Card, Skeleton } from "@heroui/react";
import {
    HiOutlineBookOpen,
    HiOutlineClipboardDocumentList,
    HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

interface StatCardProps {
    title: string;
    value: number | undefined;
    icon: React.ReactNode;
    iconBg: string;
    isLoading: boolean;
}

function StatCard({
    title,
    value,
    icon,
    iconBg,
    isLoading,
}: StatCardProps): React.ReactElement {
    return (
        <Card className="border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <Card.Content className="flex flex-col gap-4 p-6">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
                >
                    {icon}
                </div>
                <div className="flex flex-col gap-1">
                    {isLoading ? (
                        <Skeleton className="h-8 w-20 rounded-lg" />
                    ) : (
                        <p className="text-2xl font-bold text-slate-800">
                            {value?.toLocaleString() ?? "—"}
                        </p>
                    )}
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                </div>
            </Card.Content>
        </Card>
    );
}

export default function AdminDashboardPage(): React.ReactElement {
    const { dashboard, isLoading } = useAdminDashboard();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-500">
                    ภาพรวมข้อมูลระบบจัดการสอบ
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Course Offerings"
                    value={dashboard?.totalCourseOfferings}
                    icon={<HiOutlineBookOpen className="h-6 w-6 text-[#296374]" />}
                    iconBg="bg-[#296374]/10"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Exams"
                    value={dashboard?.totalExams}
                    icon={
                        <HiOutlineClipboardDocumentList className="h-6 w-6 text-[#629fad]" />
                    }
                    iconBg="bg-[#629fad]/10"
                    isLoading={isLoading}
                />
                <StatCard
                    title="Reviews"
                    value={dashboard?.totalReviews}
                    icon={
                        <HiOutlineChatBubbleLeftRight className="h-6 w-6 text-amber-500" />
                    }
                    iconBg="bg-amber-500/10"
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
