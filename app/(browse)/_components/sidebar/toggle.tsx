"use client";

import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/ui/hint";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpanded } = useSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <ToolTipHint side="right" asChild align="end" label={label}>
            <Button
              onClick={onExpanded}
              variant="ghost"
              className="h-auto p-2 ml-auto"
            >
              <ArrowRightFromLine className="w-4 h-4 text-white" />
            </Button>
          </ToolTipHint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">for you</p>
          <ToolTipHint side="right" align="end" asChild label={label}>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4 text-white" />
            </Button>
          </ToolTipHint>
        </div>
      )}
    </>
  );
};
