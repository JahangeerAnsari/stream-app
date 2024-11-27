"use client";
import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkelton } from "./UserItem";
// here the data comming from user (prisma)
interface RecommendedProps {
  data: User[];
}
export function Recommended({ data }: RecommendedProps) {
  const { collapsed } = useSidebar();
  const showLable = !collapsed && data.length > 0;
  return (
    <div>
      {showLable && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data
          ?.filter((user) => user.username?.trim()) // Excludes empty or whitespace-only usernames
          .map((user) => (
            <UserItem
              key={user.id}
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={false}
            />
          ))}
      </ul>
    </div>
  );
}

export const RecommendedSkelton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
          <UserItemSkelton key={i}/>
        ))}
    </ul>
  )
}
