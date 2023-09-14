"use client";

import { Plus } from "lucide-react";
import { FC } from "react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface Props {}

const NavigationAction: FC<Props> = (props): JSX.Element => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <div
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 sidebar-nav-btn">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </div>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
