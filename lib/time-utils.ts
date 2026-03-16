export const calculateExamTargetTime = (examDate: Date, startTimeStr: string) => {
  const [hoursStr, minutesStr] = startTimeStr.split(":");

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(examDate);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  return new Date(
    `${year}-${month}-${day}T${hoursStr.padStart(2, "0")}:${minutesStr.padStart(2, "0")}:00+07:00`,
  );
};

export const calculateTimeLeft = (examDate: Date, startTimeStr: string, now: Date) => {
  const targetTime = calculateExamTargetTime(examDate, startTimeStr);
  const difference = targetTime.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);

  return { days, hours, minutes };
};

export const formatCalendarTime = (date: Date, time: string) => {
  const [h, m] = time.split(":").map(Number);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  const pad = (n: string | number) => n.toString().padStart(2, "0");
  return `${year}${month}${day}T${pad(h)}${pad(m)}00`;
};
