"use client";

import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { Card, Skeleton } from "@heroui/react";
import {
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentList,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

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
    <div>
      <Card className="overflow-hidden border-none bg-white/80 shadow-lg backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:ring-1 hover:ring-blue-100/50">
        <Card.Content className="p-0">
          <div className="flex items-center gap-5 p-6">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-inner ${iconBg}`}
            >
              {icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                {title}
              </p>
              {isLoading ? (
                <Skeleton className="mt-1 h-8 w-24 rounded-lg" />
              ) : (
                <p className="text-3xl font-black tracking-tight text-slate-800">
                  {value?.toLocaleString() ?? "—"}
                </p>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="rounded-2xl border border-slate-100/50 bg-white/90 p-4 shadow-2xl backdrop-blur-xl">
        <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <div className="from-primary h-3 w-3 rounded-full bg-linear-to-tr to-[#84b6b6]" />
          <p className="text-lg font-black text-slate-800">
            {value.toLocaleString()}{" "}
            <span className="text-sm font-medium text-slate-500">คน</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const BAR_COLORS = ["#296374", "#327a8e", "#3d91a7", "#629fad", "#84b6b6"];

export default function AdminDashboardPage(): React.ReactElement {
  const { dashboard, isLoading } = useAdminDashboard();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 px-6 py-10 md:px-12">
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-teal-50/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <LuLayoutDashboard className="text-primary text-3xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Dashboard
              </h1>
            </div>
            <p className="ml-1 text-lg font-medium text-slate-400">
              Overview of system performance and key metrics
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <StatCard
            title="จำนวนรายวิชาที่เปิดสอน"
            value={dashboard?.totalCourseOfferings}
            icon={<HiOutlineBookOpen className="h-7 w-7 text-white" />}
            iconBg="bg-linear-to-br from-primary to-[#3d91a7]"
            isLoading={isLoading}
          />
          <StatCard
            title="จำนวนการสอบ"
            value={dashboard?.totalExams}
            icon={
              <HiOutlineClipboardDocumentList className="h-7 w-7 text-white" />
            }
            iconBg="bg-linear-to-br from-[#327a8e] to-[#629fad]"
            isLoading={isLoading}
          />
          <StatCard
            title="จำนวนรีวิว"
            value={dashboard?.totalReviews}
            icon={
              <HiOutlineChatBubbleLeftRight className="h-7 w-7 text-white" />
            }
            iconBg="bg-linear-to-br from-amber-400 to-orange-500"
            isLoading={isLoading}
          />
        </div>

        <div>
          <Card className="mt-12 overflow-hidden border-none bg-white/80 shadow-2xl backdrop-blur-md">
            <Card.Header className="border-b border-slate-100/50 bg-slate-50/30 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-black tracking-tight text-slate-800">
                    รายวิชาที่มีนิสิตลงทะเบียนสูงสุด
                  </h3>
                  <p className="text-sm font-semibold text-slate-400">
                    5 อันดับวิชาที่มีจำนวนนิสิตมากที่สุดในระบบ
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100/50 text-slate-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <div className="mx-1 h-3 w-1.5 rounded-full bg-slate-400" />
                  <div className="h-4.5 w-1.5 rounded-full bg-slate-400" />
                </div>
              </div>
            </Card.Header>
            <Card.Content className="px-4 py-10 md:px-8">
              {isLoading ? (
                <div className="flex flex-col gap-6 py-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-full rounded-2xl" />
                    </div>
                  ))}
                </div>
              ) : dashboard?.topCourses && dashboard.topCourses.length > 0 ? (
                <ResponsiveContainer width="100%" height={420}>
                  <BarChart
                    data={dashboard.topCourses}
                    layout="vertical"
                    margin={{ top: 10, right: 60, left: 20, bottom: 10 }}
                    barCategoryGap="25%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="courseName"
                      width={310}
                      tick={{ fill: "#64748b", fontSize: 13, fontWeight: 700 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      content={<CustomTooltip />}
                    />
                    <Bar
                      dataKey="studentCount"
                      name="จำนวนนิสิต"
                      radius={[0, 12, 12, 0]}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                      shape={(props: any) => {
                        const { index } = props;
                        return (
                          <Rectangle
                            {...props}
                            fill={BAR_COLORS[index % BAR_COLORS.length]}
                          />
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-40 grayscale">
                  <p className="text-lg font-bold text-slate-300">
                    ไม่มีข้อมูลการแสดงผลรายวิชา
                  </p>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
