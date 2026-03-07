import useSWR from "swr";
import { z } from "zod";
import { toast } from "@heroui/react";
import { useMemo } from "react";
import { authClient } from "@/lib/auth-client";

export const adminUserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  image: z.string().nullable().optional(),
  role: z.string().nullable(),
  banned: z.boolean().nullable(),
  banReason: z.string().nullable().optional(),
  banExpires: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date().optional(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;

export function useAdminUsers() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "admin.listUsers",
    async () => {
      const res = await authClient.admin.listUsers({
        query: {
          limit: 100,
        },
      });

      if (res.error) {
        throw res.error;
      }
      console.log(res.data.users);

      return res.data.users;
    },
    {
      revalidateOnFocus: false,
    },
  );

  const users = useMemo((): AdminUser[] => {
    if (!data) return [];
    return z.array(adminUserSchema).parse(data);
  }, [data]);

  const banUser = async (
    userId: string,
    reason?: string,
    expires?: number,
  ): Promise<boolean> => {
    try {
      const res = await authClient.admin.banUser({
        userId,
        banReason: reason,
        banExpiresIn: expires,
      });

      if (res.error) {
        toast.danger("Failed to ban user");
        return false;
      }

      toast.success("User banned successfully");
      await mutate();
      return true;
    } catch (err) {
      toast.danger("Failed to ban user");
      return false;
    }
  };

  const unbanUser = async (userId: string): Promise<boolean> => {
    try {
      const res = await authClient.admin.unbanUser({
        userId,
      });

      if (res.error) {
        toast.danger("Failed to unban user");
        return false;
      }

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
    isError: !!error,
    banUser,
    unbanUser,
    mutate,
  };
}
