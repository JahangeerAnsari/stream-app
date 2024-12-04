"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}
export const Wrapper = ({ children }: WrapperProps) => {
    const {collapsed} = useCreatorSidebar((state) => state)
    return (
        <aside className={cn("fixed flex left-0 flex-col w-60 h-full bg-background  border-r border-[#202E35] Z-50",collapsed && "w-[70px]" )}>
            {children}
        </aside>
    )
}