import { renderHook, waitFor } from "@testing-library/react";
import { useUser } from "../useUser";
import { expect, test, describe, vi } from "vitest";
import useSWR from "swr";

// Mock SWR and other hooks
vi.mock("swr", () => ({ default: vi.fn() }));
vi.mock("next-intl", () => ({
  useTranslations: () => vi.fn((key) => key), // return translation key
}));

describe("useUser Hook", () => {
  test("should indicate isLoading when data is fetching", () => {
    (useSWR as any).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: true,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.user).toBeNull();
  });

  test("should parse user data correctly on success", async () => {
    const mockUserData = {
      name: "Test User",
      email: "test@egret.com",
      userCourses: [],
    };

    (useSWR as any).mockReturnValue({
      data: mockUserData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.user?.name).toBe("Test User");
  });

  test("should indicate isError when data fetching fails", () => {
    (useSWR as any).mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.isError).toBe(true);
    expect(result.current.user).toBeNull();
  });
});
