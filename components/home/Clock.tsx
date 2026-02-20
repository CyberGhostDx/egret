"use client"

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return <div className="h-24"></div>;
  }

  const hours = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    timeZone: "Asia/Bangkok"
  }).padStart(2, "0");
  const minutes = time.toLocaleTimeString("en-GB", {
    minute: "2-digit",
    timeZone: "Asia/Bangkok"
  }).padStart(2, "0");
  const seconds = time.toLocaleTimeString("en-GB", {
    second: "2-digit",
    timeZone: "Asia/Bangkok"
  }).padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center text-[#2c5f66] py-10">
      <div className="flex items-center gap-2 text-center">
        <div className="flex flex-col min-w-[80px]">
          <span className="text-7xl font-bold tracking-tight">{hours}</span>
          <span className="text-sm font-medium opacity-70 mt-1">Hours</span>
        </div>
        <span className="text-6xl font-bold mb-6 opacity-80">:</span>
        <div className="flex flex-col min-w-[80px]">
          <span className="text-7xl font-bold tracking-tight">{minutes}</span>
          <span className="text-sm font-medium opacity-70 mt-1">Minutes</span>
        </div>
        <span className="text-6xl font-bold mb-6 opacity-80">:</span>
        <div className="flex flex-col min-w-[80px]">
          <span className="text-7xl font-bold tracking-tight">{seconds}</span>
          <span className="text-sm font-medium opacity-70 mt-1">Seconds</span>
        </div>
      </div>
    </div>
  );
}
