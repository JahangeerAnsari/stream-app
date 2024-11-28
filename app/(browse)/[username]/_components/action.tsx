"use client";
import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
interface ActionsProps {
  isfollowing: boolean;
  userId: string;
}
export const Actions = ({ isfollowing, userId }: ActionsProps) => {
  // to handle the pending state
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast(`You are now following ${data.following.username}`))
        .catch(() => toast("something went wrong"));
    });
  };
  return (
    <Button
      disabled={isPending || isfollowing}
      onClick={onClick}
      variant="primary"
    >
      follow
    </Button>
  );
};
