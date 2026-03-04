"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { HiOutlineCloudUpload } from "react-icons/hi";

export const CourseUploadSidebar: React.FC = () => {
  return (
    <div className="sticky top-10 w-full lg:w-[280px]">
      <Card className="overflow-hidden rounded-3xl border-none bg-white p-1 shadow-lg transition-all hover:shadow-xl">
        <Card.Content className="flex flex-col items-center justify-center p-5">
          <div className="bg-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary/10 mb-6 flex h-24 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors">
            <div className="text-primary/30 mb-2 text-4xl">
              <HiOutlineCloudUpload />
            </div>
            <p className="text-primary/50 max-w-[140px] text-center text-[11px] font-bold">
              Drop your PDF here
            </p>
          </div>

          <div className="mb-6 w-full space-y-2">
            <h3 className="text-primary text-center text-sm font-black tracking-tight">
              PDF AUTO-FILL
            </h3>
            <p className="text-primary/40 text-center text-[10px] leading-normal font-medium">
              Auto-fill exam details from your PDF to save time.
            </p>
          </div>

          <Button className="bg-primary h-11 w-full rounded-xl text-sm font-bold text-white shadow-md transition-all hover:bg-[#204d5a] active:scale-95">
            CHOOSE FILE
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};
