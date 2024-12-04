"use client";

import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/ui/hint";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpanded } = useCreatorSidebar(
    (state) => state
  );
  const label = collapsed ? "Expand" : "Collpase";
  return (
    <div>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <ToolTipHint label={label} side="right" asChild>
            <Button onClick={onExpanded} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </ToolTipHint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="font-semibold text-primary">Dashboard</p>
          <ToolTipHint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </ToolTipHint>
        </div>
      )}
    </div>
  );
};
