import React, { useMemo, useState } from "react";
import {
  Table,
  Button,
  Skeleton,
  Chip,
  cn,
  Pagination,
  SortDescriptor,
} from "@heroui/react";
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
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    if (!courses) return [];

    return [...courses].sort((a, b) => {
      let first: any;
      let second: any;

      switch (sortDescriptor.column) {
        case "id":
          first = a.id;
          second = b.id;
          break;
        case "name":
          first = a.titleTh;
          second = b.titleTh;
          break;
        case "reviews":
          first = a.reviews.length;
          second = b.reviews.length;
          break;
        case "difficulty":
          first = a.difficulty;
          second = b.difficulty;
          break;
        default:
          first = (a as any)[sortDescriptor.column!];
          second = (b as any)[sortDescriptor.column!];
      }

      if (typeof first === "string") {
        const cmp = first.localeCompare(second);
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }

      const cmp =
        (first || 0) < (second || 0)
          ? -1
          : (first || 0) > (second || 0)
            ? 1
            : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [courses, sortDescriptor]);

  const totalPages = Math.ceil((sortedItems.length || 0) / ROWS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return sortedItems.slice(start, start + ROWS_PER_PAGE);
  }, [sortedItems, page]);

  const handleSort = (column: string) => {
    setSortDescriptor({
      column,
      direction:
        sortDescriptor.column === column &&
        sortDescriptor.direction === "ascending"
          ? "descending"
          : "ascending",
    });
    setPage(1); // Reset page on sort
  };

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
  const end = Math.min(page * ROWS_PER_PAGE, sortedItems.length);

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
              <button
                onClick={() => handleSort("id")}
                className="flex items-center gap-1 transition-colors hover:text-slate-600"
              >
                SUBJECT ID
                {sortDescriptor.column === "id" && (
                  <span className="text-[8px]">
                    {sortDescriptor.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </button>
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <button
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 transition-colors hover:text-slate-600"
              >
                COURSE NAME
                {sortDescriptor.column === "name" && (
                  <span className="text-[8px]">
                    {sortDescriptor.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </button>
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <button
                onClick={() => handleSort("reviews")}
                className="flex w-full items-center justify-center gap-1 transition-colors hover:text-slate-600"
              >
                REVIEWS
                {sortDescriptor.column === "reviews" && (
                  <span className="text-[8px]">
                    {sortDescriptor.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </button>
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <button
                onClick={() => handleSort("difficulty")}
                className="flex w-full items-center justify-center gap-1 transition-colors hover:text-slate-600"
              >
                DIFFICULTY
                {sortDescriptor.column === "difficulty" && (
                  <span className="text-[8px]">
                    {sortDescriptor.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </button>
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-end text-xs font-bold tracking-wider text-slate-400 uppercase">
              ACTIONS
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              [...Array(ROWS_PER_PAGE)].map((_, i) => (
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
                        onPress={() => {
                          navigator.clipboard.writeText(course.id);
                        }}
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
              {start} to {end} of {sortedItems.length} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p: number) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {visiblePages.map((p: number) => (
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
                  onPress={() =>
                    setPage((p: number) => Math.min(totalPages, p + 1))
                  }
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
