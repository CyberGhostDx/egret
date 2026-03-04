import useSWR from "swr";
import { adminDashboardSchema } from "@/schema/backend.schema";
import { useMemo } from "react";

export function useAdminDashboard() {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        "/api/admin/dashboard",
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const dashboard = useMemo(() => {
        return data ? adminDashboardSchema.parse(data) : null;
    }, [data]);

    return {
        dashboard,
        isLoading: isLoading || (!dashboard && !error),
        isError: error,
        isValidating,
        mutate,
    };
}
