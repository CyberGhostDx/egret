"use client";

import React, { useState } from "react";
import { Modal, Button, TextArea, Select, ListBox, Label } from "@heroui/react";
import { LuBan } from "react-icons/lu";
import { AdminUser } from "@/hooks/useAdminUsers";

interface BanUserModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    userId: string,
    reason?: string,
    expires?: number,
  ) => Promise<boolean>;
  showNames?: boolean;
}

const BAN_DURATIONS = [
  { label: "1 Hour", value: 3600 * 1000 },
  { label: "12 Hours", value: 12 * 3600 * 1000 },
  { label: "1 Day", value: 24 * 3600 * 1000 },
  { label: "7 Days", value: 7 * 24 * 3600 * 1000 },
  { label: "30 Days", value: 30 * 24 * 3600 * 1000 },
  { label: "Permanent", value: 0 },
];

export const BanUserModal: React.FC<BanUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onConfirm,
  showNames = true,
}) => {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState<string>("0");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!user) return;
    setIsSubmitting(true);
    const success = await onConfirm(
      user.id,
      reason || undefined,
      duration === "0" ? undefined : Number(duration),
    );
    setIsSubmitting(false);
    if (success) {
      onClose();
      setReason("");
    }
  };

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <Modal.Container>
          <Modal.Dialog className="max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-red-50 text-red-500">
                <LuBan className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Ban User</Modal.Heading>
              <p className="text-sm font-medium text-slate-400">
                Restricting access for{" "}
                {showNames || user?.role === "admin"
                  ? user?.name || user?.email
                  : "••••••••"}
              </p>
            </Modal.Header>

            <Modal.Body className="gap-6">
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-primary/60 text-[10px] font-bold tracking-wider uppercase">
                    Ban Duration
                  </Label>
                  <Select
                    value={duration}
                    onChange={(key) => setDuration(key?.toString() || "0")}
                  >
                    <Select.Trigger className="border border-slate-200 shadow-none">
                      <Select.Value />
                      <Select.Indicator className="text-primary/30" />
                    </Select.Trigger>
                    <Select.Popover className="border-primary/10 rounded-xl border bg-white shadow-2xl">
                      <ListBox>
                        {BAN_DURATIONS.map((dur) => (
                          <ListBox.Item
                            key={dur.value.toString()}
                            id={dur.value.toString()}
                            className="hover:bg-primary/5 cursor-pointer rounded-lg px-3 py-2 text-xs font-bold transition-colors"
                          >
                            {dur.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5 p-1">
                  <Label className="text-primary/60 text-[10px] font-bold tracking-wider uppercase">
                    Reason (Optional)
                  </Label>
                  <TextArea
                    value={reason}
                    className="border border-slate-200"
                    onChange={(val) => setReason(val.target.value)}
                    placeholder="Provide a reason"
                  />
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="ghost"
                onPress={onClose}
                className="rounded-xl font-bold"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onPress={handleConfirm}
                isPending={isSubmitting}
                className="rounded-xl font-black shadow-lg shadow-red-200"
              >
                Confirm Ban
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
