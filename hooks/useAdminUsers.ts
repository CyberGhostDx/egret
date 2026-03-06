import useSWR from "swr";
import { z } from "zod";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@heroui/react";
import { useMemo } from "react";

export const adminUserSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    role: z.string().nullable(),
    banned: z.boolean().nullable(),
    createdAt: z.coerce.date().optional(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;

export const adminUsersResponseSchema = z.array(adminUserSchema);

export function useAdminUsers() {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        "/api/admin/users",
        {
            revalidateOnFocus: false,
        }
    );

    const users = useMemo(() => {
        return data ? adminUsersResponseSchema.parse(data) : [];
    }, [data]);

    const banUser = async (userId: string) => {
        try {
            await axiosInstance.post(`/api/admin/users/${userId}/ban`);
            toast.success("User banned successfully");
            await mutate();
            return true;
        } catch (err) {
            toast.danger("Failed to ban user");
            return false;
        }
    };

    const unbanUser = async (userId: string) => {
        try {
            await axiosInstance.post(`/api/admin/users/${userId}/unban`);
            toast.success("User unbanned successfully");
            await mutate();
            return true;
        } catch (err) {
            toast.danger("Failed to unban user");
            return false;
        }
    };

    return {
        users,
        isLoading: isLoading || (!users.length && !error && isValidating),
        isError: error,
        banUser,
        unbanUser,
        mutate,
    };
}
