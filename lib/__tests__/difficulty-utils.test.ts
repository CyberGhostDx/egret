import { expect, test, describe } from "vitest";
import { getDifficultyColor } from "../difficulty-utils";

describe("difficulty-utils", () => {
  test("should return green background (bg-[#8ce99a]) for difficulty level 1 or 2", () => {
    expect(getDifficultyColor(1)).toBe("bg-[#8ce99a]");
    expect(getDifficultyColor(2)).toBe("bg-[#8ce99a]");
  });

  test("should return yellow background (bg-[#fcc419]) for difficulty level 3", () => {
    expect(getDifficultyColor(3)).toBe("bg-[#fcc419]");
  });

  test("should return orange background (bg-[#ff922b]) for difficulty level 4", () => {
    expect(getDifficultyColor(4)).toBe("bg-[#ff922b]");
  });

  test("should return red background (bg-[#fa5252]) for difficulty level 5", () => {
    expect(getDifficultyColor(5)).toBe("bg-[#fa5252]");
  });
});
