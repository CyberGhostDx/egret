import { expect, test, describe } from "vitest";
import { calculateTimeLeft, calculateExamTargetTime, formatCalendarTime } from "../time-utils";

describe("time-utils", () => {
  describe("calculateExamTargetTime", () => {
    test("should correctly create a Date object in Bangkok time zone (UTC+7)", () => {
      const examDate = new Date("2024-05-15T00:00:00Z");
      const startTimeStr = "09:30";
      const targetTime = calculateExamTargetTime(examDate, startTimeStr);
      
      // Expected: 2024-05-15T09:30:00+07:00
      expect(targetTime.toISOString()).toBe(new Date("2024-05-15T02:30:00Z").toISOString());
    });
  });

  describe("calculateTimeLeft", () => {
    test("should return correct remaining time (days, hours, minutes) when the exam is in the future", () => {
      const targetDate = new Date("2024-05-15T00:00:00Z");
      const startTimeStr = "12:00"; // target: 2024-05-15T12:00:00+07:00 (05:00 UTC)
      const now = new Date("2024-05-14T10:00:00+07:00"); // 1 day and 2 hours before 12:00

      const timeLeft = calculateTimeLeft(targetDate, startTimeStr, now);

      expect(timeLeft.days).toBe(1);
      expect(timeLeft.hours).toBe(2);
      expect(timeLeft.minutes).toBe(0);
    });

    test("should return zeros when the exam time has already passed", () => {
      const targetDate = new Date("2024-05-15T00:00:00Z");
      const startTimeStr = "09:00";
      const now = new Date("2024-05-15T10:00:00+07:00"); // 1 hour after start

      const timeLeft = calculateTimeLeft(targetDate, startTimeStr, now);

      expect(timeLeft.days).toBe(0);
      expect(timeLeft.hours).toBe(0);
      expect(timeLeft.minutes).toBe(0);
    });
  });

  describe("formatCalendarTime", () => {
    test("should format a Date object into a string compatible with calendar links (YYYYMMDDTHHMMSS)", () => {
      const date = new Date("2024-03-25T00:00:00Z");
      const time = "14:45";
      const formatted = formatCalendarTime(date, time);
      
      expect(formatted).toBe("20240325T144500");
    });
  });
});
