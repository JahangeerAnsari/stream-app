"use client";
import { cn } from "@/lib/utils";
// here we are using hook so we have to this comp as client comp mandatory
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { ToggleSkelton } from "./toggle";
import { RecommendedSkelton } from "./recommended";
interface WrapperProps {
  children: React.ReactNode;
  asChild?: boolean;
}
export const Wrapper = ({ children, asChild }: WrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  const { collapsed } = useSidebar((state) => state);
  // we are rendering the component if it is clinet comp
  // hooks only render client comp
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkelton />
        <RecommendedSkelton/>
      </aside>
    );
  }
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-35",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
