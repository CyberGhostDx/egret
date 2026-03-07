"use client";

import React, { useMemo, useState } from "react";
import { AdminReviewsTable } from "@/components/admin/reviews/AdminReviewsTable";
import { AdminReviewModal } from "@/components/admin/reviews/AdminReviewModal";
import {
  Input,
  useOverlayState,
  Tabs,
  Card,
  Button,
  Avatar,
  Chip,
  cn,
  Pagination,
} from "@heroui/react";
import {
  LuSearch,
  LuMessageSquare,
  LuStar,
  LuBook,
  LuActivity,
  LuTrash2,
  LuCheck,
  LuInfo,
  LuFilter,
  LuArrowDownAZ,
  LuRotateCcw,
} from "react-icons/lu";
import {
  useAdminReviews,
  AdminReviewCourse,
  AdminReview,
} from "@/hooks/useAdminReviews";
import type { Key } from "react";
import { Select, ListBox } from "@heroui/react";

const FEED_ROWS_PER_PAGE = 9;

const AdminReviewsPage = (): React.ReactElement => {
  const { coursesWithReviews, isLoading, deleteReview } = useAdminReviews();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCourse, setSelectedCourse] =
    useState<AdminReviewCourse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("by-course");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [feedPage, setFeedPage] = useState(1);
  const reviewModalState = useOverlayState();

  const { stats, allReviews } = useMemo(() => {
    let totalReviews = 0;
    let totalDifficulty = 0;
    let activeReviewsCounted = 0;
    const flattened: (AdminReview & {
      courseId: string;
      courseName: string;
      courseTitleEn: string;
    })[] = [];

    coursesWithReviews.forEach((course) => {
      course.reviews.forEach((review) => {
        totalReviews++;
        if (review.status === "published") {
          totalDifficulty += review.difficulty;
          activeReviewsCounted++;
        }

        if (statusFilter === "all" || review.status === statusFilter) {
          flattened.push({
            ...review,
            courseId: course.id,
            courseName: course.titleTh,
            courseTitleEn: course.titleEn,
          });
        }
      });
    });

    flattened.sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sortBy === "difficulty") return b.difficulty - a.difficulty;
      return 0;
    });

    return {
      stats: {
        totalReviews,
        avgDifficulty:
          activeReviewsCounted > 0
            ? (totalDifficulty / activeReviewsCounted).toFixed(1)
            : "0",
        activeCourses: coursesWithReviews.filter((c) => c.reviews.length > 0)
          .length,
        totalCourses: coursesWithReviews.length,
      },
      allReviews: flattened,
    };
  }, [coursesWithReviews, statusFilter, sortBy]);

  // Reset feed page when filters change
  React.useEffect(() => {
    setFeedPage(1);
  }, [statusFilter, sortBy, searchQuery]);

  const paginatedFeedReviews = useMemo(() => {
    const start = (feedPage - 1) * FEED_ROWS_PER_PAGE;
    return allReviews.slice(start, start + FEED_ROWS_PER_PAGE);
  }, [allReviews, feedPage]);

  const totalFeedPages = Math.ceil(allReviews.length / FEED_ROWS_PER_PAGE);

  const filteredCourses = useMemo((): AdminReviewCourse[] => {
    const query = searchQuery.toLowerCase().trim();
    let result = [...coursesWithReviews];

    if (query) {
      result = result.filter(
        (course) =>
          course.id.toLowerCase().includes(query) ||
          course.titleTh.toLowerCase().includes(query) ||
          course.titleEn.toLowerCase().includes(query),
      );
    }

    return result;
  }, [coursesWithReviews, searchQuery, sortBy]);

  const handleViewReviews = (course: AdminReviewCourse): void => {
    setSelectedCourse(course);
    reviewModalState.open();
  };

  const handleDeleteReview = async (reviewId: string): Promise<void> => {
    const success = await deleteReview(reviewId);
    if (success) {
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              reviews: prev.reviews.filter((r) => r._id !== reviewId),
            }
          : null,
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 px-6 py-10 md:px-12">
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-teal-50/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <LuMessageSquare className="text-primary text-3xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Reviews Management
              </h1>
            </div>
            <p className="ml-1 text-lg font-medium text-slate-400">
              Monitor and moderate course reviews and feedback
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
            <div className="relative flex-1 sm:w-80 sm:flex-none">
              <Input
                placeholder="Search course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-primary/30 h-11 w-full rounded-2xl border border-slate-200 bg-white/80 px-10 text-xs font-bold shadow-sm transition-all"
              />
              <LuSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            </div>

            <Select
              className="w-32"
              value={statusFilter}
              onChange={(key: Key | null) =>
                setStatusFilter(key?.toString() || "all")
              }
            >
              <Select.Trigger className="h-11 rounded-2xl border border-slate-200 bg-white/80 px-3 text-[10px] font-bold shadow-sm transition-all">
                <div className="flex items-center gap-2">
                  <LuFilter className="text-slate-400" />
                  <Select.Value />
                </div>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="p-1">
                  {[
                    { id: "all", name: "All Status" },
                    { id: "published", name: "Published" },
                    { id: "deleted", name: "Deleted" },
                  ].map((item) => (
                    <ListBox.Item
                      key={item.id}
                      id={item.id}
                      className="rounded-xl text-[10px] font-bold uppercase transition-colors"
                    >
                      {item.name}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {activeTab !== "by-course" && (
              <Select
                className="w-40"
                value={sortBy}
                onChange={(key: Key | null) =>
                  setSortBy(key?.toString() || "newest")
                }
              >
                <Select.Trigger className="h-11 rounded-2xl border border-slate-200 bg-white/80 px-3 text-[10px] font-bold shadow-sm transition-all">
                  <div className="flex items-center gap-2">
                    <LuArrowDownAZ className="text-slate-400" />
                    <Select.Value />
                  </div>
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="p-1">
                    {[
                      { id: "newest", name: "Newest First" },
                      { id: "oldest", name: "Oldest First" },
                    ].map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={item.id}
                        className="rounded-xl text-[10px] font-bold uppercase transition-colors"
                      >
                        {item.name}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <LuMessageSquare className="text-primary text-2xl" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Total Reviews
                </p>
                <h3 className="text-3xl font-black text-slate-900">
                  {stats.totalReviews}
                </h3>
              </div>
            </div>
          </Card>

          <Card className="border-none bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-amber-500/10 p-3">
                <LuStar className="text-2xl text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Avg Difficulty
                </p>
                <h3 className="text-3xl font-black text-slate-900">
                  {stats.avgDifficulty}
                </h3>
              </div>
            </div>
          </Card>

          <Card className="border-none bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-teal-500/10 p-3">
                <LuBook className="text-2xl text-teal-500" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Active Courses
                </p>
                <div className="flex items-end gap-1">
                  <h3 className="text-3xl font-black text-slate-900">
                    {stats.activeCourses}
                  </h3>
                  <span className="mb-1 text-sm font-bold text-slate-400">
                    / {stats.totalCourses}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-none bg-white/60 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-rose-500/10 p-3">
                <LuActivity className="text-2xl text-rose-500" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Latest Activity
                </p>
                <h3 className="text-sm font-bold text-slate-900">
                  {allReviews.length > 0
                    ? new Date(allReviews[0].createdAt).toLocaleDateString()
                    : "No reviews"}
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="mb-6">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tabs.ListContainer>
              <Tabs.List className="gap-6 border-b border-slate-200">
                <Tabs.Tab
                  id="by-course"
                  className="h-12 px-2 text-sm font-bold"
                >
                  <div className="flex items-center gap-2">
                    <span>By Course</span>
                    <div className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
                      {filteredCourses.length}
                    </div>
                  </div>
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab
                  id="all-reviews"
                  className="h-12 px-2 text-sm font-bold"
                >
                  <div className="flex items-center gap-2">
                    <span>Recent Feed</span>
                    <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px]">
                      {allReviews.length}
                    </div>
                  </div>
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="by-course">
              <div className="mt-8">
                <AdminReviewsTable
                  courses={filteredCourses}
                  isLoading={isLoading}
                  onViewReviews={handleViewReviews}
                />
              </div>
            </Tabs.Panel>

            <Tabs.Panel id="all-reviews">
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedFeedReviews.map((review) => {
                    const isDeleted = review.status === "deleted";
                    return (
                      <Card
                        key={`${review.courseId}-${review._id}`}
                        className={cn(
                          "border-none shadow-xl backdrop-blur-sm transition-all",
                          isDeleted ? "bg-slate-50 opacity-60" : "bg-white/80",
                        )}
                      >
                        <Card.Content className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="bg-primary/10 text-primary h-10 w-10 text-sm font-black">
                                {review.username
                                  ? review.username[0].toUpperCase()
                                  : "U"}
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-slate-800">
                                    {review.username}
                                  </h4>
                                  <Chip
                                    size="sm"
                                    variant="soft"
                                    className={cn(
                                      "h-5 border-none px-2 text-[10px] font-bold uppercase",
                                      isDeleted
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-600",
                                    )}
                                  >
                                    <div className="flex items-center gap-1">
                                      {isDeleted ? (
                                        <LuInfo className="size-3" />
                                      ) : (
                                        <LuCheck className="size-3" />
                                      )}
                                      {review.status || "published"}
                                    </div>
                                  </Chip>
                                </div>
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                  {review.courseId}
                                </p>
                              </div>
                            </div>
                            {!isDeleted ? (
                              <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                className="border-none bg-transparent text-red-500 hover:text-red-500"
                                onPress={() => handleDeleteReview(review._id)}
                              >
                                <LuTrash2 className="text-sm" />
                              </Button>
                            ) : (
                              <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                className="border-none bg-transparent text-green-500 hover:text-green-600"
                                onPress={() => console.log("Restore clicked from Feed:", review.courseId, review._id)}
                              >
                                <LuRotateCcw className="text-sm" />
                              </Button>
                            )}
                          </div>

                          <div className="mb-4">
                            <p className="mb-1 line-clamp-1 text-xs font-bold tracking-tight text-slate-400 uppercase">
                              {review.courseName}
                            </p>
                            <p
                              className={cn(
                                "line-clamp-4 text-sm leading-relaxed",
                                isDeleted
                                  ? "text-slate-400 line-through"
                                  : "text-slate-600",
                              )}
                            >
                              "{review.content}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <div
                                  key={s}
                                  className={`h-2 w-2 rounded-full ${s <= review.difficulty ? "bg-amber-400" : "bg-slate-100"}`}
                                />
                              ))}
                            </div>
                            <div className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </Card.Content>
                      </Card>
                    );
                  })}
                  {allReviews.length === 0 && !isLoading && (
                    <div className="col-span-full py-24 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <LuMessageSquare className="text-2xl text-slate-300" />
                      </div>
                      <p className="font-bold text-slate-400">
                        No reviews found in the feed.
                      </p>
                    </div>
                  )}
                </div>

                {totalFeedPages > 1 && (
                  <div className="mt-12 flex w-full flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 sm:flex-row">
                    <p className="whitespace-nowrap text-xs font-bold text-slate-400">
                      Showing {(feedPage - 1) * FEED_ROWS_PER_PAGE + 1} to{" "}
                      {Math.min(feedPage * FEED_ROWS_PER_PAGE, allReviews.length)}{" "}
                      of {allReviews.length} reviews
                    </p>
                    <div className="flex sm:ml-auto">
                      <Pagination size="sm">
                        <Pagination.Content>
                          <Pagination.Item>
                            <Pagination.Previous
                              isDisabled={feedPage === 1}
                              onPress={() => setFeedPage((p) => Math.max(1, p - 1))}
                            >
                              <Pagination.PreviousIcon />
                              Prev
                            </Pagination.Previous>
                          </Pagination.Item>
                          {Array.from({ length: totalFeedPages }, (_, i) => i + 1)
                            .filter(
                              (p) =>
                                p === 1 ||
                                p === totalFeedPages ||
                                (p >= feedPage - 1 && p <= feedPage + 1),
                            )
                            .map((p, i, arr) => {
                              const elements = [];
                              if (i > 0 && p !== arr[i - 1] + 1) {
                                elements.push(
                                  <Pagination.Item key={`ellipsis-${p}`}>
                                    <Pagination.Ellipsis />
                                  </Pagination.Item>,
                                );
                              }
                              elements.push(
                                <Pagination.Item key={p}>
                                  <Pagination.Link
                                    isActive={p === feedPage}
                                    onPress={() => setFeedPage(p)}
                                  >
                                    {p}
                                  </Pagination.Link>
                                </Pagination.Item>,
                              );
                              return elements;
                            })}
                          <Pagination.Item>
                            <Pagination.Next
                              isDisabled={feedPage === totalFeedPages}
                              onPress={() =>
                                setFeedPage((p) => Math.min(totalFeedPages, p + 1))
                              }
                            >
                              Next
                              <Pagination.NextIcon />
                            </Pagination.Next>
                          </Pagination.Item>
                        </Pagination.Content>
                      </Pagination>
                    </div>
                  </div>
                )}
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>

      <AdminReviewModal
        isOpen={reviewModalState.isOpen}
        onOpenChange={reviewModalState.setOpen}
        course={selectedCourse}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
};

export default AdminReviewsPage;
