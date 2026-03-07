import React, { useMemo, useState } from "react";
import { Table, Button, Skeleton, Chip, cn, Pagination } from "@heroui/react";
import { LuEye, LuCopy } from "react-icons/lu";
import { AdminReviewCourse } from "@/hooks/useAdminReviews";

interface AdminReviewsTableProps {
  courses: AdminReviewCourse[];
  isLoading: boolean;
  onViewReviews: (course: AdminReviewCourse) => void;
}

const ROWS_PER_PAGE = 5;

export const AdminReviewsTable: React.FC<AdminReviewsTableProps> = ({
  courses,
  isLoading,
  onViewReviews,
}): React.ReactElement => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((courses?.length || 0) / ROWS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return (courses || []).slice(start, start + ROWS_PER_PAGE);
  }, [courses, page]);

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
  const end = Math.min(page * ROWS_PER_PAGE, courses?.length || 0);

  return (
    <Table className="overflow-hidden rounded-3xl border-none bg-white/80 p-0 shadow-2xl backdrop-blur-md">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Admin Reviews Table"
          className="min-w-[800px]"
        >
          <Table.Header>
            <Table.Column
              isRowHeader
              className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase"
            >
              SUBJECT ID
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase">
              COURSE NAME
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-center text-xs font-bold tracking-wider text-slate-400 uppercase">
              REVIEWS
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-center text-xs font-bold tracking-wider text-slate-400 uppercase">
              DIFFICULTY
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
                  <Table.Cell className="px-6 py-4 text-center">
                    <Skeleton className="mx-auto h-6 w-10 rounded-full" />
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-center">
                    <Skeleton className="mx-auto h-4 w-12 rounded-lg" />
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-end">
                    <Skeleton className="ml-auto h-9 w-10 rounded-xl" />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : paginatedItems.length > 0 ? (
              paginatedItems.map((course) => (
                <Table.Row
                  key={course.id}
                  className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                >
                  <Table.Cell className="px-6 py-4">
                    <div className="group flex items-center gap-2">
                      <span className="text-primary text-sm font-bold">
                        {course.id}
                      </span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="hover:text-primary h-8 min-w-8 rounded-lg text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <LuCopy className="size-3.5" />
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-slate-800">
                        {course.titleTh}
                      </span>
                      <span className="text-[11px] font-bold tracking-tight text-slate-400 uppercase">
                        {course.titleEn}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-center">
                    <Chip
                      size="sm"
                      variant="soft"
                      className={cn(
                        "text-[10px] font-bold",
                        course.reviews.length > 0
                          ? "bg-primary/10 text-primary"
                          : "bg-slate-100 text-slate-400",
                      )}
                    >
                      {course.reviews.length} รีวิว
                    </Chip>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-slate-600">
                      {typeof course.difficulty === "number"
                        ? course.difficulty.toFixed(1)
                        : 0}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <Button
                        isIconOnly
                        onPress={() => onViewReviews(course)}
                        variant="ghost"
                        className="hover:bg-primary h-9 w-9 min-w-9 rounded-xl border-none bg-slate-50 text-slate-600 shadow-sm transition-all hover:text-white active:scale-95"
                      >
                        <LuEye className="text-lg" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell>
                  <span className="block w-full py-20 text-center text-slate-400">
                    No reviews found.
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
              {start} to {end} of {courses?.length || 0} results
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
  );
};
