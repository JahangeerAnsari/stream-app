import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

//lets add size of the
const avatarSize = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface UserAvatarProps extends VariantProps<typeof avatarSize> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export const UserAvatar = ({
  imageUrl,
  isLive,
  username,
  showBadge,
  size,
}: UserAvatarProps) => {
  const isShowBadge = isLive && showBadge;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSize({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {isShowBadge && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <LiveBadge/>
        </div>
      )}
    </div>
  );
};

interface UserAvatarSkeltonProps extends
    VariantProps<typeof avatarSize> { };
export const UserAvatarSkeltonProps = ({size}:UserAvatarSkeltonProps) => {
    return (
        <Skeleton className={cn("rounded-full", avatarSize({size}))} />
    )
}