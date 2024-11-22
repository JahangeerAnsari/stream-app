"use client";
import { cn } from "@/lib/utils";
// here we are using hook so we have to this comp as client comp mandatory
import { useSidebar } from "@/store/use-sidebar";
interface WrapperProps {
  children: React.ReactNode;
  asChild?:boolean
}
export const Wrapper = ({ children, asChild }: WrapperProps) => {
  const { collapsed, onCollapse, onExpanded } = useSidebar((state) => state);
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
