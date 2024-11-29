"use client";
import { onBlock ,onUnblock} from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
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
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast(`You are now following ${data.following.username}`)
        )
        .catch(() => toast("something went wrong"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollow ${data.following.username}`)
        )
        .catch(() => toast.error("something went wrong"));
    });
  };
  const onClick = () => {
    if (isfollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };
  const handleBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`you have Unblock the user ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Someting went wrong"));
    });
  };
  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isfollowing ? "unfollow" : "follow"}
      </Button>
      <Button variant="secondary" disabled={isPending} onClick={handleBlock}>
        Unblock
      </Button>
    </>
  );
};
