import { LiveBadge } from "@/components/live-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}
export const UserItem = ({ imageUrl, isLive, username }: UserItemProps) => {
  const { collapsed } = useSidebar((state) => state);
  const pathname = usePathname();
  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center gap-x-4 w-full",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {!collapsed && (
            <p className="truncate">{username }</p>
          )}
          {!collapsed &&  isLive &&(
            <LiveBadge className="mt-auto"/>
          )}
        </div>
      </Link>
    </Button>
  );
};
export const UserItemSkelton = () =>{
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6"/>
      </div>
    </li>
  )
}
