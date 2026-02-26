"use client";

import { SWRConfig } from "swr";
import axiosInstance from "@/lib/axiosInstance";

interface SwrProviderProps {
  children: React.ReactNode;
}

export function SwrProvider({ children }: SwrProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axiosInstance.get(url).then((res) => res.data.data),
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
