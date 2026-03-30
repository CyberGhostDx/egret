import { renderHook, act } from "@testing-library/react";
import { useTimeStore } from "../useTimeStore";
import { expect, test, describe } from "vitest";

describe("useTimeStore", () => {
  test("should initialize with a valid Date object", () => {
    const { result } = renderHook(() => useTimeStore());
    expect(result.current.now).toBeInstanceOf(Date);
  });

  test("should update the now property when updateNow is called", () => {
    const { result } = renderHook(() => useTimeStore());
    const initialTime = result.current.now;

    act(() => {
      result.current.updateNow();
    });

    expect(result.current.now.getTime()).toBeGreaterThanOrEqual(
      initialTime.getTime(),
    );
  });
});
