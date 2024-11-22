import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "right" | "left" | "bottom";
  align?: "center" | "start" | "end";
}
export const ToolTipHint = ({ children, label, align, asChild, side }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
              <TooltipContent side={side} align={align} className="text-black bg-white">
                  <p className="font-semibold">{label}</p>    
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
