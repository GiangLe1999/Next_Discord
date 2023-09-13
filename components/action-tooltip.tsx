"use client";
import { FC, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  label: string;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align: "start" | "center" | "end";
}

const ActionTooltip: FC<Props> = ({
  label,
  children,
  side,
  align,
}): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
