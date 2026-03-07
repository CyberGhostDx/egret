"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { HiOutlineCloudUpload } from "react-icons/hi";

export const CourseUploadSidebar: React.FC = () => {
  return (
    <div className="sticky top-10 w-full lg:w-[320px]">
      <Card className="overflow-hidden border-none bg-white/80 p-1 shadow-2xl backdrop-blur-md transition-all hover:shadow-xl">
        <Card.Content className="flex flex-col items-center justify-center p-6">
          <div className="bg-primary/[0.03] border-primary/10 hover:border-primary/20 hover:bg-primary/5 mb-8 flex h-36 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all">
            <div className="text-primary/30 mb-3 text-5xl">
              <HiOutlineCloudUpload />
            </div>
            <p className="text-primary/40 max-w-[140px] text-center text-xs font-bold leading-relaxed uppercase">
              Drop your PDF<br />files here
            </p>
          </div>

          <div className="mb-8 w-full space-y-2">
            <h3 className="text-primary text-center text-base font-black tracking-tight uppercase">
              PDF AUTO-FILL
            </h3>
            <p className="text-primary/40 text-center text-xs leading-normal font-semibold">
              Automatically extract and fill exam details from your PDF to save development time.
            </p>
          </div>

          <Button className="bg-primary h-12 w-full rounded-2xl text-sm font-black text-white shadow-lg transition-all active:scale-95">
            CHOOSE FILE
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};
