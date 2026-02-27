"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { HiOutlineCloudUpload } from "react-icons/hi";

export const CourseUploadSidebar: React.FC = () => {
    return (
        <div className="sticky top-10 w-full lg:w-[300px]">
            <Card className="flex flex-col items-center justify-center rounded-[2rem] bg-white/60 p-8 shadow-md backdrop-blur-md border-none">
                <p className="mb-6 max-w-[160px] text-center text-sm font-semibold text-[#629fadcc]">
                    place your pdf. file here...
                </p>
                <div className="mb-6 text-5xl text-[#629fadcc]">
                    <HiOutlineCloudUpload />
                </div>
                <Button className="h-11 w-full rounded-full bg-[#296374] px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#204d5a] active:scale-95">
                    UPLOAD PDF
                </Button>
            </Card>
        </div>
    );
};
