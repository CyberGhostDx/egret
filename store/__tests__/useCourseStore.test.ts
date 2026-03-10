import { renderHook, act } from "@testing-library/react";
import { useCourseStore } from "../useCourseStore";
import { expect, test, describe, beforeEach } from "vitest";

describe("useCourseStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useCourseStore.getState().reset();
  });

  test("should initialize with one empty course", () => {
    const { result } = renderHook(() => useCourseStore());
    expect(result.current.courses.length).toBe(1);
    expect(result.current.courses[0].id).toBeDefined();
    expect(result.current.courses[0].subjectEn).toBe("");
  });

  test("should add a new course correctly", () => {
    const { result } = renderHook(() => useCourseStore());

    act(() => {
      result.current.addCourse();
    });

    expect(result.current.courses.length).toBe(2);
  });

  test("should remove a course by id", () => {
    const { result } = renderHook(() => useCourseStore());
    const firstCourseId = result.current.courses[0].id;

    act(() => {
      result.current.removeCourse(firstCourseId);
    });

    expect(result.current.courses.length).toBe(0);
  });

  test("should update a course data", () => {
    const { result } = renderHook(() => useCourseStore());
    const firstCourseId = result.current.courses[0].id;

    act(() => {
      result.current.updateCourse(firstCourseId, { subjectEn: "Testing 101" });
    });

    expect(result.current.courses[0].subjectEn).toBe("Testing 101");
  });
});
