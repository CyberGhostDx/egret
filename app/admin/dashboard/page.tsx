"use client";

import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { Card, Skeleton } from "@heroui/react";
import {
    HiOutlineBookOpen,
    HiOutlineClipboardDocumentList,
    HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

/* ── Stat Card ─────────────────────────────────────────── */

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

/* ── Bar Colors ────────────────────────────────────────── */

const BAR_COLORS = ["#296374", "#327a8e", "#3d91a7", "#629fad", "#84b6b6"];

/* ── Page ──────────────────────────────────────────────── */

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

            {/* Top Courses Bar Chart */}
            <Card className="mt-8 border border-slate-100 bg-white shadow-sm">
                <Card.Header className="px-6 pt-6 pb-2">
                    <div className="flex flex-col gap-1">
                        <Card.Title className="text-lg font-bold text-slate-800">
                            รายวิชาที่มีนิสิตลงทะเบียนสูงสุด 5 อันดับ
                        </Card.Title>
                        <Card.Description className="text-sm text-slate-400">
                            ชื่อวิชา / จำนวนนิสิต
                        </Card.Description>
                    </div>
                </Card.Header>
                <Card.Content className="px-6 pb-6">
                    {isLoading ? (
                        <div className="flex flex-col gap-4 py-8">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-8 w-full rounded-lg" />
                            ))}
                        </div>
                    ) : dashboard?.topCourses && dashboard.topCourses.length > 0 ? (
                        <ResponsiveContainer width="100%" height={360}>
                            <BarChart
                                data={dashboard.topCourses}
                                layout="vertical"
                                margin={{ top: 16, right: 32, left: 0, bottom: 0 }}
                                barCategoryGap="28%"
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal={false}
                                    stroke="#e2e8f0"
                                />
                                <XAxis
                                    type="number"
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="courseName"
                                    width={180}
                                    tick={{ fill: "#334155", fontSize: 13, fontWeight: 500 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(41, 99, 116, 0.06)" }}
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: "1px solid #e2e8f0",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        padding: "8px 14px",
                                        fontSize: 13,
                                    }}
                                    formatter={(value: number) => [
                                        `${value.toLocaleString()} คน`,
                                        "จำนวนนิสิต",
                                    ]}
                                />
                                <Bar dataKey="studentCount" radius={[0, 8, 8, 0]}>
                                    {dashboard.topCourses.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={BAR_COLORS[index % BAR_COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center py-16">
                            <p className="text-sm text-slate-400">ไม่มีข้อมูลรายวิชา</p>
                        </div>
                    )}
                </Card.Content>
            </Card>
        </div>
    );
}
